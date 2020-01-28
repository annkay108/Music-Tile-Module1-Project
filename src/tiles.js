`use strict`;
function Tiles(canvas, x, speed, color){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.sizex = 100;
    this.sizey = 150;
    this.color = color;

    this.x = x;
    this.y = -150;
    this.speed = speed;
}

Tiles.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.sizex, this.sizey);
}

Tiles.prototype.updatePosition = function() {
    this.y = this.y + this.speed;
}

Tiles.prototype.isInsideScreen = function() {
    return this.y < this.canvas.height;
}