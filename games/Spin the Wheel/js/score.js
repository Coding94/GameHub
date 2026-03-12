import { getSecondsLeft } from './timer.js';

const WORKER_URL = "https://quiet-feather-6e04.federicolinus.workers.dev";

export async function saveScoreToLeaderboard(playerName, score) {
  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "saveScore", name: playerName, score })
    });
    const result = await res.json();
    if (result.success) {
      console.log("[Leaderboard] Score saved!");
    }
  } catch (err) {
    console.error("[Leaderboard] Error saving score:", err);
  }
}

export async function fetchLeaderboard() {
  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "fetchScores",
        game: "stw"
      })
    });
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("[Leaderboard] Error fetching scores:", err);
    return [];
  }
}

let totalScore = 0;

export function resetScore() {
  totalScore = 0;
  updateScoreDisplay();
}

export function increaseScore(correct = true) {
  if (!correct) return 0;

  const seconds = getSecondsLeft();
  let points = 0;

  if (seconds >= 16) points = 10;
  else if (seconds >= 11) points = 8;
  else if (seconds >= 6) points = 5;
  else if (seconds >= 1) points = 2;
  else points = 0;

  animatePoints(points);
  return points;
}

export function addToTotal(points) {
  totalScore += points;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  const scoreEl = document.getElementById('score-container');
  if (scoreEl) scoreEl.textContent = `Score: ${totalScore}`;
}

function animatePoints(points) {
  // Determine where to place the animation
  const roundEl = document.getElementById('round-points-container');
  const scoreEl = document.getElementById('score-container');

  // Priority: round points (question), then wheel score
  const container = roundEl || scoreEl;
  if (!container) return;

  const animEl = document.createElement('div');
  animEl.className = 'score-animation';
  animEl.textContent = `+${points}`;

  container.appendChild(animEl);

  setTimeout(() => animEl.remove(), 1500);
}