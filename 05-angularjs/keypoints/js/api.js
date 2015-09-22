/**
 * Created by MaximilianoDaniel on 21/09/2015.
 */
var MovieApp = angular.module('MovieApp', []);

MovieApp.controller('MovieListCtrl', ['$scope', 'Movies', function ($scope, Movies) {
    $scope.movies = Movies.get();
}]);

MovieApp.service('Movies', function () {
    this.get = function () {
        var movies = {};
        if (window.localStorage['movies']) {
            this.movies = JSON.parse(window.localStorage['movies']);
        } else {
            this.movies = [{
                "title": "Harry Potter and the philosopher's stone",
                "genre": "ficcion",
                "rating": 5
            }, {
                "title": "Iron Man",
                "genre": "ficcion",
                "rating": 5
            }, {
                "title": "Mary Poppins",
                "genre": "comedia",
                "rating": 5
            }, {
                "title": "Harry Potter and the chamber of secrets",
                "genre": "drama",
                "rating": 5
            }];
            window.localStorage['movies'] = JSON.stringify(movies);
        }
        return this.movies;
    };
});

MovieApp.directive('movieDetails', function (){
    return {
        templateUrl: 'template/movieDetails.html'
    };
});

MovieApp.directive('MovieAbmCtrl', ['$scope', function ($scope) {

}]);