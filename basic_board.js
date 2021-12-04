var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("pool");
base_image = new Image();
base_image.src = "pool.png";
base_image.onload = function(){
  ctx.drawImage(base_image,0,0);
}


let myball = new Ball("ball", new Vector2(100,200));
myball.draw();

let mystick = new Stick();
mystick.draw();





