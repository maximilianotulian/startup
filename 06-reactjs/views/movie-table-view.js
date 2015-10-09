// LIBS
var React = require('react');

// STORES
var MovieStore = require('../store/movieStore');

// COMPONENTS
var MovieRow = require('../components/movie-row');

var MovieTableView = React.createClass({

    propTypes: {
        movies: React.PropTypes.array.isRequired
    },

    render: function () {
        var rows = [];

        this.props.movies.forEach (function (movie, index) {
            rows.push(<MovieRow {...this.getMovieRowProps(movie, index)}/>);
        }.bind(this));

        return (
            <table className="col-md-6 table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Rating</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    },

    getMovieRowProps: function (movie, index) {
        return ({
            index: index,
            key: movie.title,
            onButtonClick: this.handleButtonClick
        })
    },

    handleButtonClick: function (action, index) {
        if (action ==='delete') {
            MovieStore.removeMovie(index);
        }
    }
});

module.exports = MovieTableView;