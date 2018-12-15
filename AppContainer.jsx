import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemList from './src/components/ItemList';
import { mapDispatchToProps } from './src/ducks/actions';

class App extends Component {
    render() {
        return <div>
            <h1>Hello, world!</h1>
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
