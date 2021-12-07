//Create ball class 
function Ball(type, position) {
  //Assign different image based on the ball type
  if(type=="8-ball")
  {
    //Create 8-ball
    this.imgsrc = "images/8-ball.png";
  }
  else if(type=="cue")
  {
    //Create cue ball
    this.imgsrc = "images/cue.png";
  }
  else if(type=="ball")
  {
    //Create the red balls
    this.imgsrc = "images/ball.png";
  }
    this.type = type;
    this.positionX = position.x;
    this.positionY = position.y;
    this.position = position;
    //Create acceleration - decreases the speed of the balls over time
    this.acceleration = -0.05
    //Find some vector2D function for position and velocity
    this.velocity = new Vector2(0,0);
    this.onBoard = true;
  }
  //Draw the balls on the canvas and the given x and y position
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
    //Checks to see if the ball is in the pocket based on the positon
    if(this.checkIfPoint())
    {
      //Give different alerts based on the type of ball that goes into the pocket
      //If the cue ball goes in the pocket, a warning message appears
      if(this.type=="cue")
      {
        this.pointDing();
        alert("You got the cue in the pocket! Try to avoid doing that!");
        //Reposition cue ball at the origin if it goes into a pocket
        this.position = new Vector2(240,260);
      }
      //If the 8-ball goes into the pocket, then give a alert informing the user that they lost
      if(this.type=="8-ball")
      {
        alert("Oh no! You got the 8-ball in the pocket! This would mean you would lose the game");
        //Remove 8-ball from the board
        this.onBoard = false;
      }
      //If the red ball goes into the pocket, then ding
      else
      {
        this.pointDing();
        //Remove red ball from the board
        this.onBoard = false;
      }
    }
  }
  //Update position of the ball based on the velocity 
  Ball.prototype.update = function(timestep){
    let v = this.velocity;
    //Access x and y values of the position
    let velocityX = v.x;
    let velocityY = v.y;
    this.velocity = new Vector2(velocityX, velocityY);
    //Access current position of the ball
    let p = this.position;
    //Update x and y position based on the x and y velocity of the ball
    this.positionX = p.x + (timestep*velocityX);
    this.positionY = p.y + (timestep*velocityY);
    this.position = new Vector2(this.positionX, this.positionY);
  }

  //This function checks if the ball is in the pocket if it is on the board and then returns whether or not they return a point
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

  //This function plays an audio clip to indicate a point
  Ball.prototype.pointDing = function() {
    var audio = new Audio(
    'ding.mp3');
    audio.play();
  }
