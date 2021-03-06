(function() {
    'use strict';
    var should = require('should');
    require('../js/collection-utils.js');

    describe('isArray', function() {
        it('should correctly identify an array', function() {
            collectionUtils.isArray([1, 2, 3]).should.eql(true);
        });
        it('should correctly identify an empty array', function() {
            collectionUtils.isArray([]).should.eql(true);
        });
        it('should correctly identify a number as not an array', function() {
            collectionUtils.isArray(1).should.eql(false);
        });
        it('should correctly identify a string as not an array', function() {
            collectionUtils.isArray('1').should.eql(false);
        });
        it('should correctly identify a (plain, empty) object as not an array', function() {
            collectionUtils.isArray({}).should.eql(false);
        });
        it('should correctly identify a (plain) object as not an array', function() {
            collectionUtils.isArray({ foo: 1 }).should.eql(false);
        });
    });

    describe('isEmpty', function() {
        it('should return true (i.e. empty) for things that aren\'t objects or arrays', function() {
            collectionUtils.isEmpty(1).should.eql(true);
            collectionUtils.isEmpty(0).should.eql(true);
            collectionUtils.isEmpty('1').should.eql(true);
            collectionUtils.isEmpty('').should.eql(true);
            collectionUtils.isEmpty(true).should.eql(true);
            collectionUtils.isEmpty(false).should.eql(true);
        });
        it('should return false for filled arrays', function() {
            collectionUtils.isEmpty([1,2]).should.eql(false);
            collectionUtils.isEmpty([{},]).should.eql(false);
        });
        it('should return false for filled objects', function() {
            collectionUtils.isEmpty({foo: 'bar'}).should.eql(false);
            collectionUtils.isEmpty({1:2}).should.eql(false);
        });
        it('should return true for empty arrays', function() {
            collectionUtils.isEmpty([]).should.eql(true);
        });
        it('should return true for empty objects', function() {
            collectionUtils.isEmpty({}).should.eql(true);
        });
    });

    describe('forEach', function() {
        it('should callback with value/key/collection correctly for an object', function() {
            var test = {a: 1, b:2},
                expect = [
                    [1, 'a', {a: 1, b:2}],
                    [2, 'b', {a: 1, b:2}]
                ],
                res = [];
            collectionUtils.forEach(test, function () {
                res.push(arguments);
            });

            res.should.have.a.lengthOf(2);
            res[0].should.eql(expect[0]);
            res[1].should.eql(expect[1]);
        });

        it('should callback with value/index/collection pairs correctly for an array', function() {
            var test = [1, 2, 3],
                expect = [
                    [1, 0, [1, 2, 3]],
                    [2, 1, [1, 2, 3]],
                    [3, 2, [1, 2, 3]]
                ],
                res = [];
            collectionUtils.forEach(test, function () {
                res.push(arguments);
            });

            res.should.have.a.lengthOf(3);
            res[0].should.eql(expect[0]);
            res[1].should.eql(expect[1]);
            res[2].should.eql(expect[2]);
        });

        it('should return what it\'s passed (for chaining)', function() {
            collectionUtils.forEach([1,2,3], function(){}).should.eql([1,2,3]);
            collectionUtils.forEach({foo:'bar'}, function(){}).should.eql({foo:'bar'});
        });

        it('should ignore inherited values', function () {
            var a = {a:1, b:2},
                b = Object.create(a),
                res = [];

            b.c = 3;

            collectionUtils.forEach(b, function () {
                res.push(arguments);
            });
            res.should.have.a.lengthOf(1);
            res[0].should.eql([ 3, 'c', {c:3} ]); 

        });
    });

    describe('map', function() {
        it('should return a new object', function() {
            collectionUtils.map({a:1, b:2}, function (val){
                return val + 1;
            }).should.eql({a:2, b:3});
        });

        it('should work with arrays', function() {
            collectionUtils.map([1, 2], function (val){
                return val + 1;
            }).should.eql([2, 3]);
        });
    });

    describe('clone', function() {
        it('should clone the object', function() {
            var test = {a: 1, b:2, c:3},
                res = collectionUtils.clone(test);
            res.should.eql(test);
            res.c = 4;
            res.should.not.eql(test);
        });

        it('deepclone should clone the object recursively', function() {
            var test = {a: 1, b:2, c:{d:3, e:5}},
                res = collectionUtils.clone(test, true);
            res.should.eql(test);
            res.c.d = 4;
            res.should.not.eql(test);
        });

        it('should normally shallow clone the object', function() {
            var test = {a: 1, b:2, c:{d:3, e:5}},
                res = collectionUtils.clone(test);
            res.should.eql(test);
            res.c.d = 4;
            res.should.eql(test);
            res.b = 4;
            res.should.not.eql(test);
        });

        it('should clone arrays shallowly', function() {
            var test = [1,2, [3,2]],
                res = collectionUtils.clone(test);

            res.should.eql(test);
            res[2][1]++;
            res.should.eql(test);
            res[1]++;
            res.should.not.eql(test);
        });

        it('should clone arrays deeply', function() {
            var test = [1,2, [3,2]],
                res = collectionUtils.clone(test, true);

            res.should.eql(test);
            res[2][1]++;
            res.should.not.eql(test);
            res[1]++;
            res.should.not.eql(test);
        });
    });
}());