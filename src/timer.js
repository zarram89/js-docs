let timer = null;
let seconds = 0;
let isRunning = false;

const startPauseBtn = document.getElementById('startPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const preview = document.getElementById('preview');

// Функция для обновления секундомера
function updateTimer() {
  seconds++;
  console.log(`Прошло времени: ${seconds} секунд`);
  preview.textContent = `Прошло времени: ${seconds} секунд`;
}

// Обработчик для кнопки Старт/Пауза
startPauseBtn.addEventListener('click', function() {
  if (isRunning) {
    // Если таймер работает, останавливаем его
    clearInterval(timer);
    isRunning = false;
    startPauseBtn.textContent = 'Старт';
  } else {
    // Если таймер не работает, запускаем его
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
    startPauseBtn.textContent = 'Пауза';
  }
});

// Обработчик для кнопки Стоп
stopBtn.addEventListener('click', function() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  startPauseBtn.textContent = 'Старт';
  console.log('Секундомер остановлен и сброшен');
});