const astronomyQuestions = [
  {
    question: "What is the closest planet to the Sun?",
    options: ["Earth", "Venus", "Mercury", "Mars"],
    correctAnswer: "Mercury"
  },
  {
    question: "What tool do astronomers use to observe distant stars?",
    options: ["Microscope", "Compass", "Telescope", "Radar"],
    correctAnswer: "Telescope"
  }
  // Add more questions here...
];

const astrophysicsQuestions = [
  {
    question: "What is a black hole?",
    options: [
      "A hole in space",
      "A region with extremely low gravity",
      "A region of spacetime with gravity so strong nothing can escape",
      "An exploding star"
    ],
    correctAnswer: "A region of spacetime with gravity so strong nothing can escape"
  },
  {
    question: "What type of wave is used to detect distant galaxies?",
    options: ["Radio waves", "Sound waves", "Water waves", "Gamma rays"],
    correctAnswer: "Radio waves"
  }
  // Add more astrophysics questions here
];

// Firestore setup (assumes firebase-config.js already initializes Firebase)
const db = firebase.firestore();

// Wait for the DOM
window.addEventListener("DOMContentLoaded", () => {
  const topic = localStorage.getItem("quizTopic");
  let questions = [];

  if (topic === "astronomy") {
    questions = astronomyQuestions;
  } else if (topic === "astrophysics") {
    questions = astrophysicsQuestions;
  }

  const container = document.getElementById("questions-container");

  questions.forEach((q, i) => {
    const block = document.createElement("div");
    block.innerHTML = `
      <p>${i + 1}. ${q.question}</p>
      ${q.options.map(option => `
        <label>
          <input type="radio" name="q${i}" value="${option}"> ${option}
        </label><br>
      `).join('')}
    `;
    container.appendChild(block);
  });

  document.getElementById("quiz-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let score = 0;

    questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value === q.correctAnswer) score++;
    });

    document.getElementById("score-display").textContent = `You scored ${score}/${questions.length}`;

    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      await db.collection("scores").doc(uid).set({
        [topic]: score
      }, { merge: true });
    }
  });
});
