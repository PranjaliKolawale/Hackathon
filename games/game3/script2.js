let lyricsData = [];
let gameLines = [];
let currentIndex = 0;
let score = 0;
let timerInterval; // Store the timer interval to clear it later
let timeLeft = 10;

document.getElementById("playButton").addEventListener("click", loadLyrics);

async function loadLyrics() {
  try {
    document.getElementById("playButton").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    document.getElementById("userGuess").style.display = "inline-block";

    const response = await fetch("artists.json");
    if (!response.ok) throw new Error("Failed to load lyrics data");

    lyricsData = await response.json();
    startGame();
  } catch (error) {
    console.error("Error loading lyrics:", error);
    document.getElementById("lineText").textContent = "Error loading lyrics. Please try again later.";
    document.getElementById("playButton").style.display = "inline-block";
  }
}

function startGame() {
  score = 0;
  currentIndex = 0;
  gameLines = shuffleArray(lyricsData).slice(0, 5);
  document.getElementById("resultText").textContent = "";
  showNextLine();
}

function showNextLine() {
  const current = gameLines[currentIndex];
  document.getElementById("lineText").textContent = current.prompt;
  document.getElementById("userGuess").value = "";
  document.getElementById("userGuess").focus();
  document.getElementById("roundInfo").textContent = `Round ${currentIndex + 1} of 5`;
   // Reset the timer
   timeLeft = 10;
   document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`; // Display the initial time
   startTimer();
}

function startTimer() {
    // Start the timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`; // Update the timer display
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            checkAnswer(); // Automatically check the answer when time is up
        }
    }, 1000);
}

function checkAnswer() {
  const userGuess = document.getElementById("userGuess").value.trim().toLowerCase();
  const correct = gameLines[currentIndex].artist.toLowerCase();

  if (userGuess === correct) {
    score++;
    document.getElementById("resultText").textContent = "✅ Correct!";
    document.getElementById("resultText").style.color = "lightgreen";
  } else {
    document.getElementById("resultText").textContent = `❌ Correct artist: "${gameLines[currentIndex].artist}"`;
    document.getElementById("resultText").style.color = "red";
  }

  currentIndex++;

  setTimeout(() => {
    if (currentIndex < 5) {
      document.getElementById("resultText").textContent = "";
      showNextLine();
    } else {
      endGame();
    }
  }, 2000);
}

function endGame() {
  document.getElementById("lineText").textContent = "";
  document.getElementById("roundInfo").textContent = "";
  document.getElementById("userGuess").style.display = "none";
  document.getElementById("resultText").textContent = `🎤 Game Over! Your Score: ${score}/5`;
  document.getElementById("resultText").style.color = "#1db954";
  document.getElementById("playButton").style.display = "inline-block";
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
