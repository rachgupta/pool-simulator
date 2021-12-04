function Ball(type, position) {
  if(type=="8-ball")
  {
    this.imgsrc = "8-ball.png"
  }
  else if(type=="cue")
  {
    this.imgsrc = "cue.png"
  }
  else if(type=="ball")
  {
    this.imgsrc = "ball(1).png"
  }
    this.type = type;
    this.positionX = 100;
    this.positionY = 200;
    //find some vector2D function for position and velocity
    this.velocity = Vector2(0,0);
    this.moving = false;
  }

  Ball.prototype.draw = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ball_img = new Image();
    ball_img.src = this.imgsrc;
    x = this.positionX;
    y = this.positionY
    ball_img.onload = function(){
        ctx.drawImage(ball_img, x, y);
    }
}