class BaseObject {
    constructor() {
        this.actions = [];
    }

    registerAction(action) {
        this.actions.push({time: new Date(), arguments: arguments, action: action});
    }

    clearActions() {
        this.actions = [];
    }

    showActions() {
        console.log(this.actions);
    }

    toString() {
        return JSON.stringify(this);
    }
}

class Fraction extends BaseObject {
    constructor(numerator, denominator) {
        super();
        this.numerator = numerator;
        this.denominator = denominator;
    }

    toString() {
        return `${this.numerator}/${this.denominator}`;
    }
}

const fractions = [];
let selectedFraction;

function createFraction() {
    const numerator = parseInt(document.getElementById('numerator').value);
    const denominator = parseInt(document.getElementById('denominator').value);
    const fraction = new Fraction(numerator, denominator);
    fractions.push(fraction);
    document.getElementById('output').innerHTML = `Fraction created: ${fraction.toString()}`;
    updateFractionSelect();
}

function updateFractionSelect() {
    const select = document.getElementById('fraction');
    select.innerHTML = '';
    fractions.forEach((fraction, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = fraction.toString();
        select.add(option);
    });
    updateFractionSelect2();
}

function updateFractionSelect2() {
    const select1 = document.getElementById('fraction1');
    const select2 = document.getElementById('fraction2');
    select1.innerHTML = select2.innerHTML = '';
    fractions.forEach((fraction, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = fraction.toString();
        select1.add(option);
        select2.add(option.cloneNode(true));
    });
}

function showNumerator() {
    const index = document.getElementById('fraction').value;
    const fraction = fractions[index];
    document.getElementById('output2').innerHTML = `Numerator: ${fraction.numerator}`;
}

function showDenominator() {
    const index = document.getElementById('fraction').value;
    const fraction = fractions[index];
    document.getElementById('output2').innerHTML = `Denominator: ${fraction.denominator}`;
}

function performOperation() {
    const index1 = document.getElementById('fraction1').value;
    const index2 = document.getElementById('fraction2').value;
    const operation = document.getElementById('operation').value;
    const fraction1 = fractions[index1];
    const fraction2 = fractions[index2];
    let result;
    switch (operation) {
        case 'add':
            result = new Fraction(fraction1.numerator * fraction2.denominator + fraction2.numerator * fraction1.denominator,
                fraction1.denominator * fraction2.denominator);
            break;
        case 'subtract':
            result = new Fraction(fraction1.numerator * fraction2.denominator - fraction2.numerator * fraction1.denominator,
                fraction1.denominator * fraction2.denominator);
            break;
        case 'multiply':
            result = new Fraction(fraction1.numerator * fraction2.numerator, fraction1.denominator * fraction2.denominator);
            break;
        case 'divide':
            result = new Fraction(fraction1.numerator * fraction2.denominator, fraction1.denominator * fraction2.numerator);
            break;
        case 'assign':
            fractions[index1] = fractions[index2];
            result = fractions[index1]
            updateFractionSelect();
            break;
    }
    document.getElementById('output3').innerHTML = `Result: ${result.toString()}`;
}

updateFractionSelect();