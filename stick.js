// const Stick = {
//     xpost: 1,
//     ypost: 1,
//     path: "spr_stick.pn",
//     draw: function(){
//         var c = document.getElementById("myCanvas");
//         var ctx = c.getContext("2d");
//         var img = document.getElementById("spr_stick");
//         stick_img = new Image();
//         stick_img.src = "spr_stick.png";
//         stick_img.onload = function(){
//             ctx.drawImage(stick_img,this.xpost,this.ypost);
//         }

//     },
//     update: function(){
//         this.xpost++
//     }

// };
// mystick = Stick.draw();

// Stick.prototype.update = function(){
//     this.position++
// }

// Stick.prototype.draw = function(){
//     var c = document.getElementById("myCanvas");
//     var ctx = c.getContext("2d");
//     var img = document.getElementById("spr_stick");
//     stick_img = new Image();
//     stick_img.src = "spr_stick.png";
//     stick_img.onload = function(){
//         ctx.drawImage(stick_img, this.position);
//     }
// }
// this.stick = new Stick();
// this.stick.update();
// this.stick.draw();
// this.stick.update();

function Stick(position){
    this.positionx = position.x;
    this.positiony = position.y;
}

Stick.prototype.draw = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    stick_img = new Image();
    stick_img.src = "spr_stick.png";
    x = this.positionx
    y = this.positiony
    stick_img.onload = function(){
        ctx.drawImage(stick_img, x, y);
    }
}
Stick.prototype.updatepos = function(){
    this.positionx+=50
}
