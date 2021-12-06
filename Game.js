function Game(){
    let cue_ball_position = new Vector2(260,240);
    this.cue_ball = new Ball("cue", cue_ball_position);
    this.cue_ball.velocity = new Vector2(1,0);
    this.eight_ball = new Ball("8-ball", new Vector2(765,240));
    let mystick = new Stick(new Vector2(cue_ball_position.x-600, cue_ball_position.y));
    this.stick = mystick;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    this.c = c;
    this.ctx = ctx;
    this.balls = this.initial_ball_setup();
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
}
Game.prototype.clear = function(){
    let c = this.ctx
    c.clearRect(0, 0, 1000, 500)
}

 Game.prototype.draw = function(){
    let s = this.stick;
    s.draw();
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
                ,1);
            setTimeout(() => {myGame.draw_board()}
                ,1);
        }
        else
        {
            let w = 3;
        }
    }
    var xv = document.getElementById('xvel').value;
    var yv = document.getElementById('yvel').value;
    console.log(xv);
    console.log(yv);

    this.cue_ball.velocity = new Vector2(parseInt(document.getElementById('xvel').value), parseInt(document.getElementById('yvel').value));
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
Game.prototype.start = function(){
    
    //loadImages(myGame.redraw());
    this.draw_board();
    this.draw();
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
Game.prototype.checkGameStatus = function(){
    if(this.eight_ball.onBoard==false)
    {
        //this.game_lost()
    }
    else
    {
        let b = this.balls;
        for (let i = 0; i < b.length; ++i)
        {
            let ball = b[i];
            if(ball.onBoard==false)
            {
                this.points = this.points + 1;
            }
        }
        if(this.points == 14)
        {
            //this.game_won()
        }
    }
    var element = document.getElementById("score");
    element.innerHTML = "Your score is" + this.points;
}
// let cue = this.cue_ball
// console.log(this.cue_ball)
let myGame = new Game();

//myGame.start();
myGame.start();
//myGame.update(0.10);
//myGame.redraw();
