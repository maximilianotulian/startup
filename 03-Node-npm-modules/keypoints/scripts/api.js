/**
 * Created by MaximilianoDaniel on 19/09/2015.
 */
var Movie = require('./movie');
var Director = require('./director');

var alien = new Movie('alien', 'drama', 5);
var ridleyScott = new Director('Ridley Scott');
ridleyScott.set('quotes', ['Cast is everything.', 'Do what ...']);
alien.set('director', ridleyScott);
alien.get('director').speak();