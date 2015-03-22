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
            start: 0,   // hacky way to start the game
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
        game.context.font = '48px serif';
        game.context.textAlign = 'center';

        if ( !game.context || !requestAnimationFrame ) {
            // Exit now and prevent anything else happening
            return;
        }

        game.screen = 0;
        game.platforms = [];

        collectionUtils.forEach(screens, function (platformArray) {
            var screenDef = [];
            collectionUtils.forEach(platformArray, function (pltfm) {
                screenDef.push(platforms.make(
                        pltfm.x,      pltfm.y,
                        pltfm.width,  pltfm.height,
                        game.context, pltfm.colour
                    ));
            });
            game.platforms.push(screenDef);
        });

        game.initialY = game.platforms[0][0].y();
        // game.initialY = 445;

        game.player = graphicsUtils.makeBox(0, game.initialY, 25, 25, game.context, 'rgba(0, 0, 0, 1)');
        game.player.dx = 5;
        game.player.dy = 5;
        game.player.jump = 0;
        game.player.screens = 0;

        addEventListener('keydown', function (event) {
            keysDown[event.keyCode] = true;
        }, false);

        addEventListener('keyup', function (event) {
            delete keysDown[event.keyCode];
        }, false);

        console.log('finished init');
        requestAnimationFrame(render);
    }

    function resetPlayer () {
        game.player.setX(0);
        game.player.setY(game.initialY);
        game.start = false;
        game.player.dead = false;
        game.player.jump = 0;
        game.player.screens = 0;
        game.screen = 0;
    }

    function updatePlayer (dt) {
        // move PC x to right
        // resolve jump
        // after X distance -> new screen
        // game.player.x += game.player.dx;
        var player = game.player;

        // Check if the player's died
        if (player.y() > HEIGHT ) {
            player.dead = true;
        }

        if (game.start > 10) {

            if (player.x() > game.canvas.width) {
                // Character wrap
                game.screen = (game.screen < game.platforms.length - 1) ? game.screen + 1: 0;
                player.setX(0);
                // Next screen start value
                player.setY(game.platforms[game.screen][0].y() - 5);
                player.screens += 1;
            }

            player.jump = (player.jump > 0) ? player.jump - 1: 0;
            player.dy = (player.jump > 0) ? -5: 5;

            player.incX(player.dx);
            player.incY(player.dy);

            collectionUtils.forEach(game.platforms[game.screen], function (pltfm) {
                pltfm.landOnPlatform(player);
                if ( keysDown[32] && player.jump === 0 && player.y2() > pltfm.y()) {
                    player.jump =  21; // how many ticks of 'jump'
                }
            });
        } else if ( !game.start && keysDown[32]) {
            game.start = 0;
        } else {
            game.start += 1;
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
        drawBackground();

        if ( !game.player.dead ) {
            updatePlayer(dt);
            game.player.draw();
        }  else if ( keysDown[32] && game.player.dead ) {
            resetPlayer();
            game.player.draw();
        } else if (game.player.dead) {
            game.context.fillStyle = '#000000';
            game.context.fillText('DEAD!', 250, 250);
            game.context.fillText('Screens survived: '+game.player.screens, 250, 300);
        }

        collectionUtils.forEach(game.platforms[game.screen], function (item) {
            item.draw();
        });
    }

    init();
}());