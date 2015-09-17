/**
 * Created by MaximilianoDaniel on 15/09/2015.
 */
var inheritPrototype = function (child, parent){

    var copyOfParent = Object.create(parent.prototype);

    //Is necessary to point to the childObject constructor
    copyOfParent = child;
    child.prototype = copyOfParent;
};

//MovieObserver can listen to some action Like play or stop
var MovieObserver = function(listenTo) {
    this.listenTo = listenTo || [] ;
};

MovieObserver.prototype.play = function (movie) {
    console.log('Playing: ' + movie.title);
};

MovieObserver.prototype.stop = function (movie) {
    console.log('Stopped: ' + movie.title);
};

var ObserverList = function () {
  this.observerList = [];
};

ObserverList.prototype.suscribe = function suscribe(observer) {
    this.observerList.push(observer);
};

ObserverList.prototype.unsuscribe = function (observer) {
    var i = 0;
    while( i < this.observerList.length ){
        if( this.observerList[i] === observer ){
            this.observerList.slice(i,1);
            break; }
        i++;
    }
    return -1;
};

ObserverList.prototype.get = function (index) {
    if ( index > -1 && index < this.observerList.length) {
        return this.observerList[index];}
};

ObserverList.prototype.publish = function (action) {
    var index = 0;

    for(index; this.observerList.length ; index++) {
        if( this.observerList[index].listenTo === action ) {
            switch( action ){
                case 'play ' :
                {   this.observerList[index].play(this);
                    break;}
                case 'stop' : {
                    this.observerList[index].stop(this);
                    break; }
            }}}
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

var movieObs1 = new MovieObserver('play');
var movieObs2 = new MovieObserver('stop');

superman.suscribe(movieObs1);
harryPotter.suscribe(movieObs2);


