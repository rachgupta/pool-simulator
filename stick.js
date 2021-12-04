



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

function Stick(){
    this.position = {x: 0, y: 400};
}

Stick.prototype.draw = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("spr_stick");
    stick_img = new Image();
    stick_img.src = "spr_stick.png";
    stick_img.onload = function(){
        ctx.drawImage(stick_img, this.position.x, this.position.y);
    }
}
let mystick = new Stick();
mystick.draw();

