// LIBS
var React = require('react');
var Router = require('react-router');

// STORES
var MovieStore = require('../store/movieStore');
var MovieConstants = require('../store/movieConstants');

// VIEWS
var MovieTableView = require('../views/movie-table-view');

// COMPONENTS
var RouteHandler = Router.RouteHandler;

var MainView = React.createClass({

    getInitialState: function () {
        return{
            movies: MovieStore.getMovies()
        }
    },

    //Listen for changes
    componentDidMount: function () {
        MovieStore.addEventListener(MovieConstants.CHANGE_EVENT, this.updateMovies);
    },

    //Unbind change listener
    componentWillUnmount: function () {
        MovieStore.removeEventListener(MovieConstants.CHANGE_EVENT, this.updateMovies);
    },

    render: function () {
        return (
            <div className="row">
                <section className="text-center">
                    <h1>Welcome to the amazing world of react</h1>
                </section>
                <div className="row">
                    <MovieTableView movies={this.state.movies} />
                    <RouteHandler />
                </div>
            </div>
        )
    },

    updateMovies: function () {
        this.setState
            ({
                movies: MovieStore.getMovies()
            });
    }
});

module.exports = MainView;

