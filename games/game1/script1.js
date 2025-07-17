let lyricsData = [];
let currentIndex = 0;
let score = 0;
let selectedRounds = [];
let timerInterval; // For controlling the timer
let timeLeft = 10;

// Play button click handler
document.getElementById("playButton").addEventListener("click", loadLyrics);

// Enter key submission support
document.getElementById("userGuess").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        clearInterval(timerInterval);
        checkAnswer();
    }
});

async function loadLyrics() {
    try {
        document.getElementById("playButton").style.display = "none";
        document.getElementById("gameArea").style.display = "block";
        document.getElementById("userGuess").style.display = "inline-block";

        const response = await fetch("lyrics.json");
        if (!response.ok) throw new Error("Failed to load lyrics data");

        lyricsData = await response.json();

        if (lyricsData.length < 5) {
            document.getElementById("resultText").textContent = "❌ Not enough lyrics data to start the game.";
            document.getElementById("playButton").style.display = "inline-block";
            document.getElementById("gameArea").style.display = "none";
            return;
        }

        startGame();
    } catch (error) {
        console.error("Error loading lyrics:", error);
        document.getElementById("resultText").textContent = "❌ Error loading lyrics. Try again.";
        document.getElementById("playButton").style.display = "inline-block";
    }
}

function startGame() {
    score = 0;
    currentIndex = 0;
    selectedRounds = shuffleArray(lyricsData).slice(0, 5);
    document.getElementById("resultText").textContent = "";
    showNextLine();
}

function showNextLine() {
    const current = selectedRounds[currentIndex];
    document.getElementById("lineText").textContent = current.prompt;
    document.getElementById("userGuess").value = "";
    document.getElementById("userGuess").focus();
    document.getElementById("roundInfo").textContent = `Round ${currentIndex + 1} of 5`;

    timeLeft = 10;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    const userGuess = document.getElementById("userGuess").value.trim().toLowerCase();
    const correctAnswer = selectedRounds[currentIndex].answer.toLowerCase();

    if (userGuess === correctAnswer) {
        score++;
        document.getElementById("resultText").textContent = "✅ Correct!";
        document.getElementById("resultText").style.color = "lightgreen";
    } else {
        document.getElementById("resultText").textContent = `❌ Correct: "${selectedRounds[currentIndex].answer}"`;
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
    clearInterval(timerInterval);
    document.getElementById("lineText").textContent = "";
    document.getElementById("roundInfo").textContent = "";
    document.getElementById("userGuess").style.display = "none";
    document.getElementById("resultText").textContent = `🎶 Game Over! Your Score: ${score}/5`;
    document.getElementById("resultText").style.color = "#1db954";
    document.getElementById("playButton").style.display = "inline-block";
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
