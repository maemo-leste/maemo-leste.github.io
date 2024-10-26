$(document).ready(function(){
    /* Background parallax. */
    $(document).mousemove(function(event) {
        var offset = 100 - (event.pageX / $(window).width()) * 100;
        $('.img-front').css('background-position-x', '-' + (offset / 10) + 'px');
        $('.img-middle').css('background-position-x', '-' + (offset / 15) + 'px');
    });

    /* Walking dino. */
    function randRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var dinoWalking = false;
    function dinoWalk(){
        if(parseInt(randRange(1, 3), 10) == 1)
            return;

        if(!dinoWalking){
            var offset = randRange(20, 100),
                speed = randRange(1000, 2500),
                easing = ['linear', 'swing', 'jswing', 'easeInOutCubic'][randRange(0, 3)],
                dino = $('.img-dino');

            dino.animate({
                left: '+=' + offset
            }, speed, easing, function() {
                var dino_x = dino.css('left');
                if(parseInt(dino_x, 10) > $(window).width()){
                    dino.css('left', '-400');
                }
            });
        }
    }
    setInterval(dinoWalk, 3000);

    /* Animated console. */
    var timeout = 0;
    $.each($('.console'), function(index, item) {
        item = $(item);
        timeout += item.data('delay');

        setTimeout(function() {
            var speed = item.data('speed');
            if(speed === undefined) {
                speed = 80;
            }
            if(speed != 0) {
                item.textEffect({effect: 'jumble', effectSpeed: speed});
            }
            setTimeout(function() {
                item.css({ visibility: 'visible' });
            }, 200);
        }, timeout-200);
    });

    /* Blinking cursor. */
    setInterval(function() {
        $('.caret').toggle();
    }, 800);

    // SNOW PIXELS awyes
    $(document).snowfall({
        image: 'theme/img/snowflake.png',
        minSize: 8,
        maxSize: 30,
        maxSpeed: 1,
        flakeCount: 16
    });
});
