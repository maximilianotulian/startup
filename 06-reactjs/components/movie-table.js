var React = require('react');
var MovieRow = require('./movie-row');

var MovieTable = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired,
        onButtonClick: React.PropTypes.func.isRequired
    },

    render: function () {
        var rows = [];

        this.props.data.forEach (function (movie) {
            rows.push(<MovieRow movie={movie} key={movie.title} onButtonClick={this.handleButtonClick}/>);
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

    handleButtonClick: function (movie, action) {
        this.props.onButtonClick(movie, action)
    }

});

module.exports = MovieTable;