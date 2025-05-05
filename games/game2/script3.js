let audioData = [];
let currentIndex = 0;
let score = 0;
let selectedRounds = [];
let timerInterval; // Store the timer interval to clear it later
let timeLeft = 10;

document.getElementById("playButton").addEventListener("click", loadAudios);

async function loadAudios() {
  try {
    document.getElementById("playButton").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    document.getElementById("userGuess").style.display = "inline-block";

    const response = await fetch("audios.json");
    if (!response.ok) throw new Error("Failed to load audio data");

    audioData = await response.json();
    startGame();
  } catch (error) {
    console.error("Error loading audios:", error);
    document.getElementById("resultText").textContent = "❌ Error loading audio. Try again.";
    document.getElementById("playButton").style.display = "inline-block";
  }
}

function startGame() {
  score = 0;
  currentIndex = 0;
  selectedRounds = shuffleArray(audioData).slice(0, 5);
  document.getElementById("resultText").textContent = "";
  showNextAudio();
}

function showNextAudio() {
  const current = selectedRounds[currentIndex];
  document.getElementById("audioPlayer").src = current.audio;
  document.getElementById("userGuess").value = "";
  document.getElementById("audioPlayer").style.display = "block";
  document.getElementById("roundInfo").textContent = `Round ${currentIndex + 1} of 5`;
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
  const correct = selectedRounds[currentIndex].title.toLowerCase();

  if (userGuess === correct) {
    score++;
    document.getElementById("resultText").textContent = "✅ Correct!";
    document.getElementById("resultText").style.color = "lightgreen";
  } else {
    document.getElementById("resultText").textContent = `❌ Correct: "${selectedRounds[currentIndex].title}"`;
    document.getElementById("resultText").style.color = "red";
  }

  currentIndex++;

  setTimeout(() => {
    if (currentIndex < 5) {
      document.getElementById("resultText").textContent = "";
      showNextAudio();
    } else {
      endGame();
    }
  }, 2000);
}

function endGame() {
  document.getElementById("roundInfo").textContent = "";
  document.getElementById("userGuess").style.display = "none";
  document.getElementById("audioPlayer").style.display = "none";
  document.getElementById("resultText").textContent = `🎉 Game Over! Your Score: ${score}/5`;
  document.getElementById("resultText").style.color = "#1db954";
  document.getElementById("playButton").style.display = "inline-block";
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
