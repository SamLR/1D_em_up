platforms = (function() {
    // NB. This module must be initialised
    return {
        make: function(x, y, width, height, context, colour, landOnPlatform) {
            var res = graphicsUtils.makeBox(x, y, width, height, context, colour);
            res.landOnPlatform = landOnPlatform || function (player) {
                var x = player.x();
                if (res.x() < x && x < res.x2() && player.y2() > res.y()) {
                    player.jump = false;
                    player.setY2(res.y());
                }
            };
            return res;
        }
    };
})();