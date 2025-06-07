const questions = {
  astronomy: [/* ... */],
  astrophysics: [/* ... */]
};

function loadQuiz() {
  const topic = localStorage.getItem('quizTopic');
  const quizData = questions[topic];
  const container = document.getElementById('quiz-container');

  quizData.forEach((q, i) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${i + 1}. ${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${i}" value="${opt}">
          ${opt}
        </label><br>`).join('')}
    `;
    container.appendChild(div);
  });
}
