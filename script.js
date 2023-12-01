const names = loadFromLocalStorage('names') || [];
const evaluations = loadFromLocalStorage('evaluations') || [];

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function addName() {
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value.trim();

  if (name !== '' && !names.includes(name)) {
    names.push(name);
    saveToLocalStorage('names', names);
    nameInput.value = '';
    displayResults();
  }
}

function submitEvaluation() {
  const starRating = document.getElementById('starRating').value;
  const evaluator = prompt("Enter your name:");

  if (evaluator !== null && evaluator.trim() !== '') {
    evaluations.push({ type: 'Star', rating: starRating, evaluator: evaluator, timestamp: Date.now() });
    saveToLocalStorage('evaluations', evaluations);
    displayResults();
  }
}

function submitFeedback() {
  const narrativeInput = document.getElementById('narrativeInput');
  const feedback = narrativeInput.value.trim();
  const evaluator = prompt("Enter your name:");

  if (evaluator !== null && evaluator.trim() !== '' && feedback !== '') {
    evaluations.push({ type: 'Narrative', feedback: feedback, evaluator: evaluator, timestamp: Date.now() });
    saveToLocalStorage('evaluations', evaluations);
    narrativeInput.value = '';
    displayResults();
  }
}

function displayResults() {
  const resultsList = document.getElementById('resultsList');
  resultsList.innerHTML = '';

  for (let i = 0; i < names.length; i++) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${names[i]}</strong>: `;
    
    const nameEvaluations = evaluations.filter(eval => eval.name === names[i]);

    nameEvaluations.forEach(eval => {
      listItem.innerHTML += `Evaluated by: <strong>${eval.evaluator}</strong> | `;

      if (eval.type === 'Star') {
        listItem.innerHTML += `${eval.rating} stars`;
      } else if (eval.type === 'Narrative') {
        listItem.innerHTML += `<em>"${eval.feedback}"</em>`;
      }

      listItem.innerHTML += '<span>Date: ' + new Date(eval.timestamp).toLocaleString() + '</span>';
    });

    resultsList.appendChild(listItem);
  }
}
}
