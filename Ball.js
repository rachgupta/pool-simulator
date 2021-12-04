function Ball(color, position) {
    this.color = color;
    this.position = position;
    //find some vector2D function for position and velocity
    this.velocity = Vector2(0,0);
    this.moving = false;
  }

  Ball.prototype.draw = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ball_img = new Image();
    ball_img.src = "ball.png";
    ball_img.onload = function(){
        ctx.drawImage(ball_img, 100, 200);
    }
}

let myball = new Ball();
myball.draw();