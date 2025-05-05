let lyricsData = [];
let gameLines = [];
let currentIndex = 0;
let score = 0;

// Set up play button click handler
document.getElementById("playButton").addEventListener("click", loadLyrics);

async function loadLyrics() {
    try {
        // Hide play button and show game area with lyrics
        document.getElementById("playButton").style.display = "none";
        document.getElementById("gameArea").style.display = "block";
        document.getElementById("userGuess").style.display = "inline-block"; // Show input box and submit button
        
        // Fetch the lyrics data
        const response = await fetch('lyrics.json');
        if (!response.ok) {
            throw new Error('Failed to load lyrics data');
        }
        lyricsData = await response.json();
        startGame();
    } catch (error) {
        console.error('Error loading lyrics:', error);
        document.getElementById("lineText").textContent = "Error loading lyrics. Please try again later.";
        // Show play button again if error occurs
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
    document.getElementById("lineText").textContent = current.prompt; // Display the lyrics prompt
    document.getElementById("userGuess").value = ""; // Clear the input field
    document.getElementById("userGuess").focus(); // Focus on the input field for user to type
    document.getElementById("roundInfo").textContent = `Round ${currentIndex + 1} of 5`; // Show the round info

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
    const correct = gameLines[currentIndex].answer.toLowerCase();

    if (userGuess === correct) {
        score++;
        document.getElementById("resultText").textContent = "✅ Correct!";
        document.getElementById("resultText").style.color = "lightgreen";
    } else {
        document.getElementById("resultText").textContent = `❌ The correct lyric was: "${gameLines[currentIndex].answer}"`;
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
    document.getElementById("userGuess").style.display = "none"; // Hide the input box after the game ends
    document.getElementById("resultText").textContent = `🎶 Game Over! Your Score: ${score}/5`;
    document.getElementById("resultText").style.color = "#1db954"; // Use green for score display
    
    // Show play button again for restarting the game
    document.getElementById("playButton").style.display = "inline-block";
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
