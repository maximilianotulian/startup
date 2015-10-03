var React = require('react');
var MovieStore = require('../store/movieStore');
var MovieConstants = require('../store/movieConstants');
var MovieTable = require('../components/movie-table');
var MovieForm = require('../components/movie-form');

var MainView = React.createClass({

    getInitialState: function () {
        return{
            movies: MovieStore.getMovies(),
            selected: MovieStore.getSelected()
        }
    },

    //Listen for changes
    componentDidMount: function () {
        MovieStore.addChangeListener(MovieConstants.CHANGE_EVENT, this.updateMovies);
    },

    //Unbind change listener
    componentWillUnmount: function () {
        MovieStore.removeChangeListener(MovieConstants.CHANGE_EVENT, this.updateMovies);
    },

    render: function () {
        return (
            <div className="row">
                <section className="text-center">
                    <h1>Welcome to the amazing world of react</h1>
                </section>
                <div className="row">
                    <MovieTable movies={this.state.movies} />
                    <MovieForm  index={this.state.selected}/>
                </div>
            </div>
        )
    },

    updateMovies: function () {
        this.setState(
            {
                movies: MovieStore.getMovies(),
                selected: MovieStore.getSelected()
            }
        );
    }
});

module.exports = MainView;

