// LIBS
var React = require('react');
var Router = require('react-router');
var _ = require('lodash');

// STORES
var MovieStore = require('../store/movieStore');
var MovieConstants = require('../store/movieConstants');

// COMPONENTS
var Input = require('../components/input');

var MovieCreationView = React.createClass({

    mixins: [ Router.Navigation ],

    getInitialState: function () {
        return this.getStateFromStore();
    },

    getStateFromStore(props) {
        var data = props ? props.params : this.props.params;
        var movie = MovieStore.getMovie(data.index) || '';

        return {
            title: movie.title || '',
            genre: movie.genre || '',
            rating: movie.rating || ''
        }
    },

    componentDidMount: function () {
        MovieStore.addChangeListener(MovieConstants.CHANGE_EVENT, this.updateMovies);
    },

    componentWillUnmount: function () {
        MovieStore.addChangeListener(MovieConstants.CHANGE_EVENT, this.updateMovies);
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getStateFromStore(nextProps));
    },

    updateMovies: function () {
        if (this.isMounted())
            return;
        this.setState(this.getStateFromStore())
    },

    render: function () {
        return (
            <form {...this.getFormProps()}>
                <Input {...this.getInputProps('title')} />
                <Input {...this.getInputProps('genre')} />
                <Input {...this.getInputProps('rating')} />
                <input {...this.getSubmitProps()}/>
            </form>
        );
    },

    getFormProps: function () {
        return {
            className: 'movie-form',
            onSubmit: this.handleSubmit
        };
    },

    getInputProps: function (attr) {
        return {
            index: attr,
            onChange: this.handleInputChange,
            value: this.state[attr] || ''
        };
    },

    getSubmitProps: function () {
        var value = 'add';

        if (!_.isUndefined(this.props.params.index)) {
            value = 'edit';
        }

        return {
            type: 'submit',
            value: value
        };
    },

    handleInputChange: function (event, index) {
        var newState = {};

        newState[index] = event.target.value;
        this.setState(newState);
    },

    handleSubmit: function (event) {
        event.preventDefault();

        var title = this.state.title;
        var genre = this.state.genre;
        var rating = this.state.rating;
        var movie = {title: title, genre: genre, rating: rating};
        var index = this.props.params.index;

        if (title && genre && rating) {
            if (_.isUndefined(index)) {
                MovieStore.addMovie(movie);
            } else {
                MovieStore.updateMovie(index, movie);
            }
            this.navigateAfterSubmit();
        }
    },

    navigateAfterSubmit: function () {
        this.transitionTo('default');
    }
});

module.exports = MovieCreationView;
