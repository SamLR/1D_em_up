/*
 * Useful utility functions for e.g. testing for empty objects etc.
 */

utils = (function() {
    'use strict';

    function _arrayForEach (obj, callback) {
        
    }

    return {
        forEach: function(obj, callback) {
            var prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    
                }
            }
        },
        /**
         * Tests whether the object is empty (i.e. has no properties of its own)
         * @param  {object}  obj
         * @return {Boolean}
         */
        isEmpty: function(obj) {
            var prop;
            if (obj === null || obj === undefined) {
                return true;
            } else if (obj.length > 0) {
                return false;
            } else if (obj.length === 0) {
                return true;
            }

            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        },
        /**
         * Is the object an array?
         * @param  {object}  obj
         * @return {Boolean}
         */
        isArray: function(obj) {
            if ( typeof obj !== 'object' ) {
                return false;
            } else if (obj.hasOwnProperty('length')) {
                return true;
            } 
            return false;
        }
    };
}());