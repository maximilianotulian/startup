// LIBS
var React = require('react');
var _ = require('lodash');

// STORES
var MovieStore = require('../store/movieStore');

// COMPONENTS
var Link = require('react-router').Link;

var MovieRow = React.createClass({

    propTypes: {
        onButtonClick: React.PropTypes.func.isRequired,
        index: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },

    render: function () {
        var index = this.props.index;
        var movie = MovieStore.getMovie(index);

        return (
            <tr className="movie-row">
                <td>
                    {movie.title}
                </td>
                <td>
                    {movie.genre}
                </td>
                <td>
                    {movie.rating}
                </td>
                <td>
                    <button type="button" onClick={this.handleDeleteClick}> Delete </button>
                </td>
                <td>
                    <Link to={`/edit/${index}`}> Edit </Link>
                </td>
            </tr>
        );
    },

    handleDeleteClick: function () {
        this.props.onButtonClick('delete', this.props.index);
    }
});

module.exports = MovieRow;
