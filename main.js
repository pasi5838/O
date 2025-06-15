
let questions = [];
let currentQuestion = 0;
let lives = 3;

fetch("questions.json")
  .then((res) => res.json())
  .then((data) => {
    questions = data.sort(() => Math.random() - 0.5);
    showQuestion();
  });

function showQuestion() {
  if (lives <= 0) {
    document.getElementById("question").innerText = "Game Over!";
    return;
  }
  if (currentQuestion >= questions.length) {
    document.getElementById("question").innerText = "Selamat! Kamu selesai!";
    return;
  }
  document.getElementById("question").innerText = questions[currentQuestion].question;
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.toLowerCase().trim();
  const correct = questions[currentQuestion].answer.toLowerCase().trim();
  if (userAnswer === correct) {
    triggerConfetti();
    currentQuestion++;
    document.getElementById("answer").value = "";
    setTimeout(showQuestion, 1000);
  } else {
    lives--;
    updateLives();
  }
}

function updateLives() {
  document.getElementById("lives").innerText = "❤️".repeat(lives);
  if (lives === 0) {
    document.getElementById("question").innerText = "Game Over!";
  }
}

function restartGame() {
  lives = 3;
  currentQuestion = 0;
  document.getElementById("answer").value = "";
  questions = questions.sort(() => Math.random() - 0.5);
  updateLives();
  showQuestion();
}

function triggerConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  canvas.style.display = "block";
  setTimeout(() => {
    canvas.style.display = "none";
  }, 3000);
}
