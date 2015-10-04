var React = require('react');
var Input = require('../components/input');
var _ = require('lodash');
var MovieStore = require('../store/movieStore');
var MovieConstants = require('../store/movieConstants');

var MovieCreationView = React.createClass({

    getInitialState: function () {
        return ({
            genre: this.props.params.genre || '',
            rating: this.props.params.rating || '',
            title: this.props.params.title || ''
        })
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
            var selected = MovieStore.getSelected();

            if (selected === null) {
                MovieStore.addMovie(movie);
            } else {
                MovieStore.updateMovie(selected, movie);
                MovieStore.setSelected(null);
            }
            this.cleanFormFields();
        }
    },

    cleanFormFields: function () {
        this.setState(this.getInitialState());
    }
});

module.exports = MovieCreationView;
