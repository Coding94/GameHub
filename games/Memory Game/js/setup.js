// Shuffle function: randomizes the order of cards
export function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Function to create the board
export function createBoard(cards, board, flipCardCallback, flippedCardsArray, matchedCardsArray) {
  // Clear board and reset the arrays that were passed in
  board.innerHTML = ""; 
  flippedCardsArray.length = 0; // reset the array passed in
  matchedCardsArray.length = 0; // reset the array passed in

  cards.forEach((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = cardData.name;

    // NEW WRAPPER
    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    // Back image
    const backImg = document.createElement("img");
    backImg.src = "./assets/images/leaf.png";
    backImg.alt = "Card Back";
    backImg.classList.add("back");

    // Front image
    const frontImg = document.createElement("img");
    frontImg.src = cardData.img;
    frontImg.alt = cardData.name;
    frontImg.classList.add("front");

    // Append images to inner wrapper
    inner.appendChild(backImg);
    inner.appendChild(frontImg);

    // Append inner to card
    card.appendChild(inner);

    // Click handler stays the same
    card.addEventListener("click", () => flipCardCallback(card));

    board.appendChild(card);
  });
}

// Import only what is needed for resetGame
import { resetTimer } from './timer.js';

// Reset Game
export function resetGame(cardsArray, board, flipCardCallback, flippedCardsArray, matchedCardsArray) {
  resetTimer(); // reset timer first

  // Shuffle new cards for the new game
  const newShuffledCards = shuffle([...cardsArray, ...cardsArray]);

  // Recreate the board with the new shuffled cards
  createBoard(newShuffledCards, board, flipCardCallback, flippedCardsArray, matchedCardsArray);
}
