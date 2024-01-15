const gameCont = document.getElementById("#game-board-container");
const letters = Array.from("qwertyuiopasdfghjklzxcvbnm");
let guessedCont = document.getElementById("#guessed-box-container");
let wordArray = [];
let gameWord = "";
let userScore = 70;
console.log(letters);
console.log(gameWord);

// function to get a random word from the api
function getWord() {
    return fetch(`https://random-word-api.vercel.app/api?words=1&length=7`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            gameWord = data[0];
            makeGame(wordArray);
            wordArray = Array.from(gameWord);
            console.log(gameWord);
            console.log(wordArray);
        })
}

// function to make the game board of blank spaces
// use template literal to insert html of blanks
// each blank has its own id? for targetting purposes?
function makeGame(word) {
    for (i = 0; i < word.length; i++) {
        // make variable of string of underscores
        // insert as <p> tag, append to page in gameCont
        word[i].add

    }
    let gameBoard = `<p>_ _ _ _ _ _ _</p>`; // need to figure out how to format this better



}

//function to compare the letter guessed versus the game word
// make conditional statement: if gameword contains letterguessed, add it to gameboard
// if word is finished or out of points, run gameOver
document.addEventListener("keyup", function (event) {
    let guess = event.key; // assigns the typed key to a variable
    let correctGuess = wordArray.includes(guess); // checks if wordArray contains the letter, returns boolean
    if (letters.includes(guess)) {
        console.log(event.key);
        for (i = 0; i < wordArray.length; i++) {
            if (correctGuess) {
                console.log(correctGuess);
                // populate the blanks

            } else {
                console.log("wrong");
                //populate the guessed letters box
                // wrongBox.append(event.key);
                //deduct points
                userScore = userScore += -10;
                if (userScore == 0) gameOver();
                console.log(userScore);
                return;
            }
        }
    } else {
        return;
    }
})

getWord();

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
            return 'synonym not available';// for exmpale in console 
        });
}
function showMessage(message) {
    console.log(message);
}
function Hint() {
    const currentWord = 'example';
    getWordSynonym(currentWord)
        .then(wordSynonym => {
            showMessage(`synonym of ${currentWord}: ${wordSynonym}`);
        });
}
Hint();

//Modal
$(document).ready(function(){
    $('.modal').modal();
  });

  setTimeout(function(){
$('.modal').modal('open')
  },2000)

  function displayOutcome() {
    var userScore = 0; 
    var initials = $("#initialsInput");
    var highScore =$()

    if (userScore !== 0) {
      // Displays congratulations message with input for initials
      $("#modalHeader").text("Congratulations! You won!");
      $("#actionBtn").text("Submit");
      $("#actionBtn").on("click", function(){
          localStorage.setItem($("#initialsInput").val(), "score");
          $('.modal').modal('close');
      });
      $("#initialsInput").show();
      $("#highScoreDisplayBox").show(); // Show the high score text
  } else {
      // Displays sorry message without input for initials, a close button, and hide high score
      $("#modalHeader").text("Sorry, you lost");
      $("#actionBtn").text("Close");
      $("#actionBtn").on("click", function(){
          $('.modal').modal('close');
      });
      $("#initialsInput").hide();
      $("#highScoreDisplayBox").hide(); // Hide the high score text
    }
  };

  displayOutcome();