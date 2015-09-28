var React = require('react');

var MovieRow = React.createClass({

   propTypes: {
        movie: React.PropTypes.shape({
            genre: React.PropTypes.string.isRequired,
            rating: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired
       })
   },

   render: function () {
       return (
           <tr className="movie-row">
               <td>{this.props.movie.title}</td>
               <td>{this.props.movie.genre}</td>
               <td>{this.props.movie.rating}</td>
           </tr>
       );
   }

});

module.exports = MovieRow;