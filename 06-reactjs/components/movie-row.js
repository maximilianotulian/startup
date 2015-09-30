var React = require('react');
var _ = require('lodash');

var MovieRow = React.createClass({

    propTypes: {
       movie: React.PropTypes.shape({
            genre: React.PropTypes.string.isRequired,
            rating: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired
       }),
       onButtonClick: React.PropTypes.func.isRequired
    },

    render: function () {
        var movie = this.props.movie;
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
        this.props.onButtonClick(this.props.movie, 'delete');
    },

    handleEditClick: function () {
        this.props.onButtonClick(this.props.movie, 'edit');
    }
});

module.exports = MovieRow;
