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
    this.onBoard = true;
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
    if(this.checkIfPoint())
    {
      this.pointDing();
      if(type!="cue")
      {
        this.onBoard = false;
      }
    }
  }
  Ball.prototype.update = function(timestep){
    this.positionX = this.positionX + (timestep*this.velocityX)
    this.positionY = this.positionY + (timestep*this.velocityY)
  }
  Ball.prototype.checkIfPoint = function(){
    if(this.positionX>910 && (this.positionY<50 || this.positionY>425))
    {
      return true;
    }
    else if(this.positionX>465 && (this.positionX<515) && (this.positionY>440 || this.positionY>30))
    {
      return true;
    }
    else if(this.positionX>70 && (this.positionY<50 || this.positionY>425))
    {
      return true;
    }
    return false;

  }
  Ball.prototype.pointDing = function() {
    var audio = new Audio(
    'ding.mp3');
    audio.play();
  }
