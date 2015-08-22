var React = require('react-native');
var boardStore = require('./boardStore');
var { StyleSheet, ListView, Text, TouchableHighlight, View } = React;
var AdsPage = require('./../ads-page/adsPage.ios.js');
var actions = require('../actions');

class BoardPage extends React.Component {

    constructor() {
        super();
        this.state = {cars: []}
    }

    componentDidMount() {
        this.unsubscribe = boardStore.listen((state) => {
            this.setState(state);
        });
        actions.getUser();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        dataSource = dataSource.cloneWithRows(this.state.cars);

        return (
            <ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)} />
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData._id)} underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    rowPressed(rowId) {
        var car = this.state.cars.filter(row => row.id === rowId)[0];
        this.props.navigator.push({
            title: 'Ads',
            component: AdsPage,
            passProps: {userId: this.state.user._id, carQueryId: rowId}
        });
    }
}

var styles = StyleSheet.create({
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    rowTitle: {
        fontSize: 20,
        color: '#656565'
    }
});

module.exports = BoardPage;