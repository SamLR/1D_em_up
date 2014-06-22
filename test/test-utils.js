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

    describe('isEmpty', function() {
        it('should return true (i.e. empty) for things that aren\'t objects or arrays', function() {
            utils.isEmpty(1).should.eql(true);
            utils.isEmpty(0).should.eql(true);
            utils.isEmpty('1').should.eql(true);
            utils.isEmpty('').should.eql(true);
            utils.isEmpty(true).should.eql(true);
            utils.isEmpty(false).should.eql(true);
        });
        it('should return false for filled arrays', function() {
            utils.isEmpty([1,2]).should.eql(false);
            utils.isEmpty([{},]).should.eql(false);
        });
        it('should return false for filled objects', function() {
            utils.isEmpty({foo: 'bar'}).should.eql(false);
            utils.isEmpty({1:2}).should.eql(false);
        });
        it('should return true for empty arrays', function() {
            utils.isEmpty([]).should.eql(true);
        });
        it('should return true for empty objects', function() {
            utils.isEmpty({}).should.eql(true);
        });
    });
}());