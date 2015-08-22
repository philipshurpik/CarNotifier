var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView, TableViewCell } = Ratchet;
var boardStore = require('./boardStore');
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
        var carNodes = this.state.cars.map(this.renderRow.bind(this));

        return <div className="board">
            <NavBar>
                <Title>Board</Title>
            </NavBar>
            <TableView>
                <div className="cars">
                    {carNodes}
                </div>
            </TableView>
        </div>;
    }

    renderRow(carQuery) {
        return (
            <TableViewCell navigateRight className="roomItem" key={carQuery._id}>
                <Link to="ads"
                      props={{name: carQuery.title}}
                      params={{userId: this.state.user._id, carQueryId: carQuery._id }}>{carQuery.title}
                </Link>
            </TableViewCell>
        )

    }
}

module.exports = BoardPage;