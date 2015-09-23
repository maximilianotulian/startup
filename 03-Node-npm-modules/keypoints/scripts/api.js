/**
 * Created by MaximilianoDaniel on 19/09/2015.
 */
var $ = require('jQuery');
var Movie = require('./movie');
var Director = require('./director');
var alien = new Movie('alien', 'drama', 5);
var ridleyScott = new Director('Ridley Scott');
var onPageReady;

ridleyScott.set('quotes', ['Cast is everything.', 'Do what ...']);
alien.set('director', ridleyScott);
alien.get('director').speak();

onPageReady = function () {
    var $container = $('.content');
    var $article = $('<article>');
    var $p = alien.get('director').speak();

    $article.append($p);
    $container.append($article);
};

$(document).on('ready', onPageReady);