const colors = ['green', 'red', 'blue', 'yellow'];
const sound = new Audio('sus-meme-sound-181271.mp3');

let gamePattern = [];
let userPattern = [];
let level = 0;
let canClick = false;

const playBtn = document.getElementById('playBtn');
const squares = document.querySelectorAll('.square');
const title = document.querySelector('h1');

// Start game on Play button click
playBtn.addEventListener('click', startGame);

// Add click listeners to squares
squares.forEach(square => {
  square.addEventListener('click', (e) => {
    if (!canClick) return; // ignore clicks during pattern show
    const chosenColor = e.target.id;
    userPattern.push(chosenColor);
    playSound();
    animatePress(chosenColor);
    checkAnswer(userPattern.length - 1);
  });
});

function startGame() {
  gamePattern = [];
  userPattern = [];
  level = 0;
  nextSequence();
}

function nextSequence() {
  canClick = false; // block clicks while showing pattern
  userPattern = [];
  level++;
  title.textContent = "Level " + level;

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);

  // Show pattern slowly
  let i = 0;
  const interval = setInterval(() => {
    animatePress(gamePattern[i]);
    playSound();
    i++;
    if (i >= gamePattern.length) {
      clearInterval(interval);
      canClick = true; // allow clicks after showing
    }
  }, 800); // adjust speed if needed
}

function checkAnswer(currentIndex) {
  if (userPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userPattern.length === gamePattern.length) {
      // correct full pattern → next level
      setTimeout(nextSequence, 1000);
    }
  } else {
    // wrong answer
    title.textContent = "Game Over! Click Play to restart.";
    gamePattern = [];
    userPattern = [];
    level = 0;
    canClick = false;
  }
}

function animatePress(color) {
  const square = document.getElementById(color);
  square.classList.add('active');
  setTimeout(() => {
    square.classList.remove('active');
  }, 300);
}

function playSound() {
  sound.currentTime = 0;
  sound.play();
}

