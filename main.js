const firstNumberInput = document.getElementById('firstNumber');
const operatorSelect = document.getElementById('operator');
const secondNumberInput = document.getElementById('secondNumber');
const calculateButton = document.getElementById('calculate');
const resultSpan = document.getElementById('result');

function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      throw new Error('Неизвестный оператор');
  }
}

calculateButton.addEventListener('click', () => {
  const a = parseFloat(firstNumberInput.value);
  const operator = operatorSelect.value;
  const b = parseFloat(secondNumberInput.value);

  const result = calculate(a, operator, b);

  resultSpan.textContent = result;
});

firstNumberInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateButton.click();
});

secondNumberInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateButton.click();
});

operatorSelect.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateButton.click();
});