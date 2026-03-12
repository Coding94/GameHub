// timer.js

let seconds = 0;
let timerInterval = null;
let timerStarted = false;

// Timer element
const timerElement = document.getElementById("timer-value");

// Format seconds to HH:MM:SS
export function formatTime(sec) {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

// ✅ Provide a getter for timer state
export function isTimerStarted() {
  return timerStarted;
}

// Update display
function updateTimer() {
  timerElement.textContent = formatTime(seconds);
}

// Start timer
export function startTimer() {
  if (timerStarted) return;
  timerStarted = true;
  seconds = 0;
  updateTimer();
  timerInterval = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

// Stop timer
export function stopTimer() {
  clearInterval(timerInterval);
}

// Reset timer
export function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerStarted = false;
  updateTimer();
}

// Get elapsed seconds
export function getSeconds() {
  return seconds;
}
