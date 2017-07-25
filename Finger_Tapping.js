var counter = 0;
var timeRemaining = 10.00;
var inGame = false;
var timer;
var startTime;
var interval;
var elapsedTime;

function updateText(target, text) {
    if (text.toString().indexOf("-") === -1) {
        document.getElementById(target).innerHTML = text.toString();
    } else {
        document.getElementById(target).innerHTML = "0.00 seconds";
    }
}

function addToCounter() {
    if (!inGame) {
        inGame = true;
        startTime = Date.now();
        interval = setInterval(updateTimer, 40);
    }
    counter++;
    updateText("counterButton", counter);
}

function updateTimer() {
    if (inGame) {
        elapsedTime = Date.now() - startTime;
        updateText('timer', (timeRemaining - (elapsedTime / 1000)).toFixed(2) + " seconds");
    }
    if ((timeRemaining - (elapsedTime / 1000)).toFixed(2) < 0) {
        inGame = false;
        clearInterval(timer);
        bootbox.alert({
            size: "small",
            title: "Score",
            message: "You tapped: " + counter + " times!",
            callback: function () {
                reset();
            }
        });
        updateText('timer', "0.00 seconds");
        timeRemaining = 10;
        elapsedTime = 0;
    }
}

function reset() {
    counter = 0;
    updateText("counterButton", "Click me");
    if (!inGame) {
        updateText('timer', "10 seconds");
    }
    if (inGame) {
        clearInterval(interval);
        inGame = false;
        timeRemaining = 10;
        elapsedTime = 0;
        updateText('timer', timeRemaining + " seconds");
    }
}
