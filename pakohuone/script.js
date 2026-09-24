const startButton = document.querySelector('#startButton');
const timer = document.querySelector('#timer');
const roomImages = document.querySelectorAll('.room-image');

let remainingSeconds = 60 * 60;
let interval;

roomImages.forEach((image) => {
  image.addEventListener('error', () => {
    image.classList.add('is-missing');
    image.alt = 'Kuva ei ole saatavilla';
  });

  image.addEventListener('load', () => {
    image.classList.remove('is-missing');
  });
});

function updateTimer() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (remainingSeconds <= 600) {
    timer.classList.add('danger');
  }

  if (remainingSeconds <= 0) {
    clearInterval(interval);
    startButton.textContent = 'Esittely päättyi';
    startButton.disabled = true;
  }
}

startButton.addEventListener('click', () => {
  if (interval) return;

  startButton.textContent = 'Esittely käynnissä';
  updateTimer();

  interval = setInterval(() => {
    remainingSeconds--;
    updateTimer();
  }, 1000);
});

updateTimer();
