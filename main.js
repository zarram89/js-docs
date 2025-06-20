const firstNumberInput = document.getElementById('firstNumber');
const operatorSelect = document.getElementById('operator');
const secondNumberInput = document.getElementById('secondNumber');
const calculateButton = document.getElementById('calculate');
const resultSpan = document.getElementById('result');
const history = document.getElementById('history');

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

  const resultDiv = document.createElement('div');
  resultDiv.textContent = result;
  resultDiv.style.cursor = 'pointer';
  resultDiv.style.userSelect = 'none';
  resultDiv.style.marginTop = '5px';

  resultDiv.addEventListener('click', () => {
    resultDiv.remove();
  });

  history.appendChild(resultDiv);
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
