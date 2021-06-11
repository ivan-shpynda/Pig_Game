'use strict';

const player0E0 = document.querySelector('.player--0');
const player0E1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let playing;
let activePlayer;
let currentScore;

const init = function() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = '0';
  score1El.textContent = '0';

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0E0.classList.remove('player--winner');
  player0E1.classList.remove('player--winner');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

init();

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0E0.classList.toggle('player--active');
  player0E1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function() {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent
    = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
