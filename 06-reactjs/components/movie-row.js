var React = require('react');
var _ = require('lodash');
var MovieStore = require('../store/movieStore');
var MovieRow = React.createClass({

    propTypes: {
        onButtonClick: React.PropTypes.func.isRequired,
        index: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },

    render: function () {
        var movie = MovieStore.getMovieAt(this.props.index);
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
                    <button type="button" onClick={this.handleEditClick}> Edit </button>
                </td>
            </tr>
        );
    },

    handleDeleteClick: function () {
        this.props.onButtonClick('delete', this.props.index);
    },

    handleEditClick: function () {
        this.props.onButtonClick('edit', this.props.index);
    }
});

module.exports = MovieRow;
