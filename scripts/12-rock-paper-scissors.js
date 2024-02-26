//Object to track score
//JSON.parse converts JSON String back to JS Object
//localStorage only supports strings
//localStorage.getItem allows you to retrieve a single value stored locally
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*since removeItem is being used on reset button we have to use an if-statement
      to counter the null value by giving us 0 when we reset the score.*/
/* same code as above but different way to do it
      if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0,
        };
      }*/

//The 2 var's below keep track on wether we play or not.
let isAutoPlaying = false;
let intervalId;
//autoPlay func helps us stop/start the Auto Play Button.
//We take intervalId out of the function to keep the
//initial ID number so we can stop the interval.

/* const autoPlay = () =>{}
This is the => version of the function below but we wont change it
because the version below is easier to read and enables "Hoisting" which
lets us call the function before creating it and we don't have to worry in
which order we write the code*/
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    //To stop an interval we can use clearInterval().
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

//The following 5 querySelectors are the events added to each button.
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

document
  .querySelector(".js-reset-score-button")
  .addEventListener("click", () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    //Reset Score
    localStorage.removeItem("score");
    updateScoreElement();
  });

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});

//If we type r/p/s it will make the respective move.
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose.";
    } else if (computerMove === "Paper") {
      result = "You win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You lose.";
    } else if (computerMove === "Scissors") {
      result = "You win.";
    }
  }

  //This if-statement keeps track of wins, losses and ties
  if (result === "You win.") {
    //+= is a shortcut to increase things by one
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  //JSON.stringify converts JavaScript objects into strings
  //localStorage.setItem allows you to store data locally on the user's browser.
  //localStorage only supports strings
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  //Selector inserts the "result" variable into the paragraph
  document.querySelector(".js-result").innerHTML = result;

  //Selector inserts the "playerMove" variable into the paragraph
  document.querySelector(".js-moves").innerHTML = ` You
        <img src="images/${playerMove}-emoji.png" class="move-icon" />
        <img src="images/${computerMove}-emoji.png" class="move-icon" />
        Computer`;
}

//This function updates the score element
function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `
          Wins: ${score.wins}, 
          Losses: ${score.losses}, 
          Ties: ${score.ties}
       `;
}

//This function picks the computer moves.
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}
