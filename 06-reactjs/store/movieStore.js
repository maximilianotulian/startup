var EventEmitter = require('events').EventEmitter;
var MovieConstants = require('./movieConstants');
var _ = require('lodash');
var inherits = require('inherits');

var MovieStore = function () {
    this.state = this.getInitialState();
};

inherits(MovieStore, EventEmitter);

MovieStore.prototype.getInitialState = function () {
    return {
        movies: [{
            'title': 'Harry Potter and the philosopher\'s stone',
            'genre': 'ficcion',
            'rating': '5'
        }, {
        'title': 'Iron Man',
            'genre': 'arte',
            'rating': '4'
        }, {
        'title': 'Mary Poppins',
            'genre': 'ciencia',
            'rating': '3'
        }, {
        'title': 'Harry Potter and the chamber of secrets',
            'genre': 'drama',
            'rating': '2'
        }],
        selected: null
    };
};
MovieStore.prototype.getMovie = function (index) {
    return this.state.movies[index];
};
MovieStore.prototype.getSelected = function () {
    return this.state.selected;
};
MovieStore.prototype.getMovies = function () {
    return this.state.movies;
};
MovieStore.prototype.addMovie = function (movie) {
    this.setState({movies: this.state.movies.concat(movie)});
};
MovieStore.prototype.updateMovie = function (index, movie) {
    var newMovies = this.state.movies;

    newMovies[index] = movie;
    this.setState({movies: newMovies})
};
MovieStore.prototype.removeMovie = function (index) {
    var newMovies = this.state.movies;

    newMovies.splice(index, 1);
    this.setState({movies: newMovies});
};
MovieStore.prototype.setSelected = function (index) {
    this.setState({selected: index});
};
MovieStore.prototype.setState = function (newState, callback) {
    _.extend(this.state, newState);

    this.emit(MovieConstants.CHANGE_EVENT);
    if (callback) {
        callback();
    }
};
MovieStore.prototype.addChangeListener = function (action, callback) {
    this.on(action, callback);
};
MovieStore.prototype.removeChangeListener = function (action, callback) {
    this.removeListener(action, callback);
};

module.exports = new MovieStore();


