var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedButton = [];
var level = 0;

// Get and display best score at the start
var bestScore = getBestScore();
document.querySelector("#bestscore").innerHTML = "Best Score: " + bestScore;

function start() {
    document.addEventListener("keydown", function() {
        if (level === 0) {
            nextSequence();
        }
    });
}

function nextSequence() {
    userClickedButton = [];
    level++;
    document.querySelector("h1").innerHTML = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    setAnimation(randomChosenColor);
    addSound(randomChosenColor);

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", handleClick);
    });
}

function handleClick() {
    var userChosenColor = this.id;
    setAnimation(userChosenColor);
    addSound(userChosenColor);
    handler(userChosenColor);
}

function handler(key) {
    userClickedButton.push(key);
    checkAnswer(userClickedButton.length - 1);
}

function checkAnswer(currentLevel) {
    if (userClickedButton[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedButton.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
        updateBestScore(level);
        startOver();
    }
}

function addSound(key) {
    var audio = new Audio("./sounds/" + key + ".mp3");
    audio.play();
}

function setAnimation(key) {
    var buttonClicked = document.getElementById(key);
    buttonClicked.classList.add("pressed");
    setTimeout(function() {
        buttonClicked.classList.remove("pressed");
    }, 100);
}

function startOver() {
    addSound("wrong");
    var body = document.querySelector("body");
    body.classList.add("gameover");
    setTimeout(function() {
        body.classList.remove("gameover");
    }, 300);
    level = 0;
    gamePattern = [];
    userClickedButton = [];
}

function setBestScore(score) {
    localStorage.setItem("bestScore", score);
}

function getBestScore() {
    return localStorage.getItem("bestScore") ? parseInt(localStorage.getItem("bestScore")) : 0; // Default to 0 if no score is found
}

function updateBestScore(currentScore) {
    const storedBestScore = getBestScore();
    if (currentScore > storedBestScore) {
        setBestScore(currentScore);
        document.querySelector("#bestscore").innerHTML = "Best Score: " + currentScore; // Update display
    }
}

// Initialize the game
start();
