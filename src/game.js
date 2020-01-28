"use strict";

function Game() {
  this.canvas = null;
  this.ctx = null;

  this.tiles = [];
  this.player = null;

  this.gameIsOver = false;
  this.gameScreen = null;
}

// Initialize the game and canvas
Game.prototype.start = function() {
  this.canvasContainer = document.querySelector(".canvas-container");
  this.canvas = this.canvasContainer.querySelector("canvas");
  this.ctx = this.canvas.getContext("2d");

  this.scoreElement = this.gameScreen.querySelector(".score .value");

  var containerWidth = this.canvasContainer.offsetWidth;
  var containerHeight = this.canvasContainer.offsetHeight;

  this.canvas.setAttribute("width", 400);
  this.canvas.setAttribute("height", containerHeight);
  this.canvas.setAttribute("style", "border: 1px solid black");

  // Add keydown event listeners
  // this.handleKeyDown = function(event) {
    // console.log("WHAT IS THIS", this);

//     if (event.key === "ArrowUp") {
//       console.log("UP");
//       this.player.setDirection("up");
//     } else if (event.key === "ArrowDown") {
//       console.log("DOWN");
//       this.player.setDirection("down");
//     }
//   };

  // this = game instance
//   window.addEventListener("keydown", this.handleKeyDown.bind(this));

  // Start the game initially
  this.startLoop();
};
Game.prototype.checkIfTop = function(){
  var arr = this.tiles;
  if (arr.length != 0){
    var arrObj = arr[arr.length -1];
    return arrObj.y == 0;
  }
  return true;
};

Game.prototype.startLoop = function() {
  var loop = function() {
    
    if (this.checkIfTop())
    {
      var random4 = Math.ceil(Math.random()*4);
      var randomX= 100* random4 - 100; 
      var newTile = new Tiles(this.canvas, randomX, 5);
      this.tiles.push(newTile);
    }

    this.checkIfTop();
    this.tiles.forEach(function(tileObj){
      tileObj.updatePosition();
    });
    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 2. Draw all of the tiles
    this.tiles.forEach(function(tileObj) {
      tileObj.draw();
      console.log("forecah");
    });

    // 4. TERMINATE THE LOOP IF THE GAME IS OVER
    if (!this.gameIsOver) {
      requestAnimationFrame(loop);
    }
  }.bind(this);

  loop();
};

Game.prototype.updateGameStats = function() {};

Game.prototype.gameOver = function() {
    this.gameIsOver = true;
    console.log('game is over');
    this.startOver();
};

Game.prototype.removeGameScreen = function() {};

Game.prototype.passGameOverCallback = function (gameOverFunc) {
    this.startOver = gameOverFunc;
}

// Game.prototype.tileSpawn = function() {

//   var random4 = Math.ceil(Math.random()*4);
//   var randomX= 100* random4 - 100;
//   console.log(this.canvas.width); 
//   var newTile = new Tiles(this.canvas, randomX, 5);

//   this.tiles.push(newTile);





//   var randomNum = Math.floor(Math.random() * 4);
//   console.log(randomNum);
//   var randomX = this.columnX[randomNum];
//   var randomXIsBusy = this.columnIsBusy[randomNum];
//   if (randomXIsBusy) return;
//   var newEnemy = new Enemy(this.canvas, randomX, 4, “./img/car1.png”);
//   this.columnIsBusy[randomNum] = true;
//   this.enemies.push(newEnemy);
//   // }
//   setTimeout(() => {
//     this.columnIsBusy[randomNum] = false;
//   }, 1200);
// };