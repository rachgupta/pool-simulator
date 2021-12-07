function Game(type){
    let cue_ball_position = new Vector2(260,240);
    this.cue_ball = new Ball("cue", cue_ball_position);
    this.cue_ball.velocity = new Vector2(0,0);
    this.eight_ball = new Ball("8-ball", new Vector2(765,240));
    let mystick = new Stick(new Vector2(cue_ball_position.x-600, cue_ball_position.y));
    this.stick = mystick;
    let c = document.getElementById("myCanvas");
    this.c = c;
    this.ctx = c.getContext("2d");
    this.type = type;
    if(type=="full_game")
    {
        this.balls = this.initial_ball_setup();
    }
    else if(type=="cue_sample")
    {
        this.balls = [this.cue_ball];
    }
    else if(type=="ball_sample")
    {
        this.balls = [this.cue_ball, new Ball("ball", new Vector2(715,240)),new Ball("ball", new Vector2(740,255))
        , new Ball("ball", new Vector2(740,225))];
    }
    else if(type=="eight_sample")
    {
        this.balls = [this.cue_ball, this.eight_ball]
    }
    this.points = 0;
 }

Game.prototype.initial_ball_setup = function(){
    let balls = [this.cue_ball, this.eight_ball]
    let first_ball = new Ball("ball", new Vector2(715,240));
    balls.push(first_ball);
    //outside rows
    for (let i = 1; i < 5; ++i)
    {
        let top_ball = new Ball("ball", new Vector2(715+25*i,240+(15*i)));
        let bottom_ball = new Ball("ball", new Vector2(715+25*i,240-(15*i)));
        balls.push(top_ball);
        balls.push(bottom_ball);
    }
    //last column
    for (let i = 1; i < 4; ++i)
    {
        let ball = new Ball("ball", new Vector2(815,180+(30*i)));
        balls.push(ball);
    }
    //middle column
    for (let i = 1; i < 3; ++i)
    {
        let ball = new Ball("ball", new Vector2(790,195+(30*i)));
        balls.push(ball);
    }
    return balls;
}
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
Game.prototype.clear = function(){
    let c = this.ctx
    c.clearRect(0, 0, 1000, 500)
}

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
Game.prototype.animate_wrapper = function () {
    function animate(testBall){
        myGame.draw();
        if(testBall.onBoard==true)
        {
            testBall.draw(); 
        }
        //testBall.velocity = new Vector2(1,1);
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
    // this.cue_ball.velocity = new Vector2(parseInt(document.getElementById('xvel').value), parseInt(document.getElementById('yvel').value));
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        animate(b[i])
    }
                      // draw image at current position
    // let balls = this.balls
    // for(let i = 2; i < balls.length; ++i)
    // {

    //animate(testBall);
    // }        // loop
}
Game.prototype.setup = function(){
    this.draw_board();
    this.draw();
    //this.start();
}
Game.prototype.start = function(){
    
    //loadImages(myGame.redraw());
    this.draw_board();
    this.draw();
    let angle = prompt("Please enter an angle in degrees:", "0");
    let power = prompt("Please enter a power:", "0");
    console.log(typeof(angle));
    while(isNaN(angle)){
        let new_angle = prompt("Please enter an angle in degrees:", "0");
        angle = new_angle;
    }
    while(isNaN(power)){
        let new_power = prompt("Please enter a power:", "0");
        power = new_power;
    }

    let radians = (Math.PI/180.0)*angle;
    let xvelocity = power*Math.sin(radians);
    let yvelocity = power*Math.cos(radians);
    console.log(xvelocity)
    console.log(yvelocity)

    let c = this.cue_ball;
    c.velocity = new Vector2(xvelocity, yvelocity);
    //c.velocity = new Vector2(4,0);
    this.animate_wrapper();
}
Game.prototype.update = function(timestep){
    let s = this.stick;
    //s.updatepos(new Vector2(200,200))
 
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        let ball = b[i];
        b[i].update(timestep)
    }
}
Game.prototype.checkForCollisions = function(){
    //check for collisions between balls
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        for (let j = 0; j < b.length; ++j)
        {
            if(i!=j)
            {
                let ball1 = b[i];
                let ball2 = b[j];
                let pos1 = ball1.position;
                let pos2 = ball2.position;
                var deltaX = pos1.x - pos2.x;
		        var deltaY = pos1.y - pos2.y;
                let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (distance<=25)
                {
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
        if(ball.position.x<50 || ball.position.x>890)
        {
            ball.velocity = new Vector2(0.95*-ball.velocity.x, 0.95*ball.velocity.y);
            console.log(ball.velocity);
        }
        else if(ball.position.y<50 || ball.position.y>450)
        {
            ball.velocity = new Vector2(0.95*ball.velocity.x, 0.95*-ball.velocity.y);

        }

    }
}
Game.prototype.collide = function(ball1, ball2){
    console.log(ball1, ball2)
    let ball1_position = ball1.position;
    let ball2_position = ball2.position;
    let ball1_velocity = ball1.velocity;
    let ball2_velocity = ball2.velocity;
    var opposite = ball1_position.y - ball2_position.y;
    var adjacent = ball1_position.x - ball2_position.x;
    var rotation = Math.atan2(opposite, adjacent);
    var power = (Math.abs(ball1_velocity.x) + Math.abs(ball1_velocity.y)) + (Math.abs(ball2_velocity.x) + Math.abs(ball2_velocity.y));
    power = power * 0.00482;
    let velocity1 = new Vector2(90*Math.cos(rotation)*power,90*Math.sin(rotation)*power); 
    let velocity2 = new Vector2(90*Math.cos(rotation + Math.PI)*power,90*Math.sin(rotation + Math.PI)*power);
    ball1.velocity = new Vector2(ball1_velocity.x + velocity1.x, ball1_velocity.y + velocity1.y);
    ball2.velocity = new Vector2(ball2_velocity.x + velocity2.x, ball2_velocity.y + velocity2.y);
    return [ball1, ball2]        
}
Game.prototype.checkGameStatus = function(){
    this.checkForCollisions();
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
    let num_needed = 0;
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
    var element = document.getElementById("score");
    element.innerHTML = "Your score is" + this.points;
}
// let cue = this.cue_ball
// console.log(this.cue_ball)
//let myGame = new Game("full_game");

//myGame.start();
//myGame.setup();
//myGame.update(0.10);
//myGame.redraw();