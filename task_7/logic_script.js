
// Здесь нужно реализовать логику расчета характеристик функций
function calculateCharacteristics() {
    const selectedFunction = document.getElementById('function').value;
    const selectedFunctionVariant = document.getElementById('functionVariant').value;
    const rangeStart = parseFloat(document.getElementById('rangeStart').value);
    const rangeEnd = parseFloat(document.getElementById('rangeEnd').value);
    const step = parseFloat(document.getElementById('step').value);

    const characteristics = {
        maximum: document.getElementById('maximum').checked,
        negativeValues: document.getElementById('negativeValues').checked,
        monotonicDecreasing: document.getElementById('monotonicDecreasing').checked
    };

    const functionValues = [];

    // Выбор функции для расчета
    let f;
    switch (selectedFunction) {
        case 'f1':
            f = f1;
            break;
        case 'f2':
            f = f2;
            break;
        case 'f3':
            f = f3;
            break;
        default:
            console.log('Выбрана некорректная функция');
    }

    // Выбор варианта функции для расчета
    switch (selectedFunctionVariant) {
        case 'memoized':
            f = memoize(f);
            break;
        case 'debug':
            f = debug(f);
            break;
        case 'counter':
            f = createCounter(f);
            break;
        default:
            console.log('Выбран некорректный вариант функции');
    }

    // Рассчет значений функции в заданном диапазоне
    for (let x = rangeStart; x <= rangeEnd; x += step) {
        const y = f(x);
        functionValues.push(y);
    }

    // Расчет характеристик функции
    if (characteristics.maximum) {
        const max = Math.max(...functionValues);
        const maximumResultText = `Максимум: ${max}`;
        document.getElementById('maximumResult').innerHTML = maximumResultText;
    }

    if (characteristics.negativeValues) {
        const negatives = functionValues.filter(value => value < 0).length;
        const negativeValuesResultText = `Количество отрицательных значений: ${negatives}`;
        document.getElementById('negativeValuesResult').innerHTML = negativeValuesResultText;
    }

    if (characteristics.monotonicDecreasing) {
        const isMonotonicDecreasing = checkMonotonicDecreasing(functionValues);
        const monotonicDecreasingResultText = `Монотонно убывающая: ${isMonotonicDecreasing}`;
        document.getElementById('monotonicDecreasingResult').innerHTML = monotonicDecreasingResultText;
    }

    if (selectedFunctionVariant === 'counter') {
        const counterResultText = `Вызовов функции: ${f.getCount()} `;
        document.getElementById('counterResult').innerHTML = counterResultText;
    }
}

// Функции f1, f2, f3
function f1(x) {
    return (Math.cos(x - 5) ** 5 - Math.log(x)) / (x + 5 * Math.sin(x));
}

function f2(x) {
    return (Math.log(x - 5) - Math.log(x - 2) ** 3) / (x + 5 * Math.sin(x));
}

function f3(x) {
    return (Math.exp(3) + x) / 6 + (x ** 3 + 2 * x) / (4 * Math.sin(4 * x));
}

// Варианты функций
function memoize(f) {
    const cache = Object.create(null);
    return (x) => {
        const cachedValue = cache[x];
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        const result = f(x);
        cache[x] = result;
        return result;
    };
}

function debug(f) {
    let debugText = '';
    return (x) => {
        const startTime = performance.now();
        const result = f(x);
        const endTime = performance.now();
        debugText += `Вызов функции ${f.name} для x = ${x} за ${endTime - startTime} мс. Результат: ${result}\n`;
        document.getElementById('debugResult').style.display = 'block';
        document.getElementById('debugResult').innerHTML = debugText;
        return result;
    };
}

function createCounter(f) {
    let count = 0;
    return Object.assign(
        (x) => {
            const result = f(x);
            count++;
            return result;
        },
        {
            getCount() {
                return count;
            },
            resetCount() {
                count = 0;
            }
        }
    );
}

// Проверка на монотонно убывающую последовательность
function checkMonotonicDecreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) {
            return false;
        }
    }
    return true;
}