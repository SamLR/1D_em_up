/*
 * General 'graphics' utilities. Mostly the 'makebox' function.
 */
graphicsUtils = (function() {
    var _makeBox = function(x, y, width, height, context, colour) {
        var x2 = x + width,
            y2 = y + height;
        return {
            x: function() { return x; },
            y: function() { return y; },
            x2: function() { return x2; },
            y2: function() { return y2; },
            width: function() { return width; },
            height: function() { return height; },
            setX: function(_x) {
                x = _x;
                x2 = _x + width;
            },
            setY: function(_y) {
                y = _y;
                y2 = _y + height;
            },
            setX2: function(_x2) {this.setX(_x2 - width);},
            setY2: function(_y2) {this.setY(_y2 - height);},
            incX: function(_dx) {this.setX(x + _dx);},
            incY: function(_dy) {this.setY(y + _dy);},
            draw: function() {
                context.fillStyle = colour;
                context.fillRect(
                    this.x(),
                    this.y(),
                    this.width(),
                    this.height());
                context.restore();
            },
            isCompletelyIn: function(other) {
                // This is wholly within other
                return (other.x() < this.x()) && (this.x2() < other.x2()) &&
                       (other.y() < this.y()) && (this.y2() < other.y2());
            },
            isPartiallyIn: function(other) {
                // There is some over lap between this & other
                var xInBounds = other.x() < this.x() && this.x() < other.x2(),
                    yInBounds = other.y() < this.y() && this.y() < other.y2(),
                    x2InBounds = other.x() < this.x2() && this.x2() < other.x2(),
                    y2InBounds = other.y() < this.y2() && this.y2() < other.y2(),
                    skipInverse = arguments.length > 1;

                return xInBounds && yInBounds   ||
                       xInBounds && y2InBounds  ||
                       x2InBounds && yInBounds  ||
                       x2InBounds && y2InBounds ||
                       !skipInverse && other.isPartiallyIn(this, true); // Check special case
            }
        };
    };

    return {
        makeBox: _makeBox
    };
}());