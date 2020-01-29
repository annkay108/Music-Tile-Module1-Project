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

  this.scoreElement = this.gameScreen.querySelector(".score .value");

  var containerHeight = this.canvasContainer.offsetHeight;

  this.canvas.setAttribute("width", 400);
  this.canvas.setAttribute("height", containerHeight);
  this.canvas.setAttribute("style", "border: 1px solid black");

  // Add mousedown event listeners
  this.handleMouseDown = function(event) {
    var cx = event.pageX;
    var cy = event.pageY;
    console.log(cx+"  "+ cy);
    this.toCheckClickedTiles = [...this.tiles];
    this.tiles.forEach(function(tilesObj,i){
      
      var boolClick = tilesObj.x+484 < cx && tilesObj.x+584 > cx && tilesObj.y+44 <cy && tilesObj.y + 194>cy;
      if (i == 0 && boolClick){
        tilesObj.color = "skyblue";
      }
      else if (boolClick && this.tiles[i-1].color==='skyblue'){
        tilesObj.color = "skyblue";
      }
    }.bind(this))
  };

  this.canvas.addEventListener('mousedown',this.handleMouseDown.bind(this));

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
        var newTile = new Tiles(this.canvas, randomX, 2, "black");
        this.tiles.push(newTile);
        this.position.push(random4);
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
          var newTile = new Tiles(this.canvas, randomX, 2, 'black');
          this.tiles.push(newTile);
          this.position[0] = random4;
        }
        else{
          randomX= 100* random4 - 100; 
          var newTile = new Tiles(this.canvas, randomX, 2 , 'black');
          this.tiles.push(newTile);
          this.position[0] = random4;
        }
      }
      
    }

    this.checkIfTop();

    this.tiles = this.tiles.filter(function(tilesObj) {
      tilesObj.updatePosition(); // 4
      var isInScreen = tilesObj.isInsideScreen();
      if(isInScreen== false && tilesObj.color == "black"){
        this.gameOver();
      }
      return isInScreen; // 5
    }.bind(this));
    
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