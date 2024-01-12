<<<<<<< HEAD
const gameCont = document.getElementById("#game-board-container");
const $highScoresContainer =document.querySelector('#high-scores-container')
const letters = Array.from("qwertyuiopasdfghjklzxcvbnm");
const highscores = JSON.parse(localStorage.getItem('highScores')) || []
let guessedCont = document.getElementById("#guessed-box-container");
=======
const letters = Array.from("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM");
const gameCont = document.getElementById("game-board-container");
const guessedCont = document.getElementById("guessed-box-container");
>>>>>>> b7bf583034c1a8f74da5a636ad06cd8ed9ca2c44
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
Hint();
});

// this function adds the NAME/STRING  and SCORE/NUMBER to the high scores array in local storage
// its sorts the array by the  USERSCORE property
function addToHighScores (name,score){
    const scoreObj = {
        userName: name,
        userScore: score
    }  
        
    highscores.push(scoreObj)
    const sortedHighScores = highscores.sort((a, b) => b.userScore - a.userScore );
    localStorage.setItem('highScores', JSON.stringify(sortedHighScores))
    renderHighScores(highscores)
}
// Renders the High Scores from Local Storage
function renderHighScores(array){
    $highScoresContainer.innerHTML = 
    `
    <details>
        <summary >High Scores</summary> 
        <ul id="high-score-ul"></ul>
        <button id ="clear-button" >Clear Score</button>      
    </details>
    `
    $ul = $highScoresContainer.querySelector('#high-score-ul')
    if(!array.length){
        $ul.innerHTML = "nothing to see here"
    }
    for(let i = 0; i < array.length; i++){
        if(i> 5){
            break;
        }
        $ul.innerHTML+= `<li>${array[i].userName} : ${array[i].userScore} points</li> `
    }
}

// clears the high scores list from local storage, renders change in DOM
function handleClearScores (e){
    if(e.target.id = "clear-button"){
        let ul = e.target.previousElementSibling
        localStorage.removeItem('highScores')
        ul.innerHTML = "nothing to see here"   
    }
}

$highScoresContainer.addEventListener('click', handleClearScores)
addToHighScores('Karen', 100)
addToHighScores('Diamond', 250)
addToHighScores('Bilal', 300)
addToHighScores('Peter', 200)
renderHighScores(highscores)
    
