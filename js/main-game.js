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
        lastTime = null,
        keysDown = {},
        HEIGHT = 500,
        WIDTH = 500;

    function init () {
        // background
        // character
        // attributes
        // TODO: look at loading config info etc.
        game.canvas = document.getElementById('game-block');
        game.canvas.height = HEIGHT;
        game.canvas.width = WIDTH;
        game.context = game.canvas.getContext('2d');

        if ( !game.context || !requestAnimationFrame ) {
            // Exit now and prevent anything else happening
            return;
        }

        game.player = graphicsUtils.makeBox(0, 450, 50, 50, game.context, 'rgba(0, 0, 0, 1)');
        game.player.dx = 5;
        game.player.dy = 5;
        game.player.jump = false;

        game.platforms = [
            platforms.make(0,   495, 100, 5,  game.context, 'rgba(0, 0, 0, 1)'),
            platforms.make(250, 480, 50,  20, game.context, 'rgba(0, 0, 0, 1)'),
            platforms.make(450, 485, 50,  15, game.context, 'rgba(0, 0, 0, 1)')
        ];

        addEventListener('keydown', function (event) {
            keysDown[event.keyCode] = true;
        }, false);

        addEventListener('keyup', function (event) {
            delete keysDown[event.keyCode];
        }, false);

        console.log('finished init');
        requestAnimationFrame(render);
    }

    function updatePlayer (dt) {
        // move PC x to right
        // resolve jump
        // after X distance -> new screen
        // game.player.x += game.player.dx;
        var player = game.player;
        player.incX(player.dx);

        // Character wrap
        if (player.x() > game.canvas.width) {
            player.setX(0);
        }

        // Jump implementation
        if ( keysDown[32] && !player.jump ) {
            // Jump has been pressed
            player.dy = -5;
            player.jump = true;
        } else if ( player.y() < 300 ) {
            // Max jump height reached
            player.dy = 5;
        }
        player.incY(player.dy);

        collectionUtils.forEach(game.platforms, function(pltfm) {
            pltfm.landOnPlatform(player);
        });

        // Check if the player's died
        if (player.y2() > HEIGHT ) {
            // Set character to ground
            player.jump = false;
            player.dead = true;
            console.log('DEAD!');

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
        updatePlayer(dt);
        drawBackground();
        game.player.draw();
        collectionUtils.forEach(game.platforms, function (item) {
            item.draw();
        });
    }

    init();
}());