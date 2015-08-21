var React = require('react-native');
var BoardPage = require('./src/board-page/boardPage.ios.js');

var { AppRegistry, NavigatorIOS } = React;

var styles = React.StyleSheet.create({
    container: {
        flex: 1
    }
});

class CarNotifier extends React.Component {
    render() {
        var initialRoute = {
            title: 'Board',
            component: BoardPage
        };
        return (
            <NavigatorIOS ref="nav" style={styles.container} initialRoute={initialRoute}/>
        )
    }
}

AppRegistry.registerComponent('carnotifier', () => CarNotifier);
