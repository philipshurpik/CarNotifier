var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler } = Router;
var BoardPage = require('./src/board-page/boardPage.web.js');
var AdsPage = require('./src/ads-page/adsPage.web.js');

var App = React.createClass({
    render () {
        return (<RouteHandler/>)
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={BoardPage}/>
        <Route name="board" path="board" handler={BoardPage}/>
        <Route name="ads" path="ads/:userId/:carQueryId" handler={AdsPage}/>
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});


