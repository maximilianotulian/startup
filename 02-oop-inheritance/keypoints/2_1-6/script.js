/**
 * Created by MaximilianoDaniel on 15/09/2015.
 * Exercises done
 * 1- Create a Movie object
 * 2- Instantiate some of your favorite movies and play with them in the console.
 * 3- Add a MovieObserver class that listen for "playing" and "sttoped" events
 * 4- Publish "playing" event on Movie.play()
 * 5- Publish "stopped" event on Movie.stop()
 * 6- Log to console when each event is fired
 * */

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

//The observerList can publish the actions in your own list of observer
var ObserverList = function () {
  this.observerList = [];
};

ObserverList.prototype.subscribe = function (observer) {
    this.observerList.push(observer);
};

ObserverList.prototype.unsubscribe = function (observer) {
    var i = 0;

    for( i ; i < this.observerList.length ; i++ ){
        if( this.observerList[i] === observer ){
            this.observerList.slice(i,1);
            break;
        }
    }
};

ObserverList.prototype.publish = function (action) {
    var index = 0;

    for( index ; index < this.observerList.length ; index++ ) {
        for( var j = 0 ; j < this.observerList[index].listenTo.length ; j++ ) {
            if( this.observerList[index].listenTo[j] === action ) {
                    if ( action === 'play' ) {
                        this.observerList[index].play(this);
                    } else if (action === 'stop') {
                        this.observerList[index].stop(this);
                    }
            }
        }
    }
};


//Constructor and prototype pattern
var Movie = function (title, genre, rating ) {

    ObserverList.call(this);

    this.genre = genre || '' ;
    this.rating = rating || 0 ;
    this.title = title || '' ;

    console.log('A movie called ' + title + ' was created');
};

inheritPrototype(Movie, ObserverList);

Movie.prototype.get = function (key) {
    return this[key];
};

Movie.prototype.play = function () {
    this.publish('play');
};

Movie.prototype.set = function(key, value) {
    this[key] = value;
};

Movie.prototype.stop = function () {
    this.publish('stop');
};


//Movies to play in the console
var superman = new Movie('superman', 'drama', 4);
var harryPotter = new Movie('harry potter', 'ficcion', 5);

//MovieObserver to adds in the movie
var movieObs1 = new MovieObserver(['play','stop']);
var movieObs2 = new MovieObserver(['stop']);

//Subscribe the movieObservers
superman.subscribe(movieObs1);
harryPotter.subscribe(movieObs2);

//Play with the console :)
superman.play();
superman.stop();
harryPotter.play();
harryPotter.stop();

