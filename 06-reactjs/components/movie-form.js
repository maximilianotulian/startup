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
            rating: '',
        };
    },

    render: function () {
        return (
            <form {...this.getFormProps()}>
                {this.renderInputs()}
                <input type="submit" value="Post" />
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
            key: key,
            index: key,
            value: value,
            onChange: this.handleInputChange
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

        if (!title || !genre || !rating) {
            return;
        }
        this.props.onMovieSubmit({title: title, genre: genre, rating: rating});
        this.cleanFormFields();
    },

    cleanFormFields: function () {
        this.setState({
            title: '',
            genre: '',
            rating: ''
        });
    }
});

module.exports = MovieForm;