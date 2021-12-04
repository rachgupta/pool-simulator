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
    this.imgsrc = "ball.png"
  }
    this.type = type;
    this.positionX = position.x;
    this.positionY = position.y;
    //find some vector2D function for position and velocity
    this.velocityX = 0;
    this.velocityY = 0;
    this.moving = false;
  }

  Ball.prototype.draw = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    let ball_img = new Image();
    ball_img.src = this.imgsrc;
    let x = this.positionX;
    let y = this.positionY;
    ball_img.onload = function(){
        ctx.drawImage(ball_img, x, y);
    }
  }
  Ball.prototype.update = function(timestep){
    this.positionX = this.positionX + (timestep*this.velocityX)
    this.positionY = this.positionY + (timestep*this.velocityY)
  }
  Ball.prototype.checkIfInPocket = function(){
    if(this.positionX>0)
    {
      console.log('ok');
    }
  }
