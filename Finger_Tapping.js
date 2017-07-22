
var counter = 0;
var timeRemaining = 10;
var inGame = false;
var timer;


function updateText(target, text) {
    document.getElementById(target).innerHTML = text.toString();
}

function addToCounter() {
    if (!inGame) {
        inGame = true;
        timer = setInterval(updateTimer, 909.09);
    }
    counter++;
    updateText("display", counter);
}

function updateTimer() {
    if (inGame) {
        --timeRemaining;
    }

    if (timeRemaining === -1) {
        inGame = false;
        clearInterval(timer);
        alert("You tapped: " + counter + " times!");
        timeRemaining = 10;
        reset();
    }
    updateText('timer', timeRemaining + " seconds");
}

function reset() {
    counter = 0;
    updateText("display", "Click me");

    if (inGame) {
        clearInterval(timer);
        inGame = false;
        timeRemaining = 10;
        updateText('timer', timeRemaining + " seconds");
    }
}





