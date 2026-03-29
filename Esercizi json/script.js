const speciesInput = document.getElementById("species");
const descriptionInput = document.getElementById("description");
const form = document.getElementById("searchForm");
const resultsCount = document.getElementById("resultsCount");
const resultsContainer = document.getElementById("resultsContainer");

let pokemonData = [];

// FETCH
function fetchPokemon() {
    fetch("https://cdn.jsdelivr.net/gh/Purukitto/pokemon-data.json/pokedex.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            pokemonData = data;
        });
}

// SUBMIT (stile house: funzione separata)
function renderPokemon(e) {
    e.preventDefault();

    const species = speciesInput.value.toLowerCase();
    const description = descriptionInput.value.toLowerCase();

    const filteredPokemon = pokemonData.filter(p => {
        const name = p.name.english.toLowerCase();
        const desc = p.description.toLowerCase();

        const matchSpecies = species === "" || name.includes(species);
        const matchDescription = description === "" || desc.includes(description);

        return matchSpecies && matchDescription;
    });

    displayResults(filteredPokemon);
}

// EVENT
form.addEventListener("submit", renderPokemon);

// DISPLAY (LA TUA VERSIONE IDENTICA)
function displayResults(results) {
    resultsContainer.innerHTML = "";

    resultsCount.textContent = `Results returned: ${results.length}`;

    if (results.length === 0) {
        resultsContainer.innerHTML = "<div class='no-results'>No pokemon found</div>";
        return;
    }

    function renderPokemon(pokemon) {
        const card = document.createElement("div");
        card.className = "pokemon-card";

        card.innerHTML = `
            <h3>${pokemon.name.english}</h3>
            <p><strong>ID:</strong> ${pokemon.id}</p>
            <p><strong>Description:</strong> ${pokemon.description}</p>
        `;

        resultsContainer.appendChild(card);
    }

    for (let pokemon of results) {
        renderPokemon(pokemon);
    }
}

// LOAD
window.addEventListener("load", fetchPokemon);