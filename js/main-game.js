/*
 * 1D 'em up
 *             
 * Created by Sam Cook (sam@samlr.com)
 * Licensed under MIT
 *
 * Main game loop logic based on Matt Hackett's tutorial 
 * found here: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
 * 
 */

(function() {
    // Various versions of the request frame function
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
        // 'global' object
        game = {
            canvas: null,
            context: null,
            then: null,
            background: null,
            player: null
        },
        lastTime = null;

    function init () {
        // background
        // character
        // attributes
        // TODO: look at loading config info etc.
        game.canvas = document.getElementById('game-block');
        game.context = game.canvas.getContext('2d');

        if ( !game.context || !requestAnimationFrame ) {
            // Exit now and prevent anything else happening
            return;
        }

        game.player = {
            x: 0,
            y: 450,
            width: 50,
            height: 50,
            draw: function() {
                game.context.fillStyle = 'rgba(0, 0, 0, 1)';
                game.context.fillRect(this.x,
                                      this.y,
                                      this.width,
                                      this.height);
                game.context.restore();
            }
        };
        console.log('finished init');
        requestAnimationFrame(render);
    }

    function update (dt) {
        // move PC x to right
        // resolve jump
        // after X distance -> new screen
        game.player.x  += 5;

        if (game.player.x > game.canvas.width) {
            game.player.x = 0;
        }
    }


    function drawBackground () {
        game.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        game.context.fillRect(50, 50, 250, 250);

        game.context.fillStyle = 'rgba(0, 0, 255, 0.5)';
        game.context.fillRect(150, 150, 500, 500);

        game.context.save();
    }

    // named function for recursive calls...
    function render() {
        // Draw background (sliding screen?)
        // Draw character
        // Draw obstacles? (or fixed levels)

        var dt = 0, now = 0;
        // Get the next frame
        requestAnimationFrame(render);
        // Calculate the time delta for update
        now = new Date().getTime();
        dt = now - (lastTime || now);
        lastTime = now;

        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        update(dt);
        drawBackground();
        game.player.draw();
    }

    init();
}());