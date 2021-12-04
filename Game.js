function Game(stick){
    this.stick = stick
    this.cue_ball = new Ball("cue", new Vector2(100,10));
    this.eight_ball = new Ball("8-ball", new Vector2(100,200));
    let balls = [this.cue_ball, this.eight_ball]
    for (let i = 0; i < 14; ++i)
    {
        let ball = new Ball("ball", new Vector2(30+20*i,150));
        balls.push(ball);
    }
    this.balls = balls;
 }

Game.prototype.draw_board = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    let base_image = new Image();
    base_image.src = "pool.png";
    base_image.onload = function(){
        ctx.drawImage(base_image,0,0);
    }
}
Game.prototype.clear = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    console.log(ctx)
    console.log(c.width,c.height)
    ctx.clearRect(0, 0, 1000, 1000)
    
}

 Game.prototype.draw = function(){
    let s = this.stick;
    s.draw();
    let b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        let ball = b[i];
        b[i].draw();
    }
 }

Game.prototype.redraw = function(){
    this.draw_board();
    this.draw();

}
Game.prototype.update = function(timestep){
    let s = this.stick;
    s.updatepos(new Vector2(200,200))

    b = this.balls;
    for (let i = 0; i < b.length; ++i)
    {
        let ball = b[i];
        b[i].update(timestep)
    }
}

let mystick = new Stick(new Vector2(0,0));
let myGame = new Game(mystick);
myGame.draw();
myGame.draw_board();
//setTimeout(() => {myGame.clear()}, 3000)
myGame.update(0.10);
myGame.redraw();
