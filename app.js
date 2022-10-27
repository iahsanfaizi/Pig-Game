'use strict';
//selecting all element form html to perform actions
//select buttons
const btnHoldEL = document.querySelector('.btn--hold');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
//selecting DICE Img
const diceEl = document.querySelector('.dice');
//selecting score tags
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//variables declaration
let currentScore, activePlayer, score, playing;

//functions
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

//reseting all data
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRollEl.addEventListener('click', function () {
  if (playing) {
    //1-create a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    //2-display on dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    //3-check number value
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if dice is 1 then it is next player turn(switch to pl2)
      switchPlayer();
    }
  }
});

btnHoldEL.addEventListener('click', function () {
  if (playing) {
    //add current score to total score
    score[activePlayer] += currentScore;
    //show on frontend also
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    //switch player
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //disappear the dice as we are no longer playing
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
//RESET BUTTON
btnNewEl.addEventListener('click', init);
