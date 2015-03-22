/*
 * Returns the definitions for the different screens
 */

screens = (function () {
    'use strict';

    return [[
            {x:0,   y:480, width: 125, height: 20, colour: 'rgba(255, 153, 42, 1.0)'}, // 100
            {x:175, y:470, width: 125, height: 30, colour: 'rgba(255, 153, 42, 1.0)'}, // 250
            {x:350, y:470, width: 150, height: 30, colour: 'rgba(255, 153, 42, 1.0)'}, // 400
        ],[
            {x:0,   y:495, width: 50,  height: 5,  colour: 'rgba(255, 66, 46,  1.0)'}, // 50 
            {x:100, y:485, width: 150, height: 15, colour: 'rgba(255, 66, 46,  1.0)'}, // 225
            {x:300, y:475, width: 75,  height: 25, colour: 'rgba(255, 66, 46,  1.0)'}, // 325
            {x:420, y:465, width: 150, height: 35, colour: 'rgba(255, 66, 46,  1.0)'}, // 325
        ],[
            {x:0,   y:475, width: 125, height: 25, colour: 'rgba(255, 86, 164, 1.0)'}, // 150
            {x:200, y:485, width: 150, height: 15, colour: 'rgba(255, 86, 164, 1.0)'}, // 350
            {x:425, y:495, width: 75,  height: 5,  colour: 'rgba(255, 86, 164, 1.0)'}, // 325
        ],[/////
            {x:0,   y:480, width: 125, height: 20, colour: 'rgba(255, 226, 65, 1.0)'}, // 150
            {x:70,  y:440, width: 325, height: 5,  colour: 'rgba(255, 226, 65, 1.0)'}, // 150
            {x:185, y:495, width: 115, height: 5,  colour: 'rgba(255, 226, 65, 1.0)'}, // 350
            {x:425, y:495, width: 75,  height: 5,  colour: 'rgba(255, 226, 65, 1.0)'}, // 325
            {x:435, y:445, width: 65,  height: 5,  colour: 'rgba(255, 226, 65, 1.0)'}, // 325
        ],[
            {x:0,   y:495, width: 125, height: 5,  colour: 'rgba(9, 255, 213, 1.0)'}, // 150
            {x:150, y:455, width: 125, height: 15, colour: 'rgba(9, 255, 213, 1.0)'}, // 350
            {x:300, y:400, width: 75,  height: 5,  colour: 'rgba(9, 255, 213, 1.0)'}, // 325
            {x:400, y:495, width: 50,  height: 5,  colour: 'rgba(9, 255, 213, 1.0)'}, // 325
        ],[
            {x:0,   y:495, width: 75,  height: 5,  colour: 'rgba(66, 255, 72, 1.0)'}, // 150
            {x:100, y:495, width: 75,  height: 5,  colour: 'rgba(66, 255, 72, 1.0)'}, // 350
            {x:200, y:495, width: 75 , height: 5,  colour: 'rgba(66, 255, 72, 1.0)'}, // 325
            {x:300, y:495, width: 75 , height: 5,  colour: 'rgba(66, 255, 72, 1.0)'}, // 325
            {x:400, y:495, width: 75 , height: 5,  colour: 'rgba(66, 255, 72, 1.0)'}, // 325
        ]];
})();