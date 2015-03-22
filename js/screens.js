/*
 * Returns the definitions for the different screens
 */

screens = (function () {
    'use strict';

    return [[
            {x:0,   y:480, width: 100, height: 20, colour: 'rgba(255, 153, 42, 1.0)'}, // 100
            {x:150, y:470, width: 100, height: 30, colour: 'rgba(255, 153, 42, 1.0)'}, // 250
            {x:300, y:470, width: 100, height: 30, colour: 'rgba(255, 153, 42, 1.0)'}, // 400
        ],[
            {x:0,   y:495, width: 50,  height: 5,  colour: 'rgba(255, 66, 46,  1.0)'}, // 50 
            {x:75 , y:485, width: 150, height: 15, colour: 'rgba(255, 66, 46,  1.0)'}, // 225
            {x:250, y:475, width: 75,  height: 25, colour: 'rgba(255, 66, 46,  1.0)'}, // 325
            {x:350, y:465, width: 150, height: 35, colour: 'rgba(255, 66, 46,  1.0)'}, // 325
        ],[
            {x:0,   y:475, width: 150, height: 25, colour: 'rgba(255, 86, 164, 1.0)'}, // 150
            {x:200, y:485, width: 150, height: 15, colour: 'rgba(255, 86, 164, 1.0)'}, // 350
            {x:400, y:495, width: 100, height: 5,  colour: 'rgba(255, 86, 164, 1.0)'}, // 325
        ]];
})();