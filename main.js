import {add, subtract, multiply, divide} from "./helpers.js";

const firstNumberInput = document.getElementById('firstNumber');
const operatorSelect = document.getElementById('operator');
const secondNumberInput = document.getElementById('secondNumber');
const calculateButton = document.getElementById('calculate');
const resultSpan = document.getElementById('result');
const history = document.getElementById('history');

function calculate(a, operator, b) {
  try {
    switch (operator) {
      case '+': return add(a, b);
      case '-': return subtract(a, b);
      case '*': return multiply(a, b);
      case '/': return divide(a, b);
      default: throw new Error('Unknown operator');
    }
  } catch (error) {
    alert(error.message);
    return NaN;
  }
}

function addToHistory(result) {
  const resultDiv = document.createElement('div');
  resultDiv.textContent = result;
  resultDiv.classList.add('history-item');

  resultDiv.addEventListener('click', () => {
    resultDiv.remove();
  });

  history.appendChild(resultDiv);
}

function handleCalculate() {
  const a = parseFloat(firstNumberInput.value);
  const operator = operatorSelect.value;
  const b = parseFloat(secondNumberInput.value);

  const result = calculate(a, operator, b);
  resultSpan.textContent = isNaN(result) ? 'Error' : result;

  if (!isNaN(result)) {
    addToHistory(result);
  }
}

calculateButton.addEventListener('click', handleCalculate);

[firstNumberInput, secondNumberInput, operatorSelect].forEach(element => {
  element.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCalculate();
  });
});
