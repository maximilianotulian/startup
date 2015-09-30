var React = require('react');
var _ = require('lodash');

var Input = React.createClass({

    propTypes: {
        defaultValue: React.PropTypes.string.isRequired,
        index: React.PropTypes.string,
        onChange: React.PropTypes.func,
        value: React.PropTypes.string
    },

    getInitialState: function () {
        var initialState = {};

        if (_.isUndefined(this.props.value)) {
            initialState.value = this.props.defaultValue;
        }

        return initialState;
    },

    render: function () {
        return (
            <input type="text" value={this.getValue()} onChange={this.handleChange}/>
        );
    },

    getValue: function () {
        return (_.isUndefined(this.props.value)) ? this.state.value : this.props.value;
    },

    handleChange: function (event) {
        this.props.onChange(event, this.props.index);
    }
});

module.exports = Input;