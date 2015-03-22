/*
 * Functions to make platforms
 */

platforms = (function() {
    return {
        make: function(x, y, width, height, context, colour, landOnPlatform) {
            var res = graphicsUtils.makeBox(x, y, width, height, context, colour);

            res.landOnPlatform = function (player) {
                var xdiff, x2diff, x, y;
                if ( !player.isPartiallyIn(this) ) {
                    return;
                }

                x = player.getCentre().x;

                if (this.x() < x && x < this.x2() &&
                    (player.y2() + 5) > this.y()) {

                    // clip to top of the platform
                    player.jump = 0;
                    player.setY2(this.y() - 1);
                    return;
                }

                y = player.getCentre().y;
                if (y < this.y()) { // if we're suitably far into the block
                    return;
                }

                xdiff = this.x() - player.x2();
                x2diff = this.x2() - player.x();

                if (xdiff < x2diff) {
                    player.setX2(this.x()); // clip to the left side
                } else {
                    player.setX(this.x2());
                }

            };
            return res;
        }
    };
})();