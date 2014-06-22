/* global util */
(function() {
    'use strict';
    var should = require('should');
    require('../js/utils.js');

    describe('isArray', function() {
        it('should correctly identify an array', function() {
            utils.isArray([1, 2, 3]).should.eql(true);
        });
        it('should correctly identify an empty array', function() {
            utils.isArray([]).should.eql(true);
        });
        it('should correctly identify a number as not an array', function() {
            utils.isArray(1).should.eql(false);
        });
        it('should correctly identify a string as not an array', function() {
            utils.isArray('1').should.eql(false);
        });
        it('should correctly identify a (plain, empty) object as not an array', function() {
            utils.isArray({}).should.eql(false);
        });
        it('should correctly identify a (plain) object as not an array', function() {
            utils.isArray({ foo: 1 }).should.eql(false);
        });
    });
}());