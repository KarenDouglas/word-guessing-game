
# Guess Away
Welcome to Guess Away! This game is a great way for players to test their knowledge or learn some new words as they play and have fun!


## Live Site
[View the Live Site](https://karendouglas.github.io/word-guessing-game/)
![screencapture-karendouglas-github-io-word-guessing-game-2024-03-20-14_54_55](https://github.com/KarenDouglas/word-guessing-game/assets/79128405/b3d50b18-17bc-4a05-846a-d2a5fb4432ab)

# Description
Welcome to our Word Guess Game repository! This project offers users an engaging and challenging experience where they can test their word-guessing skills. Players have 10 attempts to guess the correct word by typing in letters, with the help of hints provided by the Dictionary API. The game generates a random word for players to guess, ensuring each round is unique and exciting. Built with JavaScript, HTML, and CSS, this app provides a seamless and interactive interface for users to enjoy. Whether you're looking to sharpen your vocabulary or simply have some fun, this Word Guess Game is the perfect choice. Join us in exploring the world of words and enjoy hours of entertainment



## Built With
- JavaScript
- HTML5
- CSS
- Dictionary API
- Random Word API

### Project 
In this project we were tasked with implementing our knowledge from this course, we decided, to build an game called "Guess Away". We did a lot of brainstorming to come with an idea where we could implement the API's, different functionality, and a great immersive user experience.This game is a simple game where users try to guess a randomly selected word, with an hint available to whom need it, and a high scores section for the competitive players. The game includes features such as a dynamic game board, user input handling, hints, a high scores list, and a modal for game outcomes.

### Design
For the design we wanted to choose something intriguing, attention grabbing and a minimalist design. Within this project:

* Fetch a random word from an API.
* Render a game board with blanks for each letter.
* Allow users to guess letters and display correct guesses on the board.
* Provide hints by fetching word definitions from an external API.
* Keep track of user scores and display high scores.
* Use a modal to display game outcome (win/lose) with an option to submit and save high scores.

### Code Overview
The code is structured into sections, each handling specific aspects of the game:

* Fetching Words: The getWord function fetches a random word from an API.
    ```
    function getWord() {
    return fetch(`https://random-word-api.vercel.app/api?words=1&length=7`)
    ```
* Rendering Game Board: The makeGame function creates the initial game board with empty blanks.
    ```
    function makeGame(array) {
    for (i = 0; i < array.length; i++) {
        let gameBlank = document.createElement("span");
        gameBlank.textContent = "_ ";
        gameBlank.setAttribute("data-letter", array[i]);
        gameCont.appendChild(gameBlank);
    }
    }
    ```
* User Input Handling: Event listeners are used to capture user key presses and update the game board accordingly.
    ```
    document.addEventListener("keyup", function (event) {
    let guess = event.key;
    ```
* Hint Functionality: The getWordDef function fetches word definitions for the hint function.
   ```
   function getWordDef() {
        return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${gameWord}`)
   ```
* Modal Usage: The modal is implemented using jQuery for displaying game outcomes and dealing with the user input.
   ```
   function displayOutcome() {
    var initials = $("#initialsInput");
    var highScore = $();
    $('.modal').modal('open');
   ```
* Animations: Using @keyframes, and animation styles to immerse the user experience.
  ```
  animation: floatAnimation 2s ease-in-out infinite;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  ```
  
### Closing 
This game is a fun, exciting way to learn new words and have fun while doing it. This game can still be improved by adding extra factors, effects, and more objective based matter.  

### Contributers
Contributers git-hub pages:
* [@DiamondSClements](https://github.com/DiamondSClements)
* [@KarenDouglas](https://github.com/KarenDouglas)
* [@Bilalk789](https://github.com/Bilalk789)
* [@pm-912](https://github.com/pm-912) 

# Enjoy playing GUESS AWAY!

### Deployment link
KarenDouglas.github.io/word-guessing-game
![karendouglas github io_word-guessing-game_](https://github.com/KarenDouglas/word-guessing-game/assets/153332797/11880459-60ea-44a5-baed-428ed89975ea)


