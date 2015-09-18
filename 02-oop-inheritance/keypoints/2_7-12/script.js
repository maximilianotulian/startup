/**
 * Created by MaximilianoDaniel on 17/09/2015.
 */

var inheritPrototype = function (childClass, parentClass){

    var copyOfParent = Object.create(parentClass.prototype);

    //Is necessary to point to the childClass constructor
    copyOfParent.constructor = childClass;
    childClass.prototype = copyOfParent;
};

function augment( receivingClass, givingClass ) {

    // only provide certain methods
    // the index starts at two because the first and second arguments are receivingClass and givingClass
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
            // check to make sure the receiving class doesn't have a method of the same name as the one currently
            // being processed
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
            // Alternatively (check prototype chain as well):
            // if ( !receivingClass.prototype[methodName] ) {
            // receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
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

    function Movie (title, genre, rating, actors) {

        ObserverList.call(this);

        this.title = title || '';
        this.rating = rating || 0;
        this.genre = genre || '';
        this.actors = actors || [];

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

    Movie.prototype.showActors = function () {
        var actorIndex = 0;

        for (actorIndex; actorIndex < this.actors.length ; actorIndex++) {
            console.log('Name: ' + this.actors[actorIndex].name + ' Sexo: ' + this.actors[actorIndex].sexo + ' Alias: ' + this.actors[actorIndex].alias );
        }
    };

    Movie.prototype.addActor = function (actor) {
        this.actors.push(actor);
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
    console.log('Sharing ' + this.title + ' with ' + friendName);
};

Social.prototype.like = function () {
    console.log('I like it');
};

//Exercise 10
augment(Movie, Social, 'share');

//Exercise 11
var Actor = function (name, sexo, alias) {
    this.name = name || '';
    this.sexo = sexo || '';
    this.alias = alias || '';
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

//Create actors and add to the Movie
var danielRadcliffe = new Actor('Daniel Radcliffe', 'Masculine', 'Harry Potter');
var emmaWatson = new Actor('Emma Watson' , 'Female' , 'Hermione Granger');
var ruperGrint = new Actor('Ruper Grint' , 'Masculine' , 'Ronald Weasley');

harryPotter.addActor(danielRadcliffe);
harryPotter.addActor(emmaWatson);
harryPotter.addActor(ruperGrint);

//Play with the console :)
superman.play();
superman.stop();
harryPotter.play();
harryPotter.stop();
ironMan.download();
harryPotter.share('Max');
harryPotter.showActors();