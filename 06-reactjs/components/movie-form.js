var React = require('react');

var MovieForm = React.createClass({

    propTypes: {
        onMovieSubmit: React.PropTypes.func
    },

    render: function () {
        return (
            <form {...this.getFormProps()}>
                <input type="text" placeholder="Title" ref="title"/>
                <input type="text" placeholder="Genre" ref="genre"/>
                <input type="number" placeholder="Rating" ref="rating"/>
                <input type="submit" value="Post" />
            </form>
        );
    },

    getFormProps: function () {
      return {
          className: 'movie-form',
          onSubmit: this.handleSubmit
      };
    },

    /**
     * Clean the form fields when the form is submitted with valid input
     * @param event
     */
    handleSubmit: function (event) {
        event.preventDefault();
        var title = React.findDOMNode(this.refs.title).value.trim();
        var genre = React.findDOMNode(this.refs.genre).value.trim();
        var rating = React.findDOMNode(this.refs.rating).value.trim();

        if (!title || !genre || !rating) {
            return;
        }
        this.props.onMovieSubmit({title: title, genre: genre, rating: rating});
        this.cleanFormFields();
    },

    cleanFormFields: function () {
        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.genre).value = '';
        React.findDOMNode(this.refs.rating).value = '';
    }

});

module.exports = MovieForm;