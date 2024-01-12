const gameCont = document.getElementById("#game-board-container");
const $highScoresContainer =document.querySelector('#high-scores-container')
const letters = Array.from("qwertyuiopasdfghjklzxcvbnm");
const highscores = JSON.parse(localStorage.getItem('highScores')) || []
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

// this function adds the NAME/STRING  and SCORE/NUMBER to the high scores array in local storage
// its sorts the array by the  USERSCORE property
function addToHighScores (name,score){
    const scoreObj = {
        userName: name,
        userScore: score
    }  
        
    highscores.push(scoreObj)
    const sortedHighScores = highscores.sort((a, b) => b.userScore -a.userScore );
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