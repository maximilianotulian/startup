var React = require('react');

var MovieRow = React.createClass( {
   propTypes: function () {
       title: React.PropTypes.string;
       genre: React.PropTypes.string;
       rating: React.PropTypes.number;
   },
   render: function () {
       return (
           <tr className="movieRow">
               <td>{this.props.movie.title}</td>
               <td>{this.props.movie.genre}</td>
               <td>{this.props.movie.rating}</td>
           </tr>

       );
   }
});

module.exports = MovieRow;