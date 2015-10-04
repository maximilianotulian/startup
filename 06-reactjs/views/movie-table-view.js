var React = require('react');
var MovieRow = require('../components/movie-row');
var MovieStore = require('../store/movieStore');

var MovieTableView = React.createClass({

    propTypes: {
        movies: React.PropTypes.array.isRequired
    },

    render: function () {
        var rows = [];
        this.props.movies.forEach (function (movie, index) {
            rows.push(<MovieRow key={movie.title} index={index} onButtonClick={this.handleButtonClick}/>);
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

    handleButtonClick: function (action, index) {
        if (action ==='delete') {
            MovieStore.removeMovie(index);
        } else if (action === 'edit') {
            MovieStore.setSelected(index);
            location.reload();
        }
    }
});

module.exports = MovieTableView;