/**
 * Created by MaximilianoDaniel on 17/09/2015.
 */

var inheritPrototype = function (childClass, parentClass){

    var copyOfParent = Object.create(parentClass.prototype);

    //Is necessary to point to the childClass constructor
    copyOfParent.constructor = childClass;
    childClass.prototype = copyOfParent;
};

//MovieObserver can listen one or more actions like play or stop
var MovieObserver = function (listenTo) {
    this.listenTo = listenTo || [] ;
};

MovieObserver.prototype.play = function (movie) {
    console.log('Playing: ' + movie.title);
};

MovieObserver.prototype.stop = function (movie) {
    console.log('Stopped: ' + movie.title);
};

MovieObserver.prototype.download = function (movie) {
    console.log('Downloading: ' + movie.title);
};

//The observerList can publish the actions in your own list of observer
var ObserverList = function () {
    this.observerList = [];
};

ObserverList.prototype.publish = function (action) {
    var observerIndex = 0;

    for (observerIndex ; observerIndex < this.observerList.length ; observerIndex++) {
        for (var listenToIndex = 0 ; listenToIndex < this.observerList[observerIndex].listenTo.length ; listenToIndex++) {
            if (this.observerList[observerIndex].listenTo[listenToIndex] === action) {
                if (action === 'play') {
                    this.observerList[observerIndex].play(this);
                } else if (action === 'stop') {
                    this.observerList[observerIndex].stop(this);
                } else if (action === 'download') {
                    this.observerList[observerIndex].download(this);
                }
            }
        }
    }
};

ObserverList.prototype.subscribe = function (observer) {
    this.observerList.push(observer);
};

ObserverList.prototype.unsubscribe = function (observer) {
    var observerIndex = 0;

    for (observerIndex ; observerIndex < this.observerList.length ; observerIndex++) {
        if (this.observerList[observerIndex] === observer) {
            this.observerList.slice(observerIndex, 1);
            break;
        }
    }
};

//Exercise 7
var Movie = ( function () {

    function Movie(title, genre, rating) {

        ObserverList.call(this);

        this.title = title || '';
        this.rating = rating || 0;
        this.genre = genre || '';

        console.log('A movie called ' + title + ' was created');
    };

    inheritPrototype(Movie, ObserverList);

    Movie.prototype.get = function (key) {
        return this[key];
    };

    Movie.prototype.play = function () {
        this.publish('play');
    };

    Movie.prototype.set = function (key, value) {
        this[key] = value;
    };

    Movie.prototype.stop = function () {
        this.publish('stop');
    };

    return Movie;

})();

//Exercise 8
var DownloadableMovie = function (title, genre, rating) {
    Movie.call(this, title, genre, rating);
};

inheritPrototype(DownloadableMovie, Movie);

DownloadableMovie.prototype.download = function () {
    this.publish('download');
};

//Exercise 9
var Social = function () {

};


Social.prototype.share = function (friendName) {

};

Social.prototype.like = function () {

};

//Movies to play in the console
var superman = new Movie('superman', 'drama', 4);
var harryPotter = new Movie('harry potter', 'ficcion', 5);
var ironMan = new DownloadableMovie('iron man','suspenso',4);

//MovieObserver to adds in the movie
var movieObs1 = new MovieObserver(['play','stop']);
var movieObs2 = new MovieObserver(['stop']);
var movieObs3 = new MovieObserver(['play','stop','download']);

//Subscribe the movieObservers
superman.subscribe(movieObs1);
harryPotter.subscribe(movieObs2);
ironMan.subscribe(movieObs3);

//Play with the console :)
superman.play();
superman.stop();
harryPotter.play();
harryPotter.stop();
ironMan.download();
