(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by MaximilianoDaniel on 18/09/2015.
 */

var Director = function (name) {

    this.name = name || '';
    console.log('A director called ' + name + ' was created');
};

module.exports = Director;
},{}],2:[function(require,module,exports){
/**
 * Created by MaximilianoDaniel on 18/09/2015.
 */

var Director = require('./director');

var Movie = function (title, genre, rating ) {

    this.genre = genre || '' ;
    this.rating = rating || 0 ;
    this.title = title || '' ;

    console.log('A movie called ' + title + ' was created');
};

Movie.prototype.get = function (key) {
    return this[key];
};

Movie.prototype.set = function(key, value) {
    this[key] = value;
};

module.exports = Movie;
},{"./director":1}]},{},[2]);
