/**
 * Created by MaximilianoDaniel on 21/09/2015.
 */
var MovieApp = angular.module('MovieApp', ['ngRoute']);

MovieApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/index/:movieIndex/action/:action', {
        templateUrl: 'template/abmMovie.html',
        controller: 'MovieAbmCtrl'
        });
}]);

MovieApp.controller('MovieListCtrl', ['$scope', 'Movies', function ($scope, Movies) {
    Movies.clear();
    $scope.movies = Movies.get();
}]);

MovieApp.service('Movies', function ($localStorage) {
    this.movies = [];

    this.init = function () {
        this.movies = [{
            "title": "Harry Potter and the philosopher's stone",
            "genre": "ficcion",
            "rating": 5
        }, {
            "title": "Iron Man",
            "genre": "arte",
            "rating": 4
        }, {
            "title": "Mary Poppins",
            "genre": "ciencia",
            "rating": 3
        }, {
            "title": "Harry Potter and the chamber of secrets",
            "genre": "drama",
            "rating": 2
        }];
        $localStorage.setObject('movies', this.movies);
    };
    this.get = function () {
        if ($localStorage.getObject('movies') !== null) {
            this.movies = $localStorage.getObject('movies');
        } else {
            this.init();
        }
        return this.movies;
    };
    this.push = function (movie) {
        this.movies.push(movie);
        $localStorage.setObject('movies', this.movies);
    };
    this.delete = function (index) {
        this.movies.splice(index, 1);
        $localStorage.setObject('movies', this.movies);
    };
    this.edit = function (index, movie) {
        this.movies[index] = movie;
        $localStorage.setObject('movies', this.movies);
    };
    this.getAtIndex = function (index) {
        return this.movies[index];
    };
    this.clear = function () {
      $localStorage.clear();
    };
});

MovieApp.factory('$localStorage', ['$window', function($window) {
    return {
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || null );
        },
        clear: function() {
            $window.localStorage.clear();
        }
    }
}]);

MovieApp.directive('movieDetails', function () {
    return {
        templateUrl: 'template/movieDetails.html'
    };
});

MovieApp.controller('MovieAbmCtrl', ['$scope', '$routeParams', 'Movies', function ($scope, $routeParams, Movies) {

    this.setMovieScope = function (movie) {
        $scope.title = movie.title;
        $scope.genre = movie.genre;
        $scope.rating = movie.rating;
    };

    $scope.movieIndex = $routeParams.movieIndex;
    $scope.action = $routeParams.action;
    $scope.saveChanges = function () {
        if ($scope.action == 'add') {
            var movie = {

                title: $scope.title,
                genre: $scope.genre,
                rating: $scope.rating
            };
            Movies.push(movie);
        } else if ($scope.action == 'delete') {
            Movies.delete($scope.movieIndex);
        } else if ($scope.action == 'edit') {
            var movie = {

                title: $scope.title,
                genre: $scope.genre,
                rating: $scope.rating
            };
            Movies.edit($scope.movieIndex, movie);
        };
        $scope.title = '';
        $scope.genre = '';
        $scope.rating = '';
    };

    if ($scope.action != 'add') {
        this.setMovieScope(Movies.getAtIndex($scope.movieIndex));
    };
}]);
