let timer = null;
let seconds = 0;
let isRunning = false;

const startPauseButton = document.querySelector('.start-pause-button');
const stopButton = document.querySelector('.stop-button');

function updateTimer() {
  seconds++;
  console.log(`Прошло ${seconds} секунд`)
}

startPauseButton.addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
    startPauseButton.textContent = 'Pause';
  } else {
    clearInterval(timer);
    isRunning = false;
    startPauseButton.textContent = 'Start';
  }
})

stopButton.addEventListener('click', () => {
  clearInterval(timer);
  seconds = 0;
  startPauseButton.textContent = 'Start'
})