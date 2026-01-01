const db = firebase.firestore();
const auth = firebase.auth();

let currentQuestions = []; // Store current set for redo clarity

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section');
  const subsection = urlParams.get('subsection');
  const quizId = `${section}_${subsection || 'unit'}`;

  // 1. Dynamic Back Button
  const backBtn = document.querySelector('.back-button');
  if (backBtn && section) {
    // If we are in a subsection, go back to the section page
    if (section === 'astronomy') backBtn.href = 'Bala_astro6.html';
    else if (section === 'astrophysics') backBtn.href = 'astrophysics.html';
  }

  // 2. Load Data
  if (!window.QUIZ_DATA || !window.QUIZ_DATA[section]) {
    document.getElementById("questions-container").innerHTML = "<p>Quiz data not found.</p>";
    return;
  }

  let originalQuestions = [];
  let sectionTitle = "";

  if (subsection) {
    originalQuestions = window.QUIZ_DATA[section].subsections[subsection];
    sectionTitle = `${capitalize(section)}: ${capitalize(subsection.replace('item', 'Topic '))}`;
  } else {
    originalQuestions = window.QUIZ_DATA[section].unit;
    sectionTitle = `${capitalize(section)} Unit Quiz`;
  }

  document.querySelector('.page-title').textContent = sectionTitle;

  // 3. Render Function (supports shuffling)
  function renderQuiz(questionsToRender) {
    const container = document.getElementById("questions-container");
    container.innerHTML = '';
    currentQuestions = questionsToRender; // Update global state

    currentQuestions.forEach((q, index) => {
      const block = document.createElement("div");
      block.className = "question-block";
      // Store correct answer in data attribute for easy validation later
      block.dataset.correct = q.correctAnswer;

      block.innerHTML = `
                <p class="question-text">${index + 1}. ${q.question}</p>
                <div class="options-container" id="q${index}-options">
                    ${q.options.map(option => `
                        <label class="option-label">
                            <input type="radio" name="q${index}" value="${option}">
                            <span class="option-text">${option}</span>
                            <span class="feedback-icon"></span>
                        </label>
                    `).join('')}
                </div>
            `;
      container.appendChild(block);
    });

    // Hide score/redo on fresh render
    const scoreDisplay = document.getElementById("score-display");
    scoreDisplay.innerHTML = "";
    scoreDisplay.style.display = 'none';

    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.style.display = 'block';
  }

  // Initial Load (Shuffle)
  renderQuiz(shuffleArray([...originalQuestions]));

  // 4. Persistence (Load Previous Answers) - Adjusted to be simple for now
  // Since we shuffle, index-based restoring is tricky. 
  // For now, we only auto-load if we haven't shuffled (or we disable shuffle on resume).
  // Given the user wants "Shuffle", we prioritize that. 
  // We will still log persistence for the progress bar, but maybe not pre-populate the answers 
  // if the order is randomized every time.

  // 5. Submit Handler
  const form = document.getElementById("quiz-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Submitting quiz...");

      let score = 0;
      let incorrectCount = 0;

      // Clear previous marks
      document.querySelectorAll('.error-x').forEach(el => el.remove());
      document.querySelectorAll('.feedback-icon').forEach(el => el.innerHTML = '');

      currentQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);

        if (selected) {
          if (selected.value === q.correctAnswer) {
            score++;
          } else {
            incorrectCount++;
            // Mark incorrect
            const label = selected.closest('label');
            const feedback = label.querySelector('.feedback-icon');
            if (feedback) feedback.innerHTML = '<span class="error-x">❌</span>';
          }
        }
      });

      // Show Results
      const scoreDisplay = document.getElementById("score-display");
      const percentage = Math.round((score / currentQuestions.length) * 100);

      scoreDisplay.style.display = 'block';
      scoreDisplay.innerHTML = `
                <h3>You scored ${score} / ${currentQuestions.length} (${percentage}%)</h3>
                <p>${incorrectCount > 0 ? 'Check the markings above to see incorrect answers.' : 'Perfect Score!'}</p>
                <button type="button" id="redo-btn" class="primary-button" style="margin-top:15px; display:block; margin-left:auto; margin-right:auto;">Redo Quiz (New Questions)</button>
            `;

      // Hide Submit Button
      const submitBtn = document.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.style.display = 'none';

      // Bind Redo
      const redoBtn = document.getElementById("redo-btn");
      if (redoBtn) {
        redoBtn.addEventListener("click", () => {
          renderQuiz(shuffleArray([...originalQuestions]));
          window.scrollTo(0, 0);
        });
      }

      // Save Progress if logged in (Background)
      const user = auth.currentUser;
      if (user) {
        const docRef = db.collection('users').doc(user.uid).collection('quizProgress').doc(quizId);
        docRef.set({
          score: score,
          completed: true,
          totalQuestions: currentQuestions.length,
          percentage: percentage,
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }).catch(err => console.log("Save error", err));
      }
    });
  } else {
    console.error("Quiz form not found!");
  }
});

// Helper: Shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
