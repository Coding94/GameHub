import { formatTime } from './timer.js';

export async function saveScore(playerName, time) {
  try {
    const res = await fetch("https://quiet-feather-6e04.federicolinus.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "saveScore",
        name: playerName,
        score: time
      })
    });

    const result = await res.json();

    if (result.success) {
      // Score saved successfully
    }

    fetchHighScores();
  } catch (err) {
    console.error("Error saving score:", err);
  }
}

export async function fetchHighScores() {
  try {
    const res = await fetch("https://quiet-feather-6e04.federicolinus.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "fetchScores" })
    });

    const data = await res.json();
    const ul = document.getElementById("high-scores");
    if (!ul) return;

    ul.innerHTML = "";

    // Check if data is an array directly or inside .data property
    const scores = Array.isArray(data) ? data : data.data;
    if (!scores) return;

    scores.forEach((row, index) => {
      const li = document.createElement("li");
      li.classList.add("score-item");

      const indexSpan = document.createElement("span");
      indexSpan.classList.add("score-index");
      indexSpan.textContent = `${index + 1}.`;

      const nameSpan = document.createElement("span");
      nameSpan.classList.add("score-name");
      nameSpan.textContent = row.name;

      const timeSpan = document.createElement("span");
      timeSpan.classList.add("score-time");
      timeSpan.textContent = formatTime(row.score);

      li.appendChild(indexSpan);
      li.appendChild(nameSpan);
      li.appendChild(timeSpan);

      ul.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching scores:", err);
  }
}