const correctCode = "swag";
let attemptsLeft = 5;
let timeLeft = 180;
let timerInterval;

const textSequence = [
  "Vous avez réussi à venir jusqu'ici,",
  "mais ...",
  "Ce n'est pas terminé",
  "Il vous faut insérer le code."
];

let currentTextIndex = 0;
const dynamicText = document.getElementById("dynamicText");

window.onload = () => {
  showNextText();
};

function showNextText() {
  if (currentTextIndex < textSequence.length) {
    dynamicText.classList.remove("show");
    setTimeout(() => {
      dynamicText.textContent = textSequence[currentTextIndex];
      dynamicText.classList.add("show");
      currentTextIndex++;
      setTimeout(() => {
        if (currentTextIndex < textSequence.length) {
          dynamicText.classList.remove("show");
        }
        showNextText();
      }, 2500);
    }, 500);
  } else {
    document.getElementById("gameSection").classList.remove("hidden");
    startTimer();
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Temps restant : ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
  }, 1000);
}

function checkCode() {
  const input = document.getElementById("codeInput").value.trim().toLowerCase();
  const message = document.getElementById("message");
  const hint = document.getElementById("hint");

  if (input === correctCode) {
    endGame(true);
  } else {
    attemptsLeft--;
    message.textContent = `Code incorrect. Tentatives restantes : ${attemptsLeft}`;

    if (attemptsLeft === 2) {
      hint.classList.remove("hidden");
    }

    if (attemptsLeft <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
  }
}

function endGame(success) {
  document.getElementById("codeInput").disabled = true;
  document.querySelector("button").disabled = true;
  document.getElementById("gameSection").classList.add("hidden");
  dynamicText.classList.add("hidden");

  if (success) {
    document.getElementById("success").classList.remove("hidden");
    launchConfetti();
  } else {
    document.getElementById("fail").classList.remove("hidden");
  }
}

function launchConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
