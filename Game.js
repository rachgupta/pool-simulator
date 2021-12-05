function Game(){
    let cue_ball_position = new Vector2(260,240);
    this.cue_ball = new Ball("cue", cue_ball_position);
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
    base_image.src = "pool.png";
    let ctx = this.ctx;
    base_image.onload = function(){
        ctx.drawImage(base_image,0,0);
    }
}
Game.prototype.clear = function(){
    console.log(this.ctx)
    console.log(this.c.width,this.c.height)
    this.ctx.clearRect(0, 0, 1000, 1000)
    
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

Game.prototype.redraw = function(){
    setTimeout(() => {myGame.clear()}, 1000)
    this.draw_board();
    this.draw();
    this.checkGameStatus();

}
Game.prototype.update = function(timestep){
    let s = this.stick;
    s.updatepos(new Vector2(200,200))

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
        if(points == 14)
        {
            //this.game_won()
        }
    }
}
// let cue = this.cue_ball
// console.log(this.cue_ball)
let myGame = new Game();
myGame.draw_board();
myGame.draw();
//myGame.update(0.10);
//myGame.redraw();
