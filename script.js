const names = [];
const evaluations = [];

function addName() {
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value.trim();

  if (name !== '' && !names.includes(name)) {
    names.push(name);
    nameInput.value = '';
    displayResults();
  }
}

function submitEvaluation() {
  const starRating = document.getElementById('starRating').value;
  evaluations.push({ type: 'Star', rating: starRating });
  displayResults();
}

function submitFeedback() {
  const narrativeInput = document.getElementById('narrativeInput');
  const feedback = narrativeInput.value.trim();

  if (feedback !== '') {
    evaluations.push({ type: 'Narrative', feedback: feedback });
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
