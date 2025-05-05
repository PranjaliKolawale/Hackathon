let songs = [];
let currentSongIndex = 0;
let score = 0;
let gameSongs = [];
let timerInterval; // Store the timer interval to clear it later
let timeLeft = 10;

document.getElementById("startButton").addEventListener("click", async () => {
  const res = await fetch("songs.json");
  songs = await res.json();
  gameSongs = shuffleArray(songs).slice(0, 5);
  currentSongIndex = 0;
  score = 0;
  document.getElementById("startButton").style.display = "none";
  document.getElementById("gameSection").style.display = "block";
  loadNextSong();
});

function loadNextSong() {
  const current = gameSongs[currentSongIndex];
  document.getElementById("descriptionText").textContent = current.description;
  document.getElementById("guessInput").value = "";
  document.getElementById("resultDisplay").textContent = "";
  document.getElementById("roundInfo").textContent = `Round ${currentSongIndex + 1} of 5`;
  timeLeft = 10;
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`; // Display the initial time
  startTimer();
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval); // clear previous timer if any
  
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        checkSongAnswer(true); // pass flag to handle automatic check
      }
    }, 1000);
  }
  



function checkSongAnswer() {
  const userAnswer = document.getElementById("guessInput").value.trim().toLowerCase();
  const correctTitle = gameSongs[currentSongIndex].title.toLowerCase();

  if (userAnswer === correctTitle) {
    score++;
    document.getElementById("resultDisplay").textContent = "✅ Correct!";
    document.getElementById("resultDisplay").style.color = "green";
  } else {
    document.getElementById("resultDisplay").textContent = `❌ Correct answer: "${gameSongs[currentSongIndex].title}"`;
    document.getElementById("resultDisplay").style.color = "red";
  }

  currentSongIndex++;

  setTimeout(() => {
    if (currentSongIndex < 5) {
      loadNextSong();
    } else {
      endGame();
    }
  }, 2000);
}

function endGame() {
  document.getElementById("roundInfo").textContent = "";
  document.getElementById("descriptionText").textContent = "";
  document.getElementById("guessInput").style.display = "none";
  document.getElementById("resultDisplay").textContent = `🎉 Game Over! Your Score: ${score}/5`;
  document.getElementById("resultDisplay").style.color = "#1db954";
  document.getElementById("startButton").style.display = "inline-block";
  document.getElementById("startButton").textContent = "Play Again";
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
