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
  evaluations.push({ type: 'Star', rating: starRating });
  saveToLocalStorage('evaluations', evaluations);
  displayResults();
}

function submitFeedback() {
  const narrativeInput = document.getElementById('narrativeInput');
  const feedback = narrativeInput.value.trim();

  if (feedback !== '') {
    evaluations.push({ type: 'Narrative', feedback: feedback });
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
      if (eval.type === 'Star') {
        listItem.innerHTML += `${eval.rating} stars`;
      } else if (eval.type === 'Narrative') {
        listItem.innerHTML += `<em>"${eval.feedback}"</em>`;
      }

      listItem.innerHTML += ' | ';
    });

    resultsList.appendChild(listItem);
  }
}
