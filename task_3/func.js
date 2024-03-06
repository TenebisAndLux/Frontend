function tabulateFunction(a, nm1, nm2) {
    let maxVal = -Infinity;
    let minVal = Infinity;
    let maxX = null;
    let maxY = null;

    for (let x = 0; x <= 10; x++) {
        for (let y = 0; y <= 10; y++) {
            let result;
            if (x + y <= a) {
                result = 0;
                for (let n = 1; n <= nm1; n++) {
                    result += Math.pow((x + y) / n, n);
                }
            } else {
                result = 0;
                for (let n = 0; n <= nm2; n++) {
                    result += Math.pow(Math.pow(y, n) / factorial(n), n);
                }
            }

            console.log("|Значение функции f(x, y): ", result, "при x =", x, "и y =", y);

            if (result > maxVal) {
                maxVal = result;
                maxX = x;
                maxY = y;
            }

            if (result < minVal) {
                minVal = result;
            }
        }
    }

    return { maxX, maxY, maxVal, minVal };
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

let nm1, nm2;

do {
    nm1 = parseInt(prompt("Введите целое неотрицательное число для nm1 (от 2 до 6):"));
} while (isNaN(nm1) || nm1 < 2 || nm1 > 6);

do {
    nm2 = parseInt(prompt("Введите целое неотрицательное число для nm2 (от 2 до 6):"));
} while (isNaN(nm2) || nm2 < 2 || nm2 > 6);

const a = parseFloat(prompt("Введите значение для a:"));

const result = tabulateFunction(a, nm1, nm2);
console.log("Максимальное значение:", result.maxVal, "при x =", result.maxX, "и y =", result.maxY);
console.log("Минимальное значение:", result.minVal);