let userScore = 0;
let compScore = 0;
let roundsPlayed = 0;
const maxRounds = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "It's a draw! Play again.";
  msg.style.backgroundColor = "#392f67";

  // Remove glows
  document.querySelectorAll(".choice").forEach(choice => {
    choice.classList.remove("winner-glow", "loser-glow");
  });
};

const endGame = () => {
  // Disable further clicks
  document.querySelector(".choices").classList.add("disabled");

  if (userScore > compScore) {
    msg.innerText = `🏆 Game Over! You win the Best of ${maxRounds} (${userScore} - ${compScore})`;
    msg.style.backgroundColor = "green";
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    document.getElementById("win-sound").play();
  } else if (compScore > userScore) {
    msg.innerText = `😞 Game Over! Computer wins Best of ${maxRounds} (${compScore} - ${userScore})`;
    msg.style.backgroundColor = "red";
    document.getElementById("lose-sound").play();
  } else {
    msg.innerText = `🤝 It's a tie! (${userScore} - ${compScore})`;
    msg.style.backgroundColor = "#392f67";
  }
};

const showWinner = (userWin, userChoice, compChoice) => {
  // Remove old glows
  document.querySelectorAll(".choice").forEach(choice => {
    choice.classList.remove("winner-glow", "loser-glow");
  });

  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `Congratulations, you won! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";

    // 🎉 Confetti
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

    // ✨ Glow
    document.getElementById(userChoice).classList.add("winner-glow");
    document.getElementById(compChoice).classList.add("loser-glow");

    // 🔊 Sound
    document.getElementById("win-sound").play();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `Sorry, you lost! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";

    // ✨ Glow
    document.getElementById(compChoice).classList.add("winner-glow");
    document.getElementById(userChoice).classList.add("loser-glow");

    // 🔊 Sound
    document.getElementById("lose-sound").play();
  }
};

const playGame = (userChoice) => {
  if (roundsPlayed >= maxRounds) return; // block extra rounds

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }

  roundsPlayed++;
  if (roundsPlayed === maxRounds) {
    setTimeout(endGame, 1000); // delay for effect
  }
};

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// 🔄 Restart Game
document.getElementById("reset-btn").addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  roundsPlayed = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#392f67";

  // Enable choices again
  document.querySelector(".choices").classList.remove("disabled");

  // Remove glows
  document.querySelectorAll(".choice").forEach(choice => {
    choice.classList.remove("winner-glow", "loser-glow");
  });
});
