var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView, TableViewCell } = Ratchet;
var adsStore = require('./adsStore');
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
        actions.getAds(this.props.params.carQueryId);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var adsNodes = this.state.adsDetails.map(this.renderRow.bind(this));

        return <div className="ads">
            <NavBar>
                <Title>Ads</Title>
            </NavBar>
            <TableView>
                <div className="cars">
                    {adsNodes}
                </div>
            </TableView>
        </div>;
    }

    renderRow(adDetails) {
        return (
            <TableViewCell className="roomItem" key={adDetails.id}>
                {adDetails.title}
            </TableViewCell>
        )

    }
}

module.exports = AdsPage;