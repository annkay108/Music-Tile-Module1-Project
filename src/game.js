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

Game.prototype.startLoop = function() {
  var loop = function() {

    // this.score++;
    // this.scoreElement.innerHTML = this.score;

    // 1. UPDATE THE STATE (game, player, enemy)

    // 0. Player was created already

    // 1. Create tiles randomly

    if (Math.random() > 0.98) {
      var random4 = Math.ceil(Math.random()*4);
      var randomX= 100* random4 - 100;
      console.log(this.canvas.width);
      var newTile = new Tiles(this.canvas, randomX, 5);

      this.tiles.push(newTile);
    }

    // 4. Update the existing tiles (move them)
    // 5. Check if the tiles our out of the screen
    // [x, x, x ,x ]

    // this.tiles = this.tiles.filter(function(tileObj) {
    //   tileObj.updatePosition(); // 4
    //   // console.log("updatePosition");
    //   return tileObj.isInsideScreen(); // 5
    // });

    this.tiles.forEach(function(tileObj){
      tileObj.updatePosition();
    });
    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 3. UPDATE THE CANVAS (DRAW)
    // 1. Draw the player
    // this.player.draw();

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

  // requestAnimationFrame(loop);
  loop();
};

Game.prototype.updateGameStats = function() {};

Game.prototype.gameOver = function() {
    this.gameIsOver = true;
    console.log('game is over');
    this.startOver();
};

Game.prototype.removeGameScreen = function() {};

// Game.prototype.checkCollisions = function() {
//     this.tiles.forEach(function(enemy){
//         if(this.player.didCollide(enemy)){
//             this.player.removeLife();
//             console.log('lives', this.player.lives);
//             //move the enemy out of the screen
//             enemy.x = 0 - enemy.size;

//             if(this.player.lives === 0){
//                 this.gameOver();
//             }
//         }
//     },this);
// };

Game.prototype.passGameOverCallback = function (gameOverFunc) {
    this.startOver = gameOverFunc;
}