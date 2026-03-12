// ================== main.js ==================

// Responsibility:
// - App entry point
// - Initialize board
// - Wire game logic ↔ timer ↔ scores
// - Handle what happens when the player wins
// - Prevent double click
let audioUnlocked = false;

function unlockAudio() {
  if (!audioUnlocked) {
    [flipSound, flipBackSound, matchSound, doneSound].forEach(sound => {
      sound.play().catch(() => {});
      sound.pause();
      sound.currentTime = 0;
    });
    audioUnlocked = true;
  }
}

// Attach to first click anywhere on the page
document.addEventListener("click", unlockAudio, { once: true });




  // Prevent context menu (right click)


// ------------------ IMPORTS ------------------

// Board setup utilities
import { shuffle, createBoard, resetGame } from './setup.js';

// Timer utilities
import {
  startTimer,
  stopTimer,
  formatTime,
  getSeconds,
  isTimerStarted
} from './timer.js';

// Game logic (card flipping + win detection)
import {
  flipCardCallback,
  flippedCards,
  matchedCards,
  setOnWinCallback
} from './game.js';

// Supabase score handling
import { saveScore, fetchHighScores } from './scores.js';

// Card data
import { cardsArray } from './data.js';

// ------------------ INITIAL SETUP ------------------

// Select the game board from the DOM
const board = document.querySelector('.game-board');

// Create a shuffled deck (duplicate cards for pairs)
const shuffledCards = shuffle([...cardsArray, ...cardsArray]);

// Create the game board
createBoard(
  shuffledCards,
  board,
  // Pass a callback that starts the timer on first flip
  (card) => flipCardCallback(card, isTimerStarted, startTimer),
  flippedCards,
  matchedCards
);

// Fetch leaderboard on page load
fetchHighScores();

// ------------------ WIN HANDLING ------------------
//
// game.js does NOT know about alerts, scores, or resetting.
// We register the win behavior here.
//

setOnWinCallback(async () => {
  // Stop the timer when the game is won
  stopTimer();

  // Show final time
  alert(`You finished in ${formatTime(getSeconds())}!`);

  // Ask for player's name
  const playerName = prompt('Good job! 🎉 Enter your name:');
  if (playerName) {
    await saveScore(playerName, getSeconds());
  }

  // Ask to play again
  const playAgain = confirm('Do you want to play again?');
  if (playAgain) {
    resetGame(
      cardsArray,
      board,
      (card) => flipCardCallback(card, isTimerStarted, startTimer),
      flippedCards,
      matchedCards
    );
  }
});