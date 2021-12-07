function Game(type){
    //Initialize fields for cue_ball and eight_ball
    let cue_ball_position = new Vector2(260,240);
    this.cue_ball = new Ball("cue", cue_ball_position);
    this.eight_ball = new Ball("8-ball", new Vector2(765,240));
    //Initialize stick with cue_ball's position
    let mystick = new Stick(new Vector2(cue_ball_position.x-600, cue_ball_position.y));
    this.stick = mystick;
    //Initialize canvas and context for canvas
    let c = document.getElementById("myCanvas");
    this.c = c;
    this.ctx = c.getContext("2d");
    //Use free input given to distinguish between 3 sample tables and main table
    this.type = type;
    if(type=="full_game")
    {
        //Call upon initial_ball_setup function to set up traditional pool game
        this.balls = this.initial_ball_setup();
    }
    else if(type=="cue_sample")
    {
        this.balls = [this.cue_ball];
    }
    else if(type=="ball_sample")
    {
        //Set up 3 balls and the cue_ball
        this.balls = [this.cue_ball, new Ball("ball", new Vector2(715,240)),new Ball("ball", new Vector2(740,255))
        , new Ball("ball", new Vector2(740,225))];
    }
    else if(type=="eight_sample")
    {
        //Set up cue ball and eight ball
        this.balls = [this.cue_ball, this.eight_ball]
    }
    this.points = 0;
 }

//This initial_ball_setup function sets up a pool table with a singular cue ball and eight ball 
Game.prototype.initial_ball_setup = function(){
    let balls = [this.cue_ball, this.eight_ball]
    let first_ball = new Ball("ball", new Vector2(715,240));
    balls.push(first_ball);
    //This makes the balls for the outside rows
    for (let i = 1; i < 5; ++i)
    {
        let top_ball = new Ball("ball", new Vector2(715+25*i,240+(15*i)));
        let bottom_ball = new Ball("ball", new Vector2(715+25*i,240-(15*i)));
        balls.push(top_ball);
        balls.push(bottom_ball);
    }
    //This makes the ball objects for the last column
    for (let i = 1; i < 4; ++i)
    {
        let ball = new Ball("ball", new Vector2(815,180+(30*i)));
        balls.push(ball);
    }
    //This makes the ball objects for the middle column
    for (let i = 1; i < 3; ++i)
    {
        let ball = new Ball("ball", new Vector2(790,195+(30*i)));
        balls.push(ball);
    }
    return balls;
}

//This function draws the basic board using the image from pool with the stick
Game.prototype.draw_board = function(){
    let base_image = new Image();
    base_image.src = "images/pool.png";
    let ctx = this.ctx;
    base_image.onload = function(){
        ctx.drawImage(base_image,0,0);
    }
    let s = this.stick;
    s.draw();
}

//NOT CURRENTLY BEING USED
//This function clears the board entirely, we didn't end up using it but we coded it so we kept it in
Game.prototype.clear = function(){
    let c = this.ctx
    c.clearRect(0, 0, 1000, 500)
}

//This function draws all the ball objects if they are on the board
 Game.prototype.draw = function(){
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        let ball = b[i];
        if (ball.onBoard == true)
        {
            b[i].draw();
        }
    }
 }

 //This function animates the ball motions
 
Game.prototype.animate_wrapper = function () {
    function animate(testBall){
        myGame.draw();
        //Draw the ball if it is still on the board 
        if(testBall.onBoard==true)
        {
            testBall.draw(); 
        }
        //Update position of the ball every second 
        testBall.update(1);
        if(testBall.positionX<1000)
        {
            setTimeout(() => {window.requestAnimationFrame(animate(testBall))}
                ,5);
            setTimeout(() => {myGame.draw_board()}
                ,5);
            setTimeout(() => {myGame.checkGameStatus()}
                ,5);
        }
        else
        {
            let w = 3;
        }
    }
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        animate(b[i])
    }
}
//Draw board with stick and balls
Game.prototype.setup = function(){
    this.draw_board();
    this.draw();
}
Game.prototype.hit_cue = function(){
    
    this.draw_board();
    this.draw();
    //Get user input for angle and power where power corresponds to the magnitude of the velocity
    let angle = prompt("Please enter an angle in degrees:", "0");
    let power = prompt("Please enter a power:", "0");
    //Continue to get user input until the user enters numerical values for the angle and power
    while(isNaN(angle)){
        let new_angle = prompt("Please enter an angle in degrees:", "0");
        angle = new_angle;
    }
    while(isNaN(power)){
        let new_power = prompt("Please enter a power:", "0");
        power = new_power;
    }
    //Convert angle to radians
    let radians = (Math.PI/180.0)*angle;
    //Get xvelocity and yvelcoity from angle and magnitude of velocity using trig
    let xvelocity = power*Math.sin(radians);
    let yvelocity = power*Math.cos(radians);
    //Update the velocity of the cue ball with the the user input
    let c = this.cue_ball;
    c.velocity = new Vector2(xvelocity, yvelocity);
    this.animate_wrapper();
}

//This function updates the ball objects with a given timestep
Game.prototype.update = function(timestep){
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        let ball = b[i];
        b[i].update(timestep)
    }
}

//This function checks for collisions between the balls and with the walls
Game.prototype.checkForCollisions = function(){
    //check for collisions between balls
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        for (let j = 0; j < b.length; ++j)
        {
            //take any two balls, as long as they are not the same
            if(i!=j)
            {
                let ball1 = b[i];
                let ball2 = b[j];
                let pos1 = ball1.position;
                let pos2 = ball2.position;
                //check if distance <=25 
                var deltaX = pos1.x - pos2.x;
		        var deltaY = pos1.y - pos2.y;
                let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (distance<=25)
                {
                    //call on collide function to visualize collision
                    newBalls = this.collide(ball1, ball2);
                    this.b[i] = newBalls[0];
                    this.b[j] = newBalls[1];
                }
            }
        }
    }

    //check for collisions between balls and walls
    for (let i = 0; i < b.length; ++i)
    {
        let ball = b[i];
        //if collide against left and right walls make it bounce and be slightly dampened
        if(ball.position.x<50 || ball.position.x>890)
        {
            ball.velocity = new Vector2(0.95*-ball.velocity.x, 0.95*ball.velocity.y);
        }

        //if collide against top and bottom walls make it bounce and be slightly dampened
        else if(ball.position.y<50 || ball.position.y>450)
        {
            ball.velocity = new Vector2(0.95*ball.velocity.x, 0.95*-ball.velocity.y);

        }

    }
}

//If the balls collide, change their velocity as such
Game.prototype.collide = function(ball1, ball2){

    let ball1_position = ball1.position;
    let ball2_position = ball2.position;
    let ball1_velocity = ball1.velocity;
    let ball2_velocity = ball2.velocity;
    //find the difference between the x and y values for the O and A values in SOH CAH TOA
    var opposite = ball1_position.y - ball2_position.y;
    var adjacent = ball1_position.x - ball2_position.x;
    //find the angle using TOA
    var rotation = Math.atan2(opposite, adjacent);
    //calculate power using velocity of both balls
    var power = (Math.abs(ball1_velocity.x) + Math.abs(ball1_velocity.y)) + (Math.abs(ball2_velocity.x) + Math.abs(ball2_velocity.y));
    //scale back the power
    power = power * 0.0045;
    //calculate new velocities using the angle and power
    let velocity1 = new Vector2(90*Math.cos(rotation)*power,90*Math.sin(rotation)*power); 
    let velocity2 = new Vector2(90*Math.cos(rotation + Math.PI)*power,90*Math.sin(rotation + Math.PI)*power);
    //set the balls' velocities using the calculated new velocities
    ball1.velocity = new Vector2(ball1_velocity.x + velocity1.x, ball1_velocity.y + velocity1.y);
    ball2.velocity = new Vector2(ball2_velocity.x + velocity2.x, ball2_velocity.y + velocity2.y);
    //return the new balls
    return [ball1, ball2]        
}

//This function checks for collisions, checks the point values, and checks if the player won
Game.prototype.checkGameStatus = function(){
    //call the checkForCollisions method which would update velocities accordingly
    this.checkForCollisions();

    //caluclate points based on how many balls are on board
    this.points = 0;
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        let ball = b[i];
        if(ball.onBoard==false)
        {
            this.points = this.points + 1;
        }
    }

    //determine if the player won given the type of game they are playing
    if(this.type=="full_game")
    {
        if(this.points == 14)
        {
            alert("You won!")
        }
    }
    else if(this.type == "ball_sample"){
        let b = this.balls
        if(this.points == b.length - 1)
        {
            alert("You won!")
        } 
    }

    //update score accordingly
    var element = document.getElementById("score");
    element.innerHTML = "Your score is" + this.points;
}