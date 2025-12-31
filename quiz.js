const db = firebase.firestore();
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  // 1. Parse URL Params to determine which quiz to load
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section'); // e.g., 'astronomy' or 'astrophysics'
  const subsection = urlParams.get('subsection'); // e.g., 'telescopes' or 'item1' (key in data)

  // Helper: Generate a unique ID for this specific quiz (for Firestore persistence)
  // Structure: "astronomy_unit" or "astronomy_telescopes"
  const quizId = `${section}_${subsection || 'unit'}`;

  // 2. Load the correct questions from QUIZ_DATA
  let questions = [];
  let sectionTitle = "";

  if (!window.QUIZ_DATA || !window.QUIZ_DATA[section]) {
    alert("Quiz data not found for this section.");
    return;
  }

  if (subsection) {
    // Subsection Quiz
    questions = window.QUIZ_DATA[section].subsections[subsection];
    sectionTitle = `${capitalize(section)}: ${capitalize(subsection.replace('item', 'Topic '))}`;
  } else {
    // Unit Quiz
    questions = window.QUIZ_DATA[section].unit;
    sectionTitle = `${capitalize(section)} Unit Quiz`;
  }

  if (!questions) {
    alert("No questions found for this topic.");
    return;
  }

  // Update Header
  document.querySelector('.page-title').textContent = sectionTitle;

  // 3. Render Questions
  const container = document.getElementById("questions-container");
  container.innerHTML = ''; // Clear loading state

  questions.forEach((q, index) => {
    const block = document.createElement("div");
    block.className = "question-block";
    block.innerHTML = `
            <p class="question-text">${index + 1}. ${q.question}</p>
            <div class="options-container">
                ${q.options.map(option => `
                    <label class="option-label">
                        <input type="radio" name="q${index}" value="${option}" data-index="${index}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
    container.appendChild(block);
  });

  // 4. Handle Auth & Persistence
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is logged in: Load progress
      const docRef = db.collection('users').doc(user.uid).collection('quizProgress').doc(quizId);

      try {
        const doc = await docRef.get();
        if (doc.exists) {
          const data = doc.data();

          // Restore answers
          if (data.answers) {
            Object.keys(data.answers).forEach(key => { // key is index "0", "1"...
              const val = data.answers[key];
              const input = document.querySelector(`input[name="q${key}"][value="${val}"]`);
              if (input) input.checked = true;
            });
          }

          // If quiz was already completed, show score immediately? 
          // Optional: For now we just let them see their answers and re-submit if they want.
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      }

      // Enable Auto-Save on selection
      container.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
          const index = e.target.getAttribute('data-index');
          const value = e.target.value;

          // Save specific answer
          docRef.set({
            answers: {
              [index]: value
            },
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            totalQuestions: questions.length
            // We calculate 'completedQuestions' by count in cloud functions or just client side read
          }, { merge: true });
        }
      });

    } else {
      console.log("User not logged in. Progress will not be saved.");
      // Optional: Show a toast/banner encouraging login
    }
  });

  // 5. Handle Submission
  document.getElementById("quiz-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let score = 0;
    let answeredParams = {};

    questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected) {
        answeredParams[i] = selected.value;
        if (selected.value === q.correctAnswer) {
          score++;
        }
      }
    });

    // Display Score
    const scoreDisplay = document.getElementById("score-display");
    const percentage = Math.round((score / questions.length) * 100);
    scoreDisplay.innerHTML = `
            <h3>You scored ${score} / ${questions.length} (${percentage}%)</h3>
            <p>${percentage >= 70 ? 'Great job! 🌟' : 'Keep studying! 📚'}</p>
        `;

    // Save Final Score if logged in
    const user = auth.currentUser;
    if (user) {
      const docRef = db.collection('users').doc(user.uid).collection('quizProgress').doc(quizId);
      await docRef.set({
        answers: answeredParams, // Ensure all current state is saved
        score: score,
        completed: true,
        completedAt: firebase.firestore.FieldValue.serverTimestamp(),
        totalQuestions: questions.length,
        percentage: percentage
      }, { merge: true });
    }
  });
});

// Helper
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
