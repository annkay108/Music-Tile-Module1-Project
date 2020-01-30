"use strict";

function Game() {
  this.canvas = null;
  this.ctx = null;

  this.tiles = [];
  this.toCheckClickedTiles = [];
  this.player = null;
  this.position = [];
  this.score = 0;

  this.gameIsOver = false;
  this.gameScreen = null;
  this.counterSpeed = 0;

  // Initialize the game and canvas 
  Game.prototype.start = function() {
    console.log(this.audio);
    this.counter = 0;
    this.canvasContainer = document.querySelector(".canvas-container");
    this.canvas = this.canvasContainer.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    
    this.scoreElement = this.gameScreen.querySelector(".score .value");
    this.audio = document.getElementById("audio");
    
    var containerHeight = this.canvasContainer.offsetHeight;
    
    this.canvas.setAttribute("width", 400);
    this.canvas.setAttribute("height", 600);
    this.canvas.setAttribute("style", "border: 1px solid black");
    
    // Add mousedown event listeners
    this.handleMouseDown = function(event) {
      var windowWidth = window.innerWidth/2 - 200;
      var cx = event.pageX;
      var cy = event.pageY;
      this.toCheckClickedTiles = [...this.tiles];

      this.tiles.forEach(function(tilesObj,i){
        var boolClick = tilesObj.x+windowWidth <cx && tilesObj.x+windowWidth+100 > cx && tilesObj.y+44 <cy && tilesObj.y + 194>cy;
        if (i == 0 && boolClick){
          this.score ++;
          this.scoreElement.innerHTML = this.score;
          tilesObj.color = "skyblue";
        }
        else if (boolClick && this.tiles[i-1].color==='skyblue'){
          this.score++;
          this.scoreElement.innerHTML = this.score;
          tilesObj.color = "skyblue";
        }
      }.bind(this))
    };
    
    this.canvas.addEventListener('mousedown',this.handleMouseDown.bind(this));
    
    // Start the game initially
    this.startLoop();
  };
}

  Game.prototype.checkIfTop = function(){
  var arr = this.tiles;
  if (arr.length != 0){
    var arrObj = arr[arr.length -1];
    return arrObj.y == 0;
  }
  return true;
};

Game.prototype.startLoop = function() {
  this.speed = 3;
  var loop = function() {
    this.counterSpeed++;
    var widths = window.innerWidth;
    var heights = window.innerHeight;
    
    if (this.checkIfTop())
    {
      var random4;
      var randomX;
      if(this.position.length == 0){
        random4 = Math.ceil(Math.random()*4);
        randomX= 100* random4 - 100; 
        var newTile = new Tiles(this.canvas, randomX, "black");
        this.tiles.push(newTile);
        if(this.counterSpeed >= 300) this.speed = 5;
        else if(this.counterSpeed >= 800){
          console.log("this.speed");
          this.speed = 5;
        }
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
          var newTile = new Tiles(this.canvas, randomX, 'black');
          this.tiles.push(newTile);
          console.log(this.counterSpeed);
          if(this.counterSpeed >= 300) 
          {
            this.speed = 5;
          }
          else if(this.counterSpeed >= 800){
            console.log("this.speed");
            this.speed = 5;
          }
          this.position[0] = random4;
        }
        else{
          randomX= 100* random4 - 100; 
          var newTile = new Tiles(this.canvas, randomX, 'black');
          this.tiles.push(newTile);
          if(this.counterSpeed >= 300) this.speed = 5;
          else if(this.counterSpeed >= 800){
            console.log("this.speed");
            this.speed = 5;
          }
          this.position[0] = random4;
        }
      }
    }

    this.checkIfTop();

    this.tiles = this.tiles.filter(function(tilesObj) {
      tilesObj.updatePosition(this.speed); // 4
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
      tileObj.drawLine();
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
    this.startOver();
};

Game.prototype.removeGameScreen = function() {};

Game.prototype.passGameOverCallback = function (gameOverFunc) {
    this.startOver = gameOverFunc;
}