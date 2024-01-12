const letters = Array.from("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM");
const gameCont = document.getElementById("game-board-container");
const guessedCont = document.getElementById("guessed-box-container");
let wordArray = [];
let gameWord = "";
let userScore = 70;

// function to get a random word from the api
function getWord() {
    return fetch(`https://random-word-api.vercel.app/api?words=1&length=7`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            gameWord = data[0];
            wordArray = Array.from(gameWord);
            makeGame(wordArray);
            console.log(gameWord);
            console.log(wordArray);
        })
}

// function to make the game board of blank spaces
// use template literal to insert html of blanks
// each blank has its own id? for targetting purposes?
function makeGame(array) {
    for (i = 0; i < array.length; i++) {
        let gameBlank = document.createElement("span");
        gameBlank.textContent = "_ ";
        gameBlank.setAttribute("data-letter", array[i]);
        gameCont.appendChild(gameBlank);
        console.log(gameBlank);
    }
}

//function to compare the letter guessed versus the game word
// make conditional statement: if gameword contains letterguessed, add it to gameboard
// if word is finished or out of points, run gameOver
document.addEventListener("keyup", function (event) {
    let guess = event.key; // assigns the typed key to a variable
    let correctGuess = wordArray.includes(guess); // checks if wordArray contains the letter, returns boolean
    if (letters.includes(guess)) {
        let correctSpot = document.querySelectorAll(`[data-letter=${guess}]`);
        for (i = 0; i < correctSpot.length; i++) {
                // populate the blanks
                correctSpot[i].textContent = guess;
        }
        if (!correctGuess) {
            //populate the guessed letters box
            //deduct points
            let wrongGuesses = `<span>${guess} </span>`;
            guessedCont.innerHTML += wrongGuesses;
            userScore = userScore -= 10;
            if (userScore == 0) gameOver();
            return;
        }
    } else {
        return;
    }
})

getWord();

document.addEventListener('DOMContentLoaded', function () {
    const hintContainer = document.getElementById('hint-container');
    const currentWord = 'example';

    function getWordSynonym(word) {
        const apiKey = 'apikey';
        const apiUrl = `https://api.example.com/synonym?word=${word}&apiKey=${apiKey}`;

        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                return data.getWordSynonym;
            })
            .catch(error => {
                console.error(`Failed to fetch: ${error.message}`);
                return 'synonym not available';// example for console 
            });
    }
    function showMessage(message) {
        hintContainer.innerHTML = message;
    }
    function Hint() {
        hintContainer.addEventListener('click', function () {
            getWordSynonym(currentWord)
                .then(wordSynonym => {
                    showMessage(`Synonym of ${currentWord}: ${wordSynonym}`);
                });
        });
    }
    Hint();
});

document.addEventListener('DOMContentLoaded', function () {
    const rulesContainer = document.getElementById('rules-container');
    const rulesContent = document.getElementById('rulesContent');

    if (rulesContainer && rulesContent) {
        let isOpen = false;

        rulesContainer.addEventListener('click', function () {
            isOpen = !isOpen;
            rulesContent.style.display = isOpen ? 'block' : 'none';
        });
    }
});