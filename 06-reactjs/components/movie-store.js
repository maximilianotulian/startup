var React = require('react');
var MovieTable = require('./movie-table');
var MovieForm = require('./movie-form');
var ReactRouter = require('react-router');

var MovieStore = React.createClass({

    getInitialState: function () {
        return {
            data:[
                {
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
                }
            ]
        };
    },

    render: function () {
        return (
            <div className="row">
                <section className="text-center">
                    <h1>Welcome to the amazing world of react</h1>
                </section>
                <div className="row">
                    <MovieTable data={this.state.data} onButtonClick={this.handleButtonClick}/>
                    <MovieForm onMovieSubmit={this.handleMovieSubmit} />
                </div>
            </div>
        );
    },

    handleButtonClick: function (movie, action) {
        if (action) {
            if (action === 'delete') {
                this.deleteMovie(movie);
            } else if (action === 'edit') {

            }
        }
    },

    handleMovieSubmit: function (movie) {
        var movies = this.state.data;
        var newMovies = movies.concat([movie]);
        this.setState({data: newMovies});
    },

    deleteMovie: function (movie) {
        var indexData = 0;
        var newMovies = this.state.data;
        for (indexData ; indexData < this.state.data.length ; indexData += 1) {
            if (this.state.data[indexData] === movie) {
                newMovies.splice(indexData, 1);
                this.setState({data: newMovies});
                return
            }
        }
    }
});

module.exports = MovieStore;

