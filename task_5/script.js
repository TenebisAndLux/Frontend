const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function isOrderedAlphabetically(vector) {
    return vector.every(
        (item, index, array) => index === 0 || item >= array[index - 1]
    );
}

function getRandomLetter(min, max) {
    const startIndex = alphabet.indexOf(min.toLowerCase());
    const endIndex = alphabet.indexOf(max.toLowerCase());
    const randomIndex =
        Math.floor(Math.random() * (endIndex - startIndex + 1)) + startIndex;
    return alphabet[randomIndex];
}

function removeOddLetters(vector) {
    return vector.filter((item, index) => alphabet.indexOf(item) % 2 === 1);
}

function generateVector(size, minChar, maxChar) {
    return Array.from({ length: size }, () =>
        getRandomLetter(minChar, maxChar)
    );
}

function generateMatrix(rows, cols, probability) {
    return Array.from({ length: rows }, () =>
        Math.random() < probability
            ? generateVector(cols, 'a', 'z').sort()
            : generateVector(cols, 'a', 'z')
    );
}

function calculate() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);

    const M1 = generateMatrix(rows, cols, 0.5);
    const M2 = generateMatrix(rows, cols, 0.5);

    const rowsOrderedAlphabeticalM1 = M1.map((row) =>
        isOrderedAlphabetically(row)
    );
    const rowsOrderedAlphabeticalM2 = M2.map((row) =>
        isOrderedAlphabetically(row)
    );

    const notSortedRowsM1 = M1.filter(
        (row, i) => !rowsOrderedAlphabeticalM1[i]
    );
    const notSortedRowsM2 = M2.filter(
        (row, i) => !rowsOrderedAlphabeticalM2[i]
    );

    const noOddLettersInSortedRowsM1 = notSortedRowsM1.map((row) =>
        removeOddLetters(row)
    );
    const noOddLettersInSortedRowsM2 = notSortedRowsM2.map((row) =>
        removeOddLetters(row)
    );

    const sortedNoOddLettersInSortedRowsM1 = noOddLettersInSortedRowsM1.map(
        (row) => Array.from(row).sort()
    );
    const sortedNoOddLettersInSortedRowsM2 = noOddLettersInSortedRowsM2.map(
        (row) => Array.from(row).sort()
    );

    const output = document.getElementById('output');
    output.innerHTML = `
        <h3>Изначальные матрицы:</h3>
        <pre>M1:\n${matrixToString(M1)}</pre>
        <pre>M2:\n${matrixToString(M2)}</pre>
        <h3>Векторы средних значений:</h3>
        <pre>Отсортированные строки M1:\n${rowsOrderedAlphabeticalM1
            .map((row, i) => `Строка ${i + 1}: ${row}`)
            .join('\n')}</pre>
        <pre>Отсортированные строки M2:\n${rowsOrderedAlphabeticalM2
            .map((row, i) => `Строка ${i + 1}: ${row}`)
            .join('\n')}</pre>
        <h3>Несортированные строки:</h3>
        <pre>Несортированные строки M1:\n${notSortedRowsM1
            .map((row, i) => `Строка ${i + 1}: ${row}`)
            .join('\n')}</pre>
        <pre>Несортированные строки M2:\n${notSortedRowsM2
            .map((row, i) => `Строка ${i + 1}: ${row}`)
            .join('\n')}</pre>
        <h3>Строки без нечетных букв:</h3>
        <pre>Строки без нечетных букв M1:\n${noOddLettersInSortedRowsM1
            .map((row, i) => `Строка ${i + 1}: ${row}`)
            .join('\n')}</pre>
        <pre>Строки без нечетных букв M2:\n${noOddLettersInSortedRowsM2
            .map((row, i) => `Строка ${i + 1}: ${row}`)
            .join('\n')}</pre>
        <h3>Отсортированные строки без нечетных букв:</h3>
        <pre>Отсортированные строки без нечетных букв M1:\n${sortedNoOddLettersInSortedRowsM1
            .map((row, i) => `Строка ${i + 1}: ${row}`)
            .join('\n')}</pre>
        <pre>Отсортированные строки без нечетных букв M2:\n${sortedNoOddLettersInSortedRowsM2
            .map((row, i) => `Строка ${i + 1}: ${row}`)
            .join('\n')}</pre>
    `;
}

function matrixToString(matrix) {
    return matrix.map((row) => row.join(', ')).join('\n');
}

function vectorToString(vector) {
    return `[${vector.join(', ')}]`;
}
