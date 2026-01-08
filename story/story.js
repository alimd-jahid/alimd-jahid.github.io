// Selettori principali
const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");//GENERATORE
const story = document.querySelector(".story");//STORIA
const bottone = document.querySelector(".ResetButton");//RESET
const colorPicker = document.getElementById("color-picker");//COLORE SFONDO
const colorValue = document.getElementById("color-value");
const saveBtn = document.querySelector(".save");//SALVA
const fontSizeInput = document.getElementById("font-size");//DIMENSIONE TESTO
const shiftInput = document.getElementById("shift");
const encryptBtn = document.getElementById("encrypt-btn");

// 🔹 Nuovi selettori per la ricerca parole
const searchInput = document.getElementById("search-word");
const searchBtn = document.getElementById("search-btn");

// Funzione per ottenere un valore casuale da un array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Array di opzioni per la storia
const characters = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const places = ["the soup kitchen", "Disneyland", "the White House"];
const events = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and slithered away",
];

// Genera una stringa casuale di storia
function returnRandomStoryString() {
  const randomCharacter = randomValueFromArray(characters);
  const randomPlace = randomValueFromArray(places);
  const randomEvent = randomValueFromArray(events);

  let storyText = `It was 94 Fahrenheit outside, so ${randomCharacter} went for a walk. When they got to ${randomPlace}, they stared in horror for a few moments, then ${randomEvent}. Bob saw the whole thing, but was not surprised — ${randomCharacter} weighs 300 pounds, and it was a hot day.`;

  return storyText;
}

// Genera una nuova storia
function generateStory() {
  let newStory = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300 / 14)} stone`;
    const temperature = `${Math.round((94 - 32) * (5 / 9))} Celsius`;
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 Fahrenheit", temperature);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}

// Reset della storia
function resetStory() {
  story.textContent = "";
  story.style.visibility = "hidden";
  customName.value = "";
  document.getElementById("uk").checked = false;
  colorPicker.value = "#ffc833";
  story.style.backgroundColor = colorPicker.value;
  colorValue.textContent = "giallo";
}

// Cambia colore di sfondo (doppio click sul bottone reset)
function cambiaSfondo() {
  document.body.style.backgroundColor = "lightblue";
}

// Cambia colore dello sfondo della storia tramite color picker
colorPicker.addEventListener("input", function() {
  const color = colorPicker.value;
  story.style.backgroundColor = color;

  if (color === "#ffc833") colorValue.textContent = "giallo";
  else if (color === "#ff0000") colorValue.textContent = "rosso";
  else if (color === "#00ff00") colorValue.textContent = "verde";
  else if (color === "#0000ff") colorValue.textContent = "blu";
  else colorValue.textContent = color;
});

// 🔹 Funzione per salvare il testo su file .txt
function saveTextToFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

// Quando si clicca su “Salva storia”
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    if (story.textContent.trim() !== "") {
      saveTextToFile(story.textContent, "storia.txt");
    } else {
      alert("Non c’è nessuna storia da salvare!");
    }
  });
}

// Cambia dimensione del carattere della storia
if (fontSizeInput) {
  fontSizeInput.addEventListener("input", function () {
    story.style.fontSize = `${fontSizeInput.value}px`;
  });
}

// 🔹 Funzione di crittografia (Cifrario di Cesare)
function caesarCipher(text, shift) {
  return text.split("").map(char => {
    if (char.match(/[a-z]/)) {
      const code = ((char.charCodeAt(0) - 97 + shift) % 26) + 97;
      return String.fromCharCode(code);
    } else if (char.match(/[A-Z]/)) {
      const code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
      return String.fromCharCode(code);
    } else {
      return char; // caratteri non alfabetici restano invariati
    }
  }).join("");
}

// 🔹 Quando si clicca su “Encrypt Story”
encryptBtn.addEventListener("click", () => {
  if (story.textContent.trim() === "") {
    alert("Genera prima una storia da crittografare!");
    return;
  }

  const shift = parseInt(shiftInput.value);
  if (isNaN(shift) || shift < 1 || shift > 25) {
    alert("Inserisci un valore di shift tra 1 e 25!");
    return;
  }

  const encryptedText = caesarCipher(story.textContent, shift);
  story.textContent = encryptedText;
});

// CERCA PAROLA e EVIDENZIA 
function searchWord() {
  const text = story.textContent;
  const word = searchInput.value.trim();

  if (text === "") {
    alert("Genera prima una storia!");
    return;
  }

  if (word === "") {
    alert("Inserisci una parola da cercare!");
    return;
  }

  const regex = new RegExp(`(${word})`, "gi");
  const evidenziato = text.replace(regex, "<mark>$1</mark>");

  story.innerHTML = evidenziato; // <<< serve innerHTML per mostrare <mark>
}

// BOTTONI CLICK
generateBtn.addEventListener("click", generateStory);
bottone.addEventListener("click", resetStory);
bottone.addEventListener("dblclick", cambiaSfondo);
searchBtn.addEventListener("click", searchWord); 
