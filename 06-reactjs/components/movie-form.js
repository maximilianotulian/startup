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
                {this.renderInputs()}
                <input type="submit" value="Add"/>
            </form>
        );
    },

    renderInputs: function () {
        var inputs = [];

        _.each(this.state, function (value, key) {
            inputs.push(<Input {...this.getInputProps(value, key)} />);
        }.bind(this));
        return inputs;
    },

    getFormProps: function () {
        return {
            className: 'movie-form',
            onSubmit: this.handleSubmit
        };
    },

    getInputProps: function (value, key) {
        return {
            defaultValue: '',
            index: key,
            onChange: this.handleInputChange,
            key: key,
            value: value
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