var React = require('react-native');
var adsStore = require('./adsStore');
var { StyleSheet, ListView, Text, TouchableHighlight, View } = React;
var actions = require('../actions');

class AdsPage extends React.Component {

    constructor() {
        super();
        this.state = {adsDetails: []}
    }

    componentDidMount() {
        this.unsubscribe = adsStore.listen((state) => {
            this.setState(state);
        });
        actions.getAds(this.props.carQueryId);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        dataSource = dataSource.cloneWithRows(this.state.adsDetails);

        return (
            <ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)} />
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.id)} underlayColor='#dddddd'>
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
        console.log(rowId);
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

module.exports = AdsPage;