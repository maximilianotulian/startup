/**
 * Created by MaximilianoDaniel on 15/09/2015.
 */
//Constructor and prototype pattern
var Movie = function (title, genre, rating ) {

    this.genre = genre || '' ;
    this.rating = rating || 0 ;
    this.title = title || '' ;
    console.log('A movie called ' + title + ' was created');
};

Movie.prototype = {
    constructor: Movie,
    get: function (key) {
        return this[key];
    },
    play: function () {
        console.log('Now playing: ' + this.title);
    },
    set: function(key, value) {
        this[key] = value;
    },
    stop: function () {
        console.log('Stopping: ' + this.title);
    }
};

//Movies to play in the console
var superman = new Movie('superman', 'drama', 4);
var harryPotter = new Movie('harry potter', 'ficcion', 5);

superman.play();
superman.stop();
console.log(superman.title + ' ' + superman.genre + ' ' + superman.rating);
console.log(harryPotter);
superman.set('title', 'iron man');
console.log(superman.get('title'));
