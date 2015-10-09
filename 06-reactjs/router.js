module.exports = (function () {

    // LIBS
    var React = require('react');
    var Router = require('react-router');
    var Route = Router.Route;
    var DefaultRoute = Router.DefaultRoute;

    // VIEWS
    var MainView = require('./views/main-view');
    var MovieCreationView = require('./views/movie-creation-view');

    var ModuleRouter = function () {
        this.routes = (
            <Route path="/" handler={MainView}>
                <DefaultRoute  name="default" handler={MovieCreationView} />
                <Route  name="movie" path="edit/:index" handler={MovieCreationView}/>
            </Route>
        );
    };

    ModuleRouter.prototype.run = function (mountElement) {
        Router.run(this.routes, function (Root) {
            React.render(<Root />, mountElement);
        });
    };

    return new ModuleRouter();
})();