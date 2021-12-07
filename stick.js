//Create Stick object with x position and y position
//Takes in a 2d vector as the input 
function Stick(position){
    this.positionx = position.x;
    this.positiony = position.y;
}
//Draw the stick on the canvas
Stick.prototype.draw = function(){
    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    let stick_img = new Image();
    stick_img.src = "images/pool_cue.png";
    let x = this.positionx
    let y = this.positiony
    stick_img.onload = function(){
        ctx.drawImage(stick_img, x, y);
    }
}
Stick.prototype.updatepos = function(newpos){
    let x = newpos.x
    let y = newpos.y
    this.positionx = x
    this.positiony = y

}
Stick.prototype.rotatestick = function(){
    let opposite = Mouse.position.y - this.positiony;
    let adjacent = Mouse.position.x - this.positionx;
    this.rotation = Math.atan2(opposite, adjacent);
}