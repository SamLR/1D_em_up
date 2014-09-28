/*
 * Useful utility functions for e.g. testing for empty objects etc.
 */

collectionUtils = (function() {
    'use strict';

    function _isEmpty(obj) {
        var key;
        if (obj === null || obj === undefined || typeof obj !== 'object') {
            return true;
        } else if (obj.length > 0) {
            return false;
        } else if (obj.length === 0) {
            return true;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    function _isArray(obj) {
        if ( typeof obj !== 'object' ) {
            return false;
        } else if (obj.hasOwnProperty('length')) {
            return true;
        } 
        return false;
    }

    function _arrayForEach (arr, callback) {
        var i, len = arr.length;
        for (i = 0; i < len; i++) {
            callback(arr[i], i, arr);
        }
        return arr;
    }

    function _objForEach (obj, callback) {
        var key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                callback(obj[key], key, obj);
            }
        }
        return obj;
    }

    function _forEach (obj, callback) {
        if (_isArray(obj)) {
            _arrayForEach(obj, callback);
        } else {
            _objForEach(obj, callback);
        }
        return obj;
    }

    function _map (obj, callback) {
        var res = (_isArray(obj)) ? [] : {};
        _forEach(obj, function (val, key, collection) {
            res[key] = callback(val);
        });
        return res;
    }

    function _clone (obj, deepClone) {
        // Recursively clone objects, copy values
        var deepCloneFunc = function (val) {
                if (typeof val === 'object') {
                    return _clone(val);
                } else {
                    return val;
                }
            },
            // copy values and references to objects
            shallowCloneFunc = function (val) {
                return val;
            };
        
        if (deepClone) {
            return _map(obj, deepCloneFunc);
        } else {
            return _map(obj, shallowCloneFunc);
        }
    }

    return {
        /**
         * Make a copy of the object. If deepClone is specified this is done 
         * recursively (but only with ownProperties).
         * @param  {object} obj         The object to copy
         * @param  {boolean} deepClone  Should the clone be deep
         * @return {object}             The cloned object
         */
        clone: _clone,
        /**
         * Applies the callback function to every value in the object and returns
         * a new object of the results
         * 
         * @param  {object}   obj
         * @param  {Function} callback
         * @return {object}
         */
        map: _map,
        /**
         * Apply the callback to every value:key/index pair in the object/array. 
         * Callback is passed value:key/index:collection. Returns the collection.
         * @param  {object}   obj
         * @param  {function} callback to be applied to each pair
         * @return {object}
         */
        forEach: _forEach,
        /**
         * Tests whether the object is empty (i.e. has no properties of its own).
         * Returns true if something that's not an object is supplied.
         * @param  {object}  obj
         * @return {Boolean}
         */
        isEmpty: _isEmpty,
        /**
         * Is the object an array?
         * @param  {object}  obj
         * @return {Boolean}
         */
        isArray: _isArray
    };
}());