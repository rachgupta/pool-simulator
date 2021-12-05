let sprites ={};
let assetsStillLoading = 0;
function assetsLoadingLoop(callback){
    if(assetsStillLoading){
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
    else{
        callback()
    }
}

function loadAssets(callbacks){
    function loadSprite(fileName){
        assetsStillLoading++;
        let spriteImage  = new Image();
        spriteImage.src=fileNames;

        spriteImage.onload = function(){
            assetsStillLoading--;
        }

        return spriteImage;
    }
    sprites.background = loadSprite('pool.png');
    sprites.stick = loadSprite('spr_stick.png')
    assetsLoadingLoop(callback)
}

