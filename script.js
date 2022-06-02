const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const holdbtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

let playerName0El = document.getElementById("name--0");
let playerName1El = document.getElementById("name--1");

let winner = document.querySelector(".win");

let scores, currentScore, activePlayer, playing;

// ask for name
let askName0 = prompt("Player 1, what is your name?");
let askName1 = prompt("Player 2, what is your name?");

if (askName0) {
  playerName0El.innerHTML = askName0;
} else {
  playerName0El.innerHTML = `Player 1`;
}

if (askName1) {
  playerName1El.innerHTML = askName1;
} else {
  playerName1El.innerHTML = `Player 2`;
}

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  winner.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}
init();

// switching player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// rolling the dice
rollBtn.addEventListener("click", function () {
  if (playing) {
    //getting random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // displaying the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

holdbtn.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.check if player score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      winner.classList.remove("hidden");
      if (activePlayer === 0) {
        winner.textContent = askName0 + " " + "wins";
      } else if (activePlayer === 1) {
        winner.textContent = askName1 + " " + "wins";
      }
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

newBtn.addEventListener("click", init);
