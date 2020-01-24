# Music Tiles

## Description
Music Tiles is a single-player game where the player needs to click on the black tiles as they appear on the screen. The player has to click on the buttom tiles sequentially, if other tiles are clicked other than the buttom tiles, the game would be over. If the player is not able to click on the buttom tile before it passes then the game will be over. When each tile is clicked it's going to play a note, hence playing a song as you play.

## MVP (DOM - CANVAS)
CANVAS, This is a game where the player can click on the tiles to play a note.


## Backlog
- Score
- Speed of the tiles
- Selecting other songs
- Collecting coins
- Tiles with various length

## Data structure

## main.js
```
buildDom(htmlString){
}

main(){
}

buildSplashScreen(){
}

removeSplashScreen(){
}

buildGameScreen(){
}

removeGameScreen(){
}

buildGameOverScreen(){
}

removeGameOverScreen(){
}

buildSelectSongScreen(){
}

removeSelectSongScreen(){
}

startGame(){
}

gameOver(){
}
```


### game.js
```
Game(){
  this.canvas;
}

Game.prototype.startLoop = function(){
}

Game.prototype.updateSpeed = function() {
}

Game.prototype.checkOverFlow = function(){
}

Game.prototype.clearCanvas = function(){
}

Game.prototype.updateCanvas = function(){
}

Game.prototype.drawCanvas = function(){ 
}

Game.prototype.setGameOver = function(){
}
```

## Player.js
```
Player(canvas){
}

Player.prototype.didClick = function(firstTile) {
}

Player.prototype.ifRightTile() = function(){
}

```

## Tiles.js
```

Tiles(){
}

Game.prototype.createTiles = function(){
}

Game.prototype.addingTiles = function(){
}

Game.prototype.checkClicks = function() {
}

Game.prototype.checkFirstTile = function() {
}

Game.prototype.displayNextTile = function() {
}

```

## Music.js
```
Music(){
}

Music.prototype.addNote = function(){
}

Music.prototype.extractTile = function(){
}

```

## States y States Transitions
```
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - buildGameOver()
  - addEventListener(startGame) 
```

## Task
- Main - buildDom
- Main - buildSplashScreen
- Main - removeSplashScreen
- Main - addEventListener
- Main - buildGameScreen
- Main - removeGameScreen
- Main - buildGameOverScreen
- Main - removeGameOverScreen
- Main - buildSelectSongScreen
- Main - removeSelectSongScreen
- Main - startGame
- Main - gameOver
- Game - create
- Game - startLoop
- Game - createTiles
- Game - addingTiles
- Game - checkClicks
- Game - checkClickTiles
- Game - clearCanvas
- Game - addEventListener
- Player - create
- Player - didClick
- Player - ifRightTile
- Music  - create
- Music  - addNote
- Music  - extractTile

## Links


### Trello
[Link url](https://trello.com/b/FsPInJoh/module1-projectironhack)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)

