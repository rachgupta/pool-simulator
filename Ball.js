function Ball(type, position) {
  if(type=="8-ball")
  {
    this.imgsrc = "images/8-ball.png";
  }
  else if(type=="cue")
  {
    this.imgsrc = "images/cue.png";
  }
  else if(type=="ball")
  {
    this.imgsrc = "images/ball.png";
  }
    this.type = type;
    this.positionX = position.x;
    this.positionY = position.y;
    this.position = position;
    this.acceleration = -0.05
    //find some vector2D function for position and velocity
    this.velocity = new Vector2(0,0);
    this.moving = false;
    this.onBoard = true;
    this.isLoaded = false;
    this.cue_in_pocket = false;
    //let ball_img = new Image();
    //ball_img.src = this.imgsrc;
    //ball_img.onload = function(){
    //  this.isLoaded = true;
    //  this.ball_img = ball_img;
    //}
  }

  Ball.prototype.draw = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    let x = this.positionX;
    let y = this.positionY;
    let ball_img = new Image();
    ball_img.src = this.imgsrc;
    ball_img.onload = function()
    {
      ctx.drawImage(ball_img, x, y);
    }
    if(this.checkIfPoint())
    {
      this.pointDing();
      if(this.type!="cue")
      {
        this.onBoard = false;
      }
      else
      {
        this.cue_in_pocket = true;
      }
    }
  }
  Ball.prototype.update = function(timestep){
    let v = this.velocity;
    let velocityX = v.x;// + (timestep * this.acceleration);
    let velocityY = v.y;// + (timestep * this.acceleration);
    this.velocity = new Vector2(velocityX, velocityY);
    this.positionX = this.positionX + (timestep*velocityX);
    this.positionY = this.positionY + (timestep*velocityY);
    this.position = new Vector2(this.positionX, this.positionY);
    console.log(this.position)
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

  //Ball.prototype.collideWall() = function(ballCollided){
  //  let x = 7;
    //velocity of ball is negated
  //}
  


// var imgTag = new Image();
// var canvas = document.getElementById('icanvas');
// var ctx = canvas.getContext("2d");
// var x = canvas.width;
// var y = 0;

// imgTag.onload = animate;
// imgTag.src = "http://i.stack.imgur.com/Rk0DW.png";   // load image

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
//   ctx.drawImage(imgTag, x, y);                       // draw image at current position
//   x -= 4;
//   if (x > 250) requestAnimationFrame(animate)        // loop
// }