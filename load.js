let images ={};
let imgs_still_loading = 0;
function imageLoadingLoop(callback){
    if(imgs_still_loading){
        requestAnimationFrame(imageLoadingLoop.bind(this, callback));
    }
    else{
        callback()
    }
}

function loadImages(callback){
    function loadImage(fileName){
        console.log("In load");
        imgs_still_loading++;
        let img  = new Image();
        img.src="./images/"+fileName;

        img.onload = function(){
            imgs_still_loading--;
        }
        console.log(img)
        return img;
    }
    console.log("in images")
    images.background = loadImage('pool.png');
    images.stick = loadImage('pool_cue.png');
    images.cue_ball = loadImage('cue.png');
    images.eight_ball = loadImage('8-ball.png');
    images.ball = loadImage('ball.png');
    console.log(images);
    imageLoadingLoop(callback);
}

