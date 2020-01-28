"use strict";

function Game() {
  this.canvas = null;
  this.ctx = null;

  this.tiles = [];
  this.toCheckClickedTiles = [];
  this.player = null;
  this.position = [];

  this.gameIsOver = false;
  this.gameScreen = null;
}

// Initialize the game and canvas
Game.prototype.start = function() {
  this.canvasContainer = document.querySelector(".canvas-container");
  this.canvas = this.canvasContainer.querySelector("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.canvas.addEventListener('mousedown', this.handleMouseDown,false);

  this.scoreElement = this.gameScreen.querySelector(".score .value");

  var containerHeight = this.canvasContainer.offsetHeight;

  this.canvas.setAttribute("width", 400);
  this.canvas.setAttribute("height", containerHeight);
  this.canvas.setAttribute("style", "border: 1px solid black");

  // Add mousedown event listeners
  this.handleMouseDown = function(event) {
    var cx = event.pageX;
    var cy = event.pageY;

    this.tiles.forEach(function(tilesObj){

    })
//     if (event.key === "ArrowUp") {
//       console.log("UP");
//       this.player.setDirection("up");
//     } else if (event.key === "ArrowDown") {
//       console.log("DOWN");
//       this.player.setDirection("down");
//     }
  };

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
      var random4;
      var randomX;
      if(this.position.length == 0){
        random4 = Math.ceil(Math.random()*4);
        randomX= 100* random4 - 100; 
        var newTile = new Tiles(this.canvas, randomX, 5);
        this.tiles.push(newTile);
        this.position.push(random4);
        this.toCheckClickedTiles = [...this.tiles];
      }

      else{
        random4 = Math.ceil(Math.random()*4);
        if(this.position[0]==random4){
          if(random4 == 4){
            random4 = 1;
          }
          else{
            random4 = random4 +1;
          }
          randomX= 100* random4 - 100; 
          var newTile = new Tiles(this.canvas, randomX, 5);
          this.tiles.push(newTile);
          this.position[0] = random4;
          this.toCheckClickedTiles = [...this.tiles];
        }
        else{
          randomX= 100* random4 - 100; 
          var newTile = new Tiles(this.canvas, randomX, 5);
          this.tiles.push(newTile);
          this.position[0] = random4;
          this.toCheckClickedTiles = [...this.tiles];
        }
      }
      
    }

    this.checkIfTop();

    this.tiles = this.tiles.filter(function(tilesObj) {
      tilesObj.updatePosition(); // 4
      return tilesObj.isInsideScreen(); // 5
    });
    
    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 2. Draw all of the tiles
    this.tiles.forEach(function(tileObj) {
      tileObj.draw();
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

// function mousePressed() {

//   if (!playing) // don't allow input if the player isn't playing
//     return;

//   if (mouseY >= 3 * HEIGHT && mouseY <= 4 * HEIGHT) {
// 		// check if click is within canvas bounds

//     var tile = getClickedTile(mouseX, mouseY);

//     if (tile == -1) // they clicked out of bounds
//       return;

//     if (tiles[tile] !== 0) {
//       /* end game */

//       tiles[tile] = -1;

//       won = false;
//       playing = false;
//     } else {
//       score++;
//       newRow();

//       if (score >= WINNING_SCORE) {
//         /* end game */

//         won = true;
//         playing = false;
//       }
//     }
//   }

// }