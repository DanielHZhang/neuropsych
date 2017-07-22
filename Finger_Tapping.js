
var counter = 0;
var timeRemaining = 10;
var inGame = false;
var timer;
var startTime;
var interval;
var elapsedTime;



function updateText(target, text) {
    console.log(text);
    if(text.toString().indexOf("-") === -1){
        document.getElementById(target).innerHTML = text.toString();
    } else {
        document.getElementById(target).innerHTML = "0.00 seconds"
    }

}

function addToCounter() {
    if (!inGame) {
        inGame = true;
        startTime = Date.now();
        interval = setInterval(updateTimer, 20);
        //timer = setInterval(updateTimer, 909.09);
    }
    counter++;
    updateText("display", counter);
}

function updateTimer() {
    if (inGame) {
        elapsedTime = Date.now() - startTime;
    }

    if ((timeRemaining-(elapsedTime / 1000)).toFixed(2) <0) {
        inGame = false;
        clearInterval(timer);
        //alert("You tapped: " + counter + " times!");
        bootbox.alert("You tapped: " + counter + " times!");
        timeRemaining = 10;
        elapsedTime=0;
        reset();
    }
    updateText('timer', (timeRemaining-(elapsedTime / 1000)).toFixed(2) + " seconds");
}

function reset() {
    counter = 0;
    updateText("display", "Click me");

    if (inGame) {
        clearInterval(interval);
        inGame = false;
        timeRemaining = 10;
        elapsedTime=0;
        updateText('timer', timeRemaining + " seconds");
    }
}


/*var startTime = Date.now();

var interval = setInterval(function() {
    var elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = (timeRemaining-(elapsedTime / 1000)).toFixed(2);
}, 20);

*/
