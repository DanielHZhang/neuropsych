var images = document.getElementsByClassName("peghole");
var target = document.getElementById("target");
var currentAngle = 0;
var currentPeg = 0;
var angle;
var startTime;
var inGame = false;
var interval;
var board = [];
var rotation;
var currentTime;

startGame();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
    board.length = 0;

    for (var i = 0; i < 25; i++) {
        board.push(getRandomInt(1, 8));
        console.log(board[i]);
    }
    for (var j = 0; j < images.length; j++) {
        if (board[j] === 1) {
            images[j].style.transform = "rotate(45deg)";
        } else if (board[j] === 2) {
            images[j].style.transform = "rotate(90deg)";
        } else if (board[j] === 3) {
            images[j].style.transform = "rotate(135deg)";
        } else if (board[j] === 4) {
            images[j].style.transform = "rotate(180deg)";
        } else if (board[j] === 5) {
            images[j].style.transform = "rotate(225deg)";
        } else if (board[j] === 6) {
            images[j].style.transform = "rotate(270deg)";
        } else if (board[j] === 7) {
            images[j].style.transform = "rotate(315deg)";
        }
    }
}

function startTimer() {
    inGame = true;
    startTime = Date.now();
    interval = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        currentTime = (elapsedTime / 1000).toFixed(0);
        document.getElementById("time").innerHTML = "Time elapsed: " + currentTime + "s";
    }, 1000);
}

function setCurrentAngle(deg) {
    if (deg > 35 && deg < 55) {
        currentAngle = 1;
    } else if (deg > 80 && deg < 100) {
        currentAngle = 2;
    } else if (deg > 125 && deg < 145) {
        currentAngle = 3;
    } else if (deg > 170 && deg < 190) {
        currentAngle = 4;
    } else if (deg > 215 && deg < 235) {
        currentAngle = 5;
    } else if (deg > 260 && deg < 280) {
        currentAngle = 6;
    } else if (deg > 305 && deg < 325) {
        currentAngle = 7;
    } else if (deg > 350 || deg < 10) {
        currentAngle = 8;
    }
}

function checkAnswer() {
    setCurrentAngle(angle);
    var speech;
    if (currentAngle === board[currentPeg]) {
        images[currentPeg].setAttribute("src", "green.png");
        currentPeg += 1;
        var randAngle = getRandomInt(0, 360);
        target.style.transition="all 0.3s";
        target.style.transform = "rotate(" + randAngle + "deg)";
        

        angle = randAngle;
        if (currentPeg <= 24) {
            images[currentPeg].setAttribute("src", "yellow.png");
        } else {
            inGame = false;
            clearInterval(interval);
            document.getElementById("time").innerHTML = "Complete!";

        var perc = Number((((currentTime/141)-1)*100).toFixed(0));
        
        if(perc < 0 ){
            perc*=-1;
            speech = "It took you " + currentTime + " seconds to complete the test! You performed "+ perc + "% better than the homeless";
        } else if(perc === 0) {
            speech= "It took you " + currentTime + " seconds to complete the test! You performed the same as the homeless.";
        } else {
            speech = "It took you " + currentTime + " seconds to complete the test! You performed "+perc+"% worse than the homeless.";
        }
         

            bootbox.alert({
                size: "small",
                title: "Congratulations!",
                message: speech,
                callback: function () {
                    location.reload();
                }
            });
        }
    } else {
        images[currentPeg].setAttribute("src", "red.png");
    }
}

(function () {
    var R2D, active, center, rotate, startAngle;
    R2D = 180 / Math.PI;
    active = false;
    angle = 0;
    rotation = 0;
    startAngle = 0;
    center = {x: 0, y: 0};

    target.addEventListener("mousedown", start, false);
    target.addEventListener("mousemove", move, false);
    target.addEventListener("mouseup", finish, false);
    target.addEventListener("touchstart", start, false);
    target.addEventListener("touchmove", move, false);
    target.addEventListener("touchend", finish, false);


    function start(event) {

        if (!inGame) {
            startTimer();
        }
        images[currentPeg].setAttribute("src", "yellow.png");
        event.stopPropagation();
        target.style.transition="";

        var height, left, top, width, x, y, _ref;
        _ref = this.getBoundingClientRect();
        top = _ref.top;
        left = _ref.left;
        width = _ref.width;
        height = _ref.height;
        center = {
            x: left + (width / 2),
            y: top + (height / 2)
        };

        if (event.which === 1) { //event is a MouseEvent
            event.preventDefault();
            x = event.pageX - center.x;
            y = event.pageY - center.y;
        } else { //event is a TouchEvent
            var touches = event.changedTouches;
            x = touches[0].pageX - center.x;
            y = touches[0].pageY - center.y;
            console.log(x);
            console.log(y);
        }
        rotation = 0;
        startAngle = R2D * Math.atan2(y, x);

        return active = true;
    }

    function move(event) {

        var d, x, y;
        event.preventDefault();
        event.stopPropagation();

        if (event.type === "mousemove") { //event is a MouseEvent
            x = event.pageX - center.x;
            y = event.pageY - center.y;
            //console.log("MouseX: " + event.pageX + " MouseY: " + event.pageY)
        } else { //event is a TouchEvent
            var touches = event.changedTouches;
            x = touches[0].pageX - center.x;
            y = touches[0].pageY - center.y;
            //console.log("TouchX: " + touches[0].pageX + " TouchY: " + touches[0].pageY)
        }

        d = R2D * Math.atan2(y, x);
        rotation = d - startAngle;

        if (active) {
            return this.style.webkitTransform = "rotate(" + (angle + rotation) + "deg)";
        }
    }

    function finish() {
        
        angle = angle + rotation;
        if (angle >= 360) {
            angle -= 360;
        } else if (angle < 0) {
            angle += 360;
        }
        return active = false;
    }
}).call();

//
// $(function () {
//     var R2D, active, center, rotate, rotation, startAngle;
//
//     R2D = 180 / Math.PI;
//     active = false;
//     angle = 0;
//     rotation = 0;
//     startAngle = 0;
//     center = {x: 0, y: 0};
//
//     $(document).on("vmousedown", "#target", function (event) {
//         var height, left, top, width, x, y, _ref;
//         if (event.which === 1) {
//             event.preventDefault();
//         }
//         if (!inGame) {
//             startTimer();
//             images[currentPeg].setAttribute("src", "yellow.png");
//         }
//         event.stopPropagation();
//
//         _ref = this.getBoundingClientRect();
//         top = _ref.top;
//         left = _ref.left;
//         width = _ref.width;
//         height = _ref.height;
//         center = {
//             x: left + (width / 2),
//             y: top + (height / 2)
//         };
//
//         x = event.pageX - center.x;
//         y = event.pageY - center.y;
//
//         startAngle = R2D * Math.atan2(y, x);
//
//         return active = true;
//     });
//
//     $(document).on("vmousemove", "#target", function (event) {
//         var d, x, y;
//         event.preventDefault();
//         x = event.pageX - center.x;
//         y = event.pageY - center.y;
//         d = R2D * Math.atan2(y, x);
//         rotation = d - startAngle;
//
//         if (active) {
//             return this.style.webkitTransform = "rotate(" + (angle + rotation) + "deg)";
//         }
//     });
//
//     $(document).on("vmouseup", "#target", function () {
//
//         angle = angle + rotation;
//         if (angle >= 360) {
//             angle -= 360;
//         } else if (angle < 0) {
//             angle += 360;
//         }
//
//
//         attemptDegree = angle;
//         console.log("Angle: " + angle + " Rotation: " + rotation);
//
//         return active = false;
//     });
//
// });


// function check() {
//     if (attemptDegree > 250) { //convert to value between -110 and 0
//         attemptDegree -= 360;
//     }
//     var lowerBound = board[currentPeg] * 45 - 10;
//     var upperBound = board[currentPeg] * 45 + 10;
//
//     console.log("Attempt: " + attemptDegree + " Actual: " + board[currentPeg] * 45);
//     if (attemptDegree > lowerBound && attemptDegree < upperBound) {
//         console.log("U GOT IT RIGHT!");
//
//         //target.style.transform = "rotate(0deg)";
//         images[currentPeg].style.background = "green";
//         //images[currentPeg].setAttribute("src","green.jpg");
//         currentPeg++;
//         target.style.transform = "rotate("+ getRandomInt(0, 360)+"deg)";
//         this.style.webkitTransform = "rotate(" + getRandomInt(0, 360) + "deg)";
//
//         if (currentPeg <= 24) {
//             images[currentPeg].style.background = "yellow";///////
//         } else {
//             alert("You won!");
//             for (var i = 0; i < images.length; i++) {
//                 images[i].setAttribute("src", "peghole.png");
//             }
//             currentPeg = 0;
//         }
//     }
//
//
// }

/*var startTime = Date.now();

 var interval = setInterval(function() {
 var elapsedTime = Date.now() - startTime;
 document.getElementById("timer").innerHTML = (timeRemaining-(elapsedTime / 1000)).toFixed(2);
 }, 20);

 */


// window.onload = function () {
//     $(function () {
//         var dragging = false, target_wp, o_x, o_y, h_x, h_y, last_angle;
//         $('.handle').mousedown(function (e) {
//             h_x = e.pageX;
//             h_y = e.pageY; // clicked point
//             e.preventDefault();
//             e.stopPropagation();
//             dragging = true;
//             target_wp = $(e.target).closest('.draggable_wp');
//             if (!target_wp.data("origin")) target_wp.data("origin", {
//                 left: target_wp.offset().left,
//                 top: target_wp.offset().top
//             });
//             o_x = target_wp.data("origin").left;
//             o_y = target_wp.data("origin").top; // origin point
//
//             last_angle = target_wp.data("last_angle") || 0;
//         });
//
//         $(document).mousemove(function (e) {
//             if (dragging) {
//                 var s_x = e.pageX,
//                     s_y = e.pageY; // start rotate point
//                 if (s_x !== o_x && s_y !== o_y) { //start rotate
//                     var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
//                     s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
//                     s_rad += last_angle; // relative to the last one
//                     var degree = (s_rad * (360 / (2 * Math.PI)));
//                     target_wp.css('-moz-transform', 'rotate(' + degree + 'deg)');
//                     target_wp.css('-moz-transform-origin', '50% 50%');
//                     target_wp.css('-webkit-transform', 'rotate(' + degree + 'deg)');
//                     target_wp.css('-webkit-transform-origin', '50% 50%');
//                     target_wp.css('-o-transform', 'rotate(' + degree + 'deg)');
//                     target_wp.css('-o-transform-origin', '50% 50%');
//                     target_wp.css('-ms-transform', 'rotate(' + degree + 'deg)');
//                     target_wp.css('-ms-transform-origin', '50% 50%');
//                 }
//             }
//         }); // end mousemove
//
//         $(document).mouseup(function (e) {
//             if (dragging) {
//                 dragging = false;
//                 var s_x = e.pageX,
//                     s_y = e.pageY;
//
//                 // Saves the last angle for future iterations
//                 var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
//                 s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
//                 s_rad += last_angle;
//                 target_wp.data("last_angle", s_rad);
//             }
//         })
//     });
//     $(function () {
//         var startX, startY;
//         $(".draggable_wp").draggable({
//             start: function (event, ui) {
//                 var offset = $(".draggable_wp").offset();
//                 startX = offset.left;
//                 startY = offset.top;
//             },
//             stop: function (event, ui) {
//                 var origin = $(".draggable_wp").data("origin");
//                 var offset = $(".draggable_wp").offset();
//                 if (origin) {
//                     $(".draggable_wp").data("origin", {
//                         left: origin.left + offset.left - startX,
//                         top: origin.top + offset.top - startY
//                     });
//                 }
//                 else {
//                     $(".draggable_wp").data("origin", {
//                         left: offset.left,
//                         top: offset.top
//                     });
//                 }
//             }
//         });
//     });
//
// };