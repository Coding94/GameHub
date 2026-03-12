// js/questions.js
import { randomQuestions } from './questions/random.js';
import { artsQuestions } from './questions/arts.js';
import { technologyQuestions } from './questions/technology.js';
import { entertainmentQuestions } from './questions/entertainment.js';
import { historyQuestions } from './questions/history.js';
import { sportsQuestions } from './questions/sports.js';
import { geographyQuestions } from './questions/geography.js';
import { scienceQuestions } from './questions/science.js';

export const questions = {
  "Random": randomQuestions,
  "Arts & Culture": artsQuestions,
  "Technology": technologyQuestions,
  "Entertainment": entertainmentQuestions,
  "History": historyQuestions,
  "Sports": sportsQuestions,
  "Geography": geographyQuestions,
  "Science": scienceQuestions
};
