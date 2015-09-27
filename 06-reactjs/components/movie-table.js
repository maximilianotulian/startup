var React = require('react');
var MovieRow = require('./movie-row');

var MovieTable = React.createClass({
    propTypes: function () {
        data: React.PropTypes.object;
    },
    render: function () {
        var rows = [];
         this.props.data.forEach (function (movie) {
            rows.push(<MovieRow movie={movie} key={movie.title} />);
         }.bind(this));
        return (
                <table className="col-md-6 table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
        );
    }
});

module.exports = MovieTable;