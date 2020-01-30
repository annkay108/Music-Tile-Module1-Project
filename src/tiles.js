`use strict`;
function Tiles(canvas, x, color){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');


    this.sizex = 100;
    this.sizey = 150;
    this.color = color;

    this.x = x;
    this.y = -150;
    this.speed = 3;

}

Tiles.prototype.drawLine = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(100, 0);
    this.ctx.lineTo(100, this.canvas.height);
    this.ctx.strokeStyle = "white";
    
    this.ctx.moveTo(200, 0);
    this.ctx.lineTo(200, this.canvas.height);

    this.ctx.moveTo(300, 0);
    this.ctx.lineTo(300, this.canvas.height);
    this.ctx.stroke();
  } 

Tiles.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.sizex, this.sizey);
}

Tiles.prototype.updatePosition = function(speed) {
    this.y = this.y + speed;
}

Tiles.prototype.isInsideScreen = function() {
    return this.y < this.canvas.height;
}