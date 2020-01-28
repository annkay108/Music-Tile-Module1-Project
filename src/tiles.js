`use strict`;
function Tiles(canvas, x, speed){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.sizex = 100;
    this.sizey = 150;

    this.x = x;
    this.y = -150;
    this.speed = speed;
}

Tiles.prototype.draw = function() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.sizex, this.sizey);
}

Tiles.prototype.updatePosition = function() {
    this.y = this.y + this.speed;
}

Tiles.prototype.isInsideScreen = function() {
    return this.y + this.size > this.canvas.height;
}