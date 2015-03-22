(function() {
    'use strict';
    var should = require('should');
    require('../js/graphics-utils.js');

    describe('makeBox', function() {
        var a = graphicsUtils.makeBox(0, 0, 10, 10);

        it('Should return something with position, width and height', function() {
            a.should.have.properties('x', 'y', 'x2', 'y2', 'width', 'height');
            a.x.should.be.a.Function;
            a.x2.should.be.a.Function;
            a.y.should.be.a.Function;
            a.y2.should.be.a.Function;
            a.width.should.be.a.Function;
            a.height.should.be.a.Function;
        });

        it('Should have setters for x & y', function() {
            a.should.have.properties('setX', 'setY');
            a.setX.should.be.a.Function;
            a.setY.should.be.a.Function;
        });

        it('Should have a "isCompletelyIn" function', function() {
            a.should.have.property('isCompletelyIn');
            a.isCompletelyIn.should.be.a.Function;
        });

        it('Should have a "isPartiallyIn" function', function() {
            a.should.have.property('isPartiallyIn');
            a.isPartiallyIn.should.be.a.Function;
        });

        it('Should have a "draw" function', function() {
            a.should.have.property('draw');
            a.draw.should.be.a.Function;
        });
    });

    describe('Basic setters/getters', function() {
        var x = 1,
            y = 2,
            width = 10,
            height = 20,
            a;
        beforeEach(function() {
            a = graphicsUtils.makeBox(x, y, width, height);
        });

        describe('x, y, width, height', function() {
            it('x, should return the x position', function() {
                a.x().should.equal(x);
            });
            it('y, should return the y position', function() {
                a.y().should.equal(y);
            });
            it('width, should return the width', function() {
                a.width().should.equal(width);
            });
            it('height, should return the height', function() {
                a.height().should.equal(height);
            });
        });

        describe('x2, y2', function() {
            it('x2() should return x + width',function() {
                a.x2().should.equal(x+width);
            });
            it('y2() should return y + height',function() {
                a.y2().should.equal(y+height);
            });
        });

        describe('Setters', function() {
            it('setX should update x and x2',function() {
                var newX = 100;
                a.x().should.equal(x);
                a.setX(newX);
                a.x().should.equal(newX);
                a.x2().should.equal(newX+width);
                a.width().should.equal(width);
                // Nothing else should change
                a.y().should.equal(y);
                a.y2().should.equal(y+height);
                a.height().should.equal(height);
            });
            it('setY should update y and y2',function() {
                var newY = 100;
                a.y().should.equal(y);
                a.setY(newY);
                a.y().should.equal(newY);
                a.y2().should.equal(newY+height);
                a.height().should.equal(height);
                // Nothing else should change
                a.x().should.equal(x);
                a.x2().should.equal(x+width);
                a.width().should.equal(width);
            });
        });

    });

    describe('isCompletelyIn', function() {
        var a = graphicsUtils.makeBox( 0,  0, 100, 100),
            b = graphicsUtils.makeBox(45, 45,  10,  10),
            c = graphicsUtils.makeBox( 0,  0,  10,  10),
            d = graphicsUtils.makeBox( 5,  5,  10,  10);

        it('it should return true for a trivial case', function() {
            b.isCompletelyIn(a).should.be.true;
        });

        it('it should return false for a trivial case', function() {
            c.isCompletelyIn(b).should.be.false;
        });

        it('it should return false for being parent surrounding a child', function() {
            a.isCompletelyIn(b).should.be.false;
        });

        it('it should return false for an overlap', function() {
            d.isCompletelyIn(c).should.be.false;
        });
    });

    describe('isPartiallyIn', function() {
        var a = graphicsUtils.makeBox( 0,  0, 100, 100),
            b = graphicsUtils.makeBox(45, 45,  10,  10),
            c = graphicsUtils.makeBox( 0,  0,  10,  10),
            d = graphicsUtils.makeBox( 5,  5,  10,  10);

        it('it should return correctly for trivial cases', function() {
            b.isPartiallyIn(a).should.be.true;
        });

        it('it should return false for a trivial case', function() {
            c.isPartiallyIn(b).should.be.false;
        });

        it('it should return false for being parent surrounding a child', function() {
            a.isPartiallyIn(b).should.be.true;
        });

        it('it should return true for an overlap', function() {
            d.isPartiallyIn(c).should.be.true;
        });
    });
}());