var React = require('react');
var Input = require('./input');
var _ = require('lodash');
var MovieStore = require('../store/movieStore');
var MovieConstants = require('../store/movieConstants');

var MovieForm = React.createClass({

    propTypes: {
        selected: React.PropTypes.oneOfType([
            React.PropTypes.string.isRequired,
            React.PropTypes.number.isRequired
        ])
    },

    getInitialState: function () {
        return this.getState();
    },

    render: function () {
        return (
            <form {...this.getFormProps()}>
                <Input {...this.getInputProps('title')} />
                <Input {...this.getInputProps('genre')} />
                <Input {...this.getInputProps('rating')} />
                <input type="submit" value="Add"/>
            </form>
        );
    },

    getInputProps: function (attr) {
        return {
            index: attr,
            onChange: this.handleInputChange,
            value: this.state[attr]
        };
    },

    getFormProps: function () {
        return {
            className: 'movie-form',
            onSubmit: this.handleSubmit
        };
    },

    getState: function () {
        var title = '';
        var genre= '';
        var rating= '';
        if (this.props.index !== null) {
            console.log('index distinto de null');
            var movie = MovieStore.getMovieAt(this.props.index);
            title = movie.title;
            genre = movie.genre;
            rating = movie.rating
        }
        return {
            title: title,
            genre: genre,
            rating: rating
        }
    },

    handleInputChange: function (event, index) {
        var newState = {};

        newState[index] = event.target.value;
        this.setState(newState);
    },

     /**
     * Clean the form fields when the form is submitted with valid input
     * @param event
     */
    handleSubmit: function (event) {
        var title = this.state.title;
        var genre = this.state.genre;
        var rating = this.state.rating;
        event.preventDefault();

        if (title && genre && rating) {
            var movie = {title: title, genre: genre, rating: rating};
            console.log(MovieStore.getMovies());

            if (this.props.index === null) {
                MovieStore.addMovie(movie);
            } else {
                console.log('update');
                MovieStore.updateMovie(this.props.index, movie);
                MovieStore.setSelected(null);
            }
            this.cleanFormFields();
        }
    },

    cleanFormFields: function () {
        this.setState(this.getInitialState());
    }
});

module.exports = MovieForm;
