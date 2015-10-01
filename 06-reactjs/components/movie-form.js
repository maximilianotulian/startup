var React = require('react');
var Input = require('./input');
var Button = require('./button');
var _ = require('lodash');

var MovieForm = React.createClass({

    propTypes: {
        onMovieSubmit: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            title: '',
            genre: '',
            rating: ''
        };
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
            this.props.onMovieSubmit({title: title, genre: genre, rating: rating});
            this.cleanFormFields();
        }
    },

    cleanFormFields: function () {
        var initialState = this.getInitialState();

        this.setState(initialState);
    }
});

module.exports = MovieForm;