var images = document.getElementsByClassName("peghole");    
var target=document.getElementById("target");
var deg=0;
var currentAngle=0;
var currentPeg=0;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var board = [];
for (var i = 0; i < 25; i++) {
    board.push(getRandomInt(1, 8));
}

for (var j = 0; j < images.length; j++) {
    if (board[j] === 2) {
        images[j].style.transform = "rotate(45deg)";
    } else if (board[j] === 3) {
        images[j].style.transform = "rotate(90deg)";
    } else if (board[j] === 4) {
        images[j].style.transform = "rotate(135deg)";
    } else if (board[j] === 5) {
        images[j].style.transform = "rotate(180deg)";
    } else if (board[j] === 6) {
        images[j].style.transform = "rotate(225deg)";
    } else if (board[j] === 7) {
        images[j].style.transform = "rotate(270deg)";
    } else if (board[j] === 8) {
        images[j].style.transform = "rotate(315deg)";
    }
}

function rotateLeft(){
    deg-=45;
    if(deg < 0){
        deg+=360;
    }
    console.log(deg);
    target.style.transform="rotate("+deg+"deg)";
    setCurrentAngle();
    startGame();
}
function rotateRight(){
     deg+=45;
     if(deg>=360){
        deg-=360;
     }
     console.log(deg);
     target.style.transform="rotate("+deg+"deg)";
     setCurrentAngle();
     startGame();
}

function setCurrentAngle(){
    if(deg === 0){
        currentAngle=1;
    } else if(deg === 45){
        currentAngle=2;
    } else if(deg === 90){
        currentAngle=3;
    } else if(deg === 135){
        currentAngle=4;
    } else if(deg === 180){
        currentAngle=5;
    } else if(deg === 225){
        currentAngle=6;
    } else if(deg === 270){
        currentAngle=7;
    } else if(deg === 315){
        currentAngle=8;
    }
    console.log("Current Angle: "+currentAngle);
}

function checkAnswer(){
    if(currentAngle === board[currentPeg]){
        images[currentPeg].style.background="green";
        currentPeg+=1;
        if(currentPeg <=24){
            images[currentPeg].style.background="yellow";
        } else {
            alert("You won!");
            for(var i = 0; i<images.length;i++){
                images[i].style.background="white";
            }
            currentPeg=0;
        }

    } else {
        images[currentPeg].style.background="red";
    }
}

function startGame(){
    images[currentPeg].style.background="yellow";

}
