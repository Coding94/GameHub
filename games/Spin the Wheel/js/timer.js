let timerInterval = null;
let secondsLeft = 20;

export function startTimer(onExpire) {
  secondsLeft = 20;
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;
  timerEl.textContent = formatTime(secondsLeft);

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      secondsLeft = 0;
      timerEl.textContent = formatTime(secondsLeft);

      // disable buttons
      const buttons = document.querySelectorAll('.answer-btn');
      buttons.forEach(btn => (btn.disabled = true));

      // trigger expiration callback if provided
      if (typeof onExpire === 'function') onExpire();
    } else {
      timerEl.textContent = formatTime(secondsLeft);
    }
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}

export function getSecondsLeft() {
  return secondsLeft;
}

function formatTime(sec) {
  const hrs = Math.floor(sec / 3600).toString().padStart(2, '0');
  const mins = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
  const seconds = (sec % 60).toString().padStart(2, '0');
  return `${hrs}:${mins}:${seconds}`;
}
