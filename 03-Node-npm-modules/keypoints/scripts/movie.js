/**
 * Created by MaximilianoDaniel on 18/09/2015.
 */

var Director = require('./director');

var Movie = function (title, genre, rating, director ) {

    this.genre = genre || '' ;
    this.rating = rating || 0 ;
    this.title = title || '' ;
    this.director = director || {};
    console.log('A movie called ' + title + ' was created');
};

Movie.prototype.get = function (key) {
    return this[key];
};

Movie.prototype.set = function (key, value) {
    this[key] = value;
};

module.exports = Movie;


