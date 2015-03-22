# 1D 'em Up #
A simple game of hitting one button

## Aim ##
Survive as long as possible

## Concept ##
Each screen/level has different jump attributes: function, gravity direction & gravity strength.

Initially use fixed design levels but ultimately introduce some degree of randomness

### Function ideas ###
 * modulo
 * square
 * exponential/logarithmic (clipped)
 * double jump
 * Jump and hold
 * flappy
 * gravity invert
 * grow?
 * Steady rise then instant drop

### Gravity ###
 * up down left right
 * strong medium weak
 * variable (e.g. banding, non-standard)

### Misc ###
 * bouncy levels
 * freeze levels (on landing you're stuck for X seconds)
 * ?

### DONE ###
* Very basic death seems to now work
* Remove infinite jump (if jump triggered in pit) 
    - Fixed but jump needs generalising
* Start/reset is now triggered with space

### TODO ###
* Make start/reset not suck monkey bollocks
* Generalise checking of platform
* Alternate screens
* import method for screens
* platform below player shouldn't need searching for
