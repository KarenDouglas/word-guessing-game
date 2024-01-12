const letters = Array.from("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM");
const gameCont = document.getElementById("game-board-container");
const guessCont = document.getElementById("guessed-box-container");
let wordArray = [];
let gameWord = "";
let userScore = 70;
let wrongGuesses = [];

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

//  This function waits for the user to guess a letter,
//  then renders it either to the game container if right,
//  or into the wrong guesses container if incorrect.
//  It also runs the gameOver function either when the 
//  word is completed, or the user's score is zero. 
document.addEventListener("keyup", function (event) {
    let guess = event.key;
    let correctGuess = wordArray.includes(guess);
    // The first part of this conditional adds letters to the correct spot
    if (letters.includes(guess)) {
        let correctSpot = document.querySelectorAll(`[data-letter=${guess}]`);
        for (i = 0; i < correctSpot.length; i++) {
            correctSpot[i].textContent = guess;
        }
        // This conditional adds an incorrect guess to the proper spot
        if (!correctGuess) {
            let wrongGuess = `<span id="guesses">${guess} </span>`;
            if (!wrongGuesses.includes(guess)) {
                wrongGuesses.push(guess)
                guessCont.innerHTML += wrongGuess;
                userScore = userScore -= 10;
                if (userScore == 0) gameOver(false);
            } else {
                return;
            }
        }
        // This checks if there are any blank letters left
        if (!gameCont.innerText.includes("_")) {
            gameOver(true);
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