const names = [];

function addNames() {
    for (let i = 1; i <= 7; i++) {
        const name = prompt(`Enter Name ${i}:`);
        if (name) {
            const rating = prompt(`Enter Rating (1-5) for ${name}:`);
            if (rating && parseInt(rating) >= 1 && parseInt(rating) <= 5) {
                names.push({ name, rating });
            } else {
                alert("Please enter a valid rating (1-5).");
                return;
            }
        } else {
            alert("Please enter a name.");
            return;
        }
    }

    displayResults();
}

function displayResults() {
    const nameList = document.getElementById("nameList");
    const resultsList = document.getElementById("results");

    // Clear previous data
    nameList.innerHTML = "";
    resultsList.innerHTML = "";

    // Display names and ratings
    names.forEach((person) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${person.name}</strong> - ${person.rating} stars`;
        nameList.appendChild(listItem);
    });

    // Display detailed results
    names.forEach((person) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${person.name}</strong>
            <div class="star-rating">
                <span style="width: ${person.rating * 20}%">☆☆☆☆☆</span>
            </div>
            <p>Rating: ${person.rating} stars</p>
        `;
        resultsList.appendChild(listItem);
    });
}
