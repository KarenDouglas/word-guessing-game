const gameCont = document.getElementById("game-board-container");
const $highScoresContainer = document.getElementById('high-scores-container');
const dictionaryLink = document.getElementById("dictionaryLink");
const letters = Array.from("qwertyuiopasdfghjklzxcvbnm");
const highscores = JSON.parse(localStorage.getItem('highScores')) || []
let guessCont = document.getElementById("guessed-box-container");
let scoreCont = document.getElementById("score-container");
let iniInp = document.getElementById("initialsInput");
let wordArray = [];
let gameWord = "";
let userScore = 100;
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
            scoreCont.textContent = userScore + " points";
        })
}

// function to make the game board of blank spaces
// use template literal to insert html of blanks
// each blank has its own id? for targetting purposes?
function makeGame(array) {
    for (i = 0; i < array.length; i++) {
        let gameBlank = document.createElement("span");
        gameBlank.textContent = "?";
        gameBlank.setAttribute("data-letter", array[i]);
        gameCont.appendChild(gameBlank);

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
                wrongGuesses.push(guess);
                guessCont.innerHTML += wrongGuess;
                userScore -= 10;
                scoreCont.textContent = userScore + " points";
                if (userScore == 0) {
                    displayOutcome();
                }
            } else {
                return;
            }
        }
        // This checks if there are any blank letters left
        if (!gameCont.innerText.includes("?")) {
            displayOutcome();
        }
    } else {
        return;
    }
})

getWord();

document.addEventListener('DOMContentLoaded', function () {
    const hintContainer = document.getElementById('hint-container');

    function getWordDef() {
        return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${gameWord}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                showMessage(data[0].meanings[0].definitions[0].definition);
                return data.getWordDef;
            })
            .catch(error => {
                console.error(`Failed to fetch: ${error.message}`);
                return 'definition not available';// example for console 
            });
    }
    function showMessage(message) {
        hintContainer.innerHTML = message;
    }
    function Hint() {
        hintContainer.addEventListener('click', function () {
            getWordDef();
        });
    }
    Hint();
});

document.addEventListener('DOMContentLoaded', function () {
    const rulesContainer = document.getElementById('rules-container');
    const rulesContent = document.getElementById('rules-content');

    if (rulesContainer && rulesContent) {
        let isOpen = false;

        rulesContent.style.display = 'none';

        rulesContainer.addEventListener('click', function () {
            console.log('Clicked');
            isOpen = !isOpen;
            rulesContent.style.display = isOpen ? 'block' : 'none';
        });
    }
});

// this function adds the NAME/STRING  and SCORE/NUMBER to the high scores array in local storage
// its sorts the array by the  USERSCORE property
function addToHighScores(name, score) {
    const scoreObj = {
        userName: name,
        userScore: score
    }

    highscores.push(scoreObj)
    const sortedHighScores = highscores.sort((a, b) => b.userScore - a.userScore);
    localStorage.setItem('highScores', JSON.stringify(sortedHighScores))
    renderHighScores(highscores)
}
// Renders the High Scores from Local Storage
function renderHighScores(array) {
    $highScoresContainer.innerHTML =
        `
    <details>
        <summary >High Scores</summary> 
        <ul id="high-score-ul"></ul>
        <button id ="clear-button" >Clear Score</button>      
    </details>
    `
    $ul = $highScoresContainer.querySelector('#high-score-ul')
    if (!array.length) {
        $ul.innerHTML = "nothing to see here"
    }
    for (let i = 0; i < array.length; i++) {
        if (i > 5) {
            break;
        }
        $ul.innerHTML += `<li>${array[i].userName} : ${array[i].userScore} points</li> `
    }
}

//Modal
$(document).ready(function () {
    $('.modal').modal();
});

// setTimeout(function () {
//     $('.modal').modal('open')
// }, 2000)

function displayOutcome() {
    var initials = $("#initialsInput");
    var highScore = $();
    $('.modal').modal('open');

    if (userScore !== 0) {
        
        
        // Displays congratulations message with input for initials
        $("#modalHeader").text("Congratulations! You won!");
        $("#actionBtn").text("Submit");
        $("#initialsInput").show();
        
        $("#highScoreDisplayBox").show(); // Show the high score text
        $("#highScore").text(userScore);
        dictionaryLink.href = `https://www.merriam-webster.com/dictionary/${gameWord}`;
        dictionaryLink.target = "_blank";
        $("#actionBtn").on("click", function() {
            addToHighScores(iniInp.value, userScore);
        }); //add value of initialsInput and userScore
    } else {
        // Displays sorry message without input for initials, a close button, and hide high score
        $("#modalHeader").text("Sorry, you lost");
        $("#actionBtn").text("Close");
        $("#actionBtn").on("click", function () {
            $('.modal').modal('close');
        });
        $("#initialsInput").hide();
        $("#highScoreDisplayBox").hide(); // Hide the high score text
        dictionaryLink.href = `https://www.merriam-webster.com/dictionary/${gameWord}`;
        dictionaryLink.target = "_blank";
    }
};

// clears the high scores list from local storage, renders change in DOM
function handleClearScores(e) {
    if (e.target.id = "clear-button") {
        let ul = e.target.previousElementSibling
        localStorage.removeItem('highScores')
        ul.innerHTML = "nothing to see here"
    }
}

$highScoresContainer.addEventListener('click', handleClearScores);

renderHighScores(highscores);

