var React = require('react');
var _ = require('lodash');

var Button = React.createClass({
    propTypes: {
        value: React.PropTypes.string
    },

    render: function () {
        return (
            <button type="button"></button>
        );
    }
});

module.exports = Button;