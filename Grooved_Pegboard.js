var images = document.getElementsByClassName("peghole");


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
// OUR LIT CODE_____________________________________________________

window.onload = function() {
    $(function () {
        var dragging = false,
            target_wp,
            o_x, o_y, h_x, h_y, last_angle;
        $('.handle').mousedown(function (e) {
            h_x = e.pageX;
            h_y = e.pageY; // clicked point
            e.preventDefault();
            e.stopPropagation();
            dragging = true;
            target_wp = $(e.target).closest('.draggable_wp');
            if (!target_wp.data("origin")) target_wp.data("origin", {
                left: target_wp.offset().left,
                top: target_wp.offset().top
            });
            o_x = target_wp.data("origin").left;
            o_y = target_wp.data("origin").top; // origin point

            last_angle = target_wp.data("last_angle") || 0;
        })

        $(document).mousemove(function (e) {
            if (dragging) {
                var s_x = e.pageX,
                    s_y = e.pageY; // start rotate point
                if (s_x !== o_x && s_y !== o_y) { //start rotate
                    var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
                    s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
                    s_rad += last_angle; // relative to the last one
                    var degree = (s_rad * (360 / (2 * Math.PI)));
                    target_wp.css('-moz-transform', 'rotate(' + degree + 'deg)');
                    target_wp.css('-moz-transform-origin', '50% 50%');
                    target_wp.css('-webkit-transform', 'rotate(' + degree + 'deg)');
                    target_wp.css('-webkit-transform-origin', '50% 50%');
                    target_wp.css('-o-transform', 'rotate(' + degree + 'deg)');
                    target_wp.css('-o-transform-origin', '50% 50%');
                    target_wp.css('-ms-transform', 'rotate(' + degree + 'deg)');
                    target_wp.css('-ms-transform-origin', '50% 50%');
                }
            }
        }) // end mousemove

        $(document).mouseup(function (e) {
            if ( dragging ) {
                dragging = false
                var s_x = e.pageX,
                    s_y = e.pageY;

                // Saves the last angle for future iterations
                var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
                s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
                s_rad += last_angle;
                target_wp.data("last_angle", s_rad);
            }
        })
    })
    $(function() {
        var startX, startY;
        $( ".draggable_wp" ).draggable({
            start:function(event, ui) {
                var offset = $(".draggable_wp").offset();
                startX = offset.left;
                startY = offset.top;
            },
            stop:function(event, ui) {
                var origin = $(".draggable_wp").data("origin");
                var offset = $(".draggable_wp").offset();
                if ( origin ) {
                    $(".draggable_wp").data("origin", {
                        left:origin.left + offset.left - startX,
                        top:origin.top + offset.top - startY
                    });
                }
                else {
                    $(".draggable_wp").data("origin", {
                        left:offset.left,
                        top:offset.top
                    });
                }
            }
        });
    });

};