const gameCont = document.getElementById("game-board-container");
const $highScoresContainer = document.querySelector('#high-scores-container');
const hintContainer = document.getElementById('hint-container');
const playAgainBtn = document.getElementById("play-again-button");
const dictionaryLink = document.getElementById("dictionaryLink");
const letters = Array.from("qwertyuiopasdfghjklzxcvbnm");
let guessCont = document.getElementById("guessed-box-container");
let scoreCont = document.getElementById("score-container");
let iniInp = document.getElementById("initialsInput");
let gameBlank = document.createElement("span");
let wordArray = [];
let gameWord = "";
let userScore = 100;
let wrongGuesses = [];
// This function generates a random word from a database,
// and saves that as an array to seperate the letters,
// then runs the makeGame function with that array
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

// This function populates spaces on the game board by
// iterating over the array and creating a ? character
// that is then rendered onto the page
function makeGame(array) {
    for (i = 0; i < array.length; i++) {
        gameBlank = document.createElement("span");
        gameBlank.textContent = "?";
        gameBlank.setAttribute("data-letter", array[i]);
        gameCont.appendChild(gameBlank);

    }
}

//  This function waits for the user to guess a letter,
//  then renders it either to the game container if right,
//  or into the wrong guesses container if incorrect.
//  It also runs the displayOutcome function either when the 
//  word is completed, or the user's score is zero. 
document.addEventListener("keyup", function (event) {
    let guess = event.key;
    let correctGuess = wordArray.includes(guess);
    // The first part of this conditional adds correct letters
    // to the correct spot
    if (letters.includes(guess)) {
        let correctSpot = document.querySelectorAll(`[data-letter=${guess}]`);
        for (i = 0; i < correctSpot.length; i++) {
            correctSpot[i].textContent = guess;
            // styling for correct 
        }
        // This conditional adds an incorrect guess to the proper spot,
        // as well as deducting points from the user's score
        if (!correctGuess) {
            let wrongGuess = `<span id="guesses">${guess} </span>`;
            if (!wrongGuesses.includes(guess)) {
                wrongGuesses.push(guess);
                guessCont.innerHTML += wrongGuess;
                userScore -= 10;
                scoreCont.textContent = userScore + " points";
                // And then checks to see if the user is out of points
                // resulting in a game over situation.
                if (userScore == 0) {
                    displayOutcome();
                }
            } else {
                return;
            }
        }
        // This checks if there are any blank letters left,
        // and if there aren't, operates as a winning scenario
        if (!gameCont.innerText.includes("?")) {
            displayOutcome();
        }
    } else {
        return;
    }
})

// We then call the first function, ensuring that 
// it is rendered on page load.
getWord();

// This function resets the game. Clears the board, then re-runs 
// the function to start the game

function resetGame() {
    userScore = 100;
    wrongGuesses = [];
    gameCont.innerHTML = "";
    guessCont.innerHTML = "";
    hintContainer.innerHTML = `
    <details>
    <summary>Need a Hint?</summary>
    </details>`;
    $('.modal').modal('close');
    getWord();
}

// This function operates as a hint reveal option
// It pulls a definition from a database that corresponds
// to the random word. 
document.addEventListener('DOMContentLoaded', function () {
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

// This is the dropdown rules menu functionality
// Set to load open automatically on page load
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

// This function saves the user's name and score into local storage
// It also sorts the high scores based on score
let highScoresStorage = JSON.parse(localStorage.getItem('highScores')) || [];

if (highScoresStorage === null || highScoresStorage === undefined) {
    highScoresStorage = [];
    console.log('No local storage yet');
}

console.log('ls', highScoresStorage);
renderHighScores(highScoresStorage.sort((a, b) => b.userScore - a.userScore));
renderHighScores(highScoresStorage)
function addToHighScores(name, score) {
    const scoreOBJ = {
        userName: name,
        userScore: score
    }
    highScoresStorage.push(scoreOBJ)
    localStorage.setItem('highScores', JSON.stringify(highScoresStorage))
    console.log('after set',localStorage.getItem('highScores'))
    highScoresStorage = JSON.parse(localStorage.getItem('highScores')).sort((a, b) => b.userScore - a.userScore)
    renderHighScores(highScoresStorage)
    
}
// Renders the High Scores from Local Storage
function renderHighScores(array) {
    $highScoresContainer.innerHTML =
    `
    <details>
    <summary >High Scores</summary> 
    <ul id="high-score-ul"></ul>
    <button id ="clear-button"  >Clear Score</button>      
    </details>
    `
    $button = $highScoresContainer.querySelector('#clear-button')
    $ul = $highScoresContainer.querySelector('#high-score-ul')
    if (array.length ===0) {
        $ul.innerHTML = "nothing to see here"
    }
    for (let i = 0; i < array.length; i++) {
        if (i > 5) {
            break;
        }
        $ul.innerHTML += `<li>${array[i].userName} : ${array[i].userScore} points</li> `
    }
    $button.addEventListener('click', handleClearScores);
}

//Modal 
$(document).ready(function () {
    $('.modal').modal();
  });
//
  setTimeout(function(){
$('.modal').modal('open')
  },2000)

  function displayOutcome() {
    var userScore = 100; 
    var initials = $("#initialsInput");
    

    if (userScore !== 0) {
      // Displays congratulations message with input for initials
      $("#modalHeader").text("Congratulations! You won!");
      $("#actionBtn").text("Submit");
      $("#actionBtn").on("click", function(){
          localStorage.setItem($("#initialsInput").val(), "score");
          $('.modal').modal('close');
      });
      $("#initialsInput").show();
      $("#scoreDisplayBox").show(); // Show the score text
  } else {
      // Displays sorry message without input for initials, a close button, and hide high score
      $("#modalHeader").text("Sorry, you lost");
      $("#actionBtn").text("Close");
      $("#actionBtn").on("click", function(){
          $('.modal').modal('close');
      });
      $("#initialsInput").hide();
      $("scoreDisplayBox").hide(); // Hide the high score text
});

// This displays the modal's content,
// which changes whether win or lose.
function displayOutcome() {
    var initials = $("#initialsInput");
    var highScore = $();
    $('.modal').modal('open');

    if (userScore !== 0) {


        // Displays congratulations message with input for initials
        $("#modalHeader").text("Congratulations! You won!");
        $("#actionBtn").text("Submit");
        $("#initialsInput").show();

        $("#highScoreDisplayBox").show();
        // Show the high score text
        $("#highScore").text(userScore);
        console.log($("#highScore"))
        dictionaryLink.href = `https://www.merriam-webster.com/dictionary/${gameWord}`;
        dictionaryLink.target = "_blank";
        $("#actionBtn").on("click", function () {
            addToHighScores(iniInp.value, userScore);
        }); //add value of initialsInput and userScore
    } else {
        // Displays sorry message without input for initials, a close button, and hide high score
        $("#modalHeader").text("Sorry, you lost, the word was " + gameWord);
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

// Clears the high scores list from local storage, renders change in DOM
function handleClearScores(e) {
    e.stopPropagation()
    if (e.target.id = "clear-button") {
        let ul = e.target.previousElementSibling
        localStorage.removeItem('highScores')
        if (ul !== null) {
            ul.innerHTML = "nothing to see here"
        }
        if (ul !== null) {
            ul.innerHTML = "nothing to see here"
        }
    }
}
playAgainBtn.addEventListener("click", resetGame);


