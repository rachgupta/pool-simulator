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
    this.eight_ball_in_pocket = false;
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
    let p = this.position;
    let x = p.x;
    let y = p.y;
    let ball_img = new Image();
    ball_img.src = this.imgsrc;
    ball_img.onload = function()
    {
      ctx.drawImage(ball_img, x, y);
    }
    if(this.checkIfPoint())
    {
      if(this.type=="cue")
      {
        this.pointDing();
        alert("You got the cue in the pocket! Try to avoid doing that!");
        //let input_x = prompt("Please enter an x:", "240");
        //let input_y = prompt("Please enter a y:", "260");
        this.position = new Vector2(240,260);
        console.log(this.position);

        this.onBoard = false;
      }
      if(this.type=="8-ball")
      {
        alert("Oh no! You got the 8-ball in the pocket! This would mean you would lose the game");
        this.position = new Vector2(240,260);
        this.onBoard = false;
      }
      else
      {
        this.pointDing();
        this.onBoard = false;
      }
      console.log(this.onBoard);
    }
  }
  Ball.prototype.update = function(timestep){
    let v = this.velocity;
    let velocityX = v.x;// + (timestep * this.acceleration);
    let velocityY = v.y;// + (timestep * this.acceleration);
    this.velocity = new Vector2(velocityX, velocityY);
    let p = this.position;
    this.positionX = p.x + (timestep*velocityX);
    this.positionY = p.y + (timestep*velocityY);
    this.position = new Vector2(this.positionX, this.positionY);
  }

  Ball.prototype.checkIfPoint = function(){
    if(this.onBoard)
    {
      if(this.positionX>910 && (this.positionY<50 || this.positionY>400))
      {
        return true;
      }
      else if(this.positionX>465 && (this.positionX<515) && (this.positionY>440 || this.positionY<30))
      {
        return true;
      }
      else if(this.positionX<70 && (this.positionY<50 || this.positionY>400))
      {
        return true;
      }
      return false;
    }
    else
    {
      return false;
    }

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