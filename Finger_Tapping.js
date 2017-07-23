var counter = 0;
var timeRemaining = 10;
var inGame = false;
var timer;
var startTime;
var interval;
var elapsedTime;

function updateText(target, text) {
    if (text.toString().indexOf("-") === -1) {
        document.getElementById(target).innerHTML = text.toString();
    } else {
        document.getElementById(target).innerHTML = "0.00 seconds"
    }
}

function addToCounter() {
    if (!inGame) {
        inGame = true;
        startTime = Date.now();
        interval = setInterval(updateTimer, 40);
    }
    counter++;
    updateText("display", counter);
}

function updateTimer() {
    if (inGame) {
        elapsedTime = Date.now() - startTime;
        updateText('timer', (timeRemaining - (elapsedTime / 1000)).toFixed(0) + " seconds");
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
    } else if ((timeRemaining - (elapsedTime / 1000)).toFixed(2) <= 2) {
        document.getElementById("timer").style.color = "#e23e1d";
    }
}

function reset() {
    counter = 0;
    updateText("display", "Click me");
    document.getElementById("timer").style.color = "#000000";
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


/*var startTime = Date.now();

 var interval = setInterval(function() {
 var elapsedTime = Date.now() - startTime;
 document.getElementById("timer").innerHTML = (timeRemaining-(elapsedTime / 1000)).toFixed(2);
 }, 20);

 */
