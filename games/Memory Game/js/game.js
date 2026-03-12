// ================== game.js ==================

// Track flipped and matched cards
export const flippedCards = [];
export const matchedCards = [];

// ------------------ WIN CALLBACK ------------------

// Store the callback function
let onWinCallback = null;

// Setter to allow main.js to register a win handler
export function setOnWinCallback(callback) {
  onWinCallback = callback;
}

// ------------------ SOUNDS ------------------
export const flipSound = document.getElementById("flipSound");
export const flipBackSound = document.getElementById("flipBackSound");
export const matchSound = document.getElementById("matchSound");
export const doneSound = document.getElementById("doneSound");

// ------------------ FLIP CARD LOGIC ------------------
export function flipCardCallback(card, isTimerStarted, startTimer) {
  // Start timer on first flip
  if (!isTimerStarted()) startTimer();

  if (
    flippedCards.length < 2 &&
    !card.classList.contains("flipped") &&
    !matchedCards.includes(card)
  ) {
    card.classList.add("flipped");
    flippedCards.push(card);

    // Play flip sound
    flipSound.pause();
    flipSound.currentTime = 0;
    flipSound.play();

    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 600);
    }
  }
}

// ------------------ CHECK MATCH ------------------
function checkForMatch() {
  const [cardOne, cardTwo] = flippedCards;

  if (cardOne.dataset.name === cardTwo.dataset.name) {
    // Add matched class
    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");

    // Add to matched array
    matchedCards.push(cardOne, cardTwo);

    // Play match sound
    matchSound.pause();
    matchSound.currentTime = 0;
    matchSound.play();

    // Hide cards after animation
    setTimeout(() => {
      cardOne.style.visibility = "hidden";
      cardTwo.style.visibility = "hidden";

        // ------------------ WIN CONDITION ------------------

        if (matchedCards.length === 30 && typeof onWinCallback === "function") {
          doneSound.play();
          setTimeout(() => {   
            onWinCallback(); 
          }, 50);              
  }
    }, 600);
  } else {
    // Flip back non-matching cards
    cardOne.classList.remove("flipped");
    cardTwo.classList.remove("flipped");

    flipBackSound.pause();
    flipBackSound.currentTime = 0;
    flipBackSound.play();
  }

  // Reset flipped cards
  flippedCards.length = 0;
  
}