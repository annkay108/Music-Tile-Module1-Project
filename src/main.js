"use strict";

// Creates a HTML elements out of the string that looks like html
function buildDom(htmlString) {
  var div = document.createElement("div");

  div.innerHTML = htmlString;

  return div.children[0];
}

// Run on initial start and call other functions that manage the game
function main() {
  var game;
  var splashScreen;
  var gameOverScreen;
  var audio = new Audio('Songs/Queen_Bohemian.mp3');
  // SPLASH SCREEN
  function createSplashScreen() {
    splashScreen = buildDom(`
    <main id = "fill">
      <h1 id = "title">Musical Tiles</h1>
      <button>Start</button>
    </main>`);

    document.body.appendChild(splashScreen);
    var startButton = splashScreen.querySelector("button");

    startButton.addEventListener("click", function() {
      startGame();
    });
  }

  function removeSplashScreen() {
    splashScreen.remove(); // remove() is an HTML method that removes the element entirely
  }

  //
  // GAME SCREEN
  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container">
    <header>
      <div class="score">
        <span class="label">Score:</span>
        <span class="value"></span>
      </div>
    </header>
    <div class="canvas-container">
      <canvas></canvas>
    </div>
    </main>
    `);

    document.body.appendChild(gameScreen);

    return gameScreen;
  }

  function removeGameScreen() {
    game.gameScreen.remove(); // We will implement it in the game object
  }

  //
  // GAME OVER SCREEN
  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
    <main id= "fill">
      <h1>Game over</h1>
      <p id = "score" >Your score: <span>${score}</span></p>
      <button>Restart</button>
    </main>
    `);

    document.body.appendChild(gameOverScreen);
    audio.play();
    audio.currentTime = 3;
    var button = gameOverScreen.querySelector("button");

    button.addEventListener("click", startGame);
  }

  function removeGameOverScreen() {
    if (gameOverScreen !== undefined) { // if it exists saved in a variable
      gameOverScreen.remove();
      audio.pause();
    }
  }

  //
  // SETTING GAME STATE
  function startGame() {
    removeSplashScreen();
    removeGameOverScreen();

    game = new Game();
    game.gameScreen = createGameScreen();

    // Start the game
    game.start();
    game.passGameOverCallback(gameOver);

    // End the game
  }

  function gameOver() {
    removeGameScreen();
    createGameOverScreen(game.score); 
  }

  // Initialize the start screen
  createSplashScreen();
}

// Ensures that all files are loaded before it runs the set function
window.addEventListener("load", main);