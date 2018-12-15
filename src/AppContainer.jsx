import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemList from './components/ItemList';
import { mapDispatchToProps } from './ducks/actions';

class App extends Component {
    render() {
        return <div>
            <ItemList
                fetchData={this.props.fetchData}
                items={this.props.items}
                hasErrored={this.props.hasErrored}
                isLoading={this.props.isLoading}
            />
        </div>
    }
};

export default connect(state => state, mapDispatchToProps)(App);
