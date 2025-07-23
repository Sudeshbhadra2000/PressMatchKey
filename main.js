const circle = document.getElementById("circle");
const letterSpan = document.getElementById("letter");

const correctSound = new Audio("Sounds/success.mp3");
const incorrectSound = new Audio("Sounds/fail.mp3");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let currentLetter = getRandomLetter(null);
letterSpan.textContent = currentLetter;

function getRandomLetter(previous) {
  let newLetter;
  do {
    newLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  } while (newLetter === previous);
  return newLetter;
}

function flashColor(className) {
  circle.classList.remove("correct", "incorrect");
  circle.classList.add(className);

  setTimeout(() => {
    circle.classList.remove(className);
  }, 500);
}

function playSound(isCorrect) {
  if (isCorrect) {
    correctSound.currentTime = 0;
    correctSound.play();
  } else {
    incorrectSound.currentTime = 0;
    incorrectSound.play();
  }
}

function handleKeyPress(key) {
  key = key.toLowerCase();

  if (!key.match(/^[a-z]$/)) {
    flashColor("incorrect");
    playSound(false);
    return;
  }

  if (key === currentLetter.toLowerCase()) {
    flashColor("correct");
    playSound(true);
    currentLetter = getRandomLetter(currentLetter);
    letterSpan.textContent = currentLetter;
  } else {
    flashColor("incorrect");
    playSound(false);
  }
}

document.addEventListener("keydown", (e) => {
  handleKeyPress(e.key);
});
