var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler } = Router;
var Board = require('./src/board-page/boardPage.web.js');

var App = React.createClass({
    render () {
        return (<RouteHandler/>)
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Board}/>
        <Route name="board" path="board" handler={Board}/>
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});


