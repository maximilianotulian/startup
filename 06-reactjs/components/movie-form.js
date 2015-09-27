var React = require('react');

var MovieForm = React.createClass({
    /*That clears the form fields when the form is submitted with valid input.*/
    handleSubmit: function (event) {
        event.preventDefault();
        var title = React.findDOMNode(this.refs.title).value.trim();
        var genre = React.findDOMNode(this.refs.genre).value.trim();
        var rating = React.findDOMNode(this.refs.rating).value.trim();

        if (!title || !genre || !rating) {
            return;
        }
        this.props.onMovieSubmit({title: title, genre: genre, rating: rating});
        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.genre).value = '';
        React.findDOMNode(this.refs.rating).value = '';
        return;
    },
    render: function () {
        return (
            <form className="movieForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Title" ref="title"/>
                <input type="text" placeholder="Genre" ref="genre"/>
                <input type="text" placeholder="Rating" ref="rating"/>
                <input type="submit" value="Post" />
            </form>
        );
    }
});

module.exports = MovieForm;