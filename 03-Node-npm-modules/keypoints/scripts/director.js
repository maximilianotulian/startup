/**
 * Created by MaximilianoDaniel on 18/09/2015.
 */

var Director = function (name, quotes) {

    this.name = name || '';
    this.quotes = quotes || [];
    console.log('A director called ' + name + ' was created');
};

Director.prototype.speak = function () {
    var message = this.name + ' says : ';

    for (var quoteIndex = 0 ; quoteIndex < this.quotes.length ; quoteIndex++){
        message += this.quotes[quoteIndex];
        message += ' ';
    }
    console.log(message);
};

Director.prototype.get = function (key) {
    return this[key];
};

Director.prototype.set = function (key, value) {
    this[key] = value;
};

module.exports = Director;