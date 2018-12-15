import React, { Component } from 'react';
import { connect } from 'react-redux';

import SongList from './components/SongList';
import { mapDispatchToProps } from './ducks/actions';

class App extends Component {
    render() {
        return <div>
            <SongList
                fetchData={this.props.fetchData}
                items={this.props.items}
                hasErrored={this.props.hasErrored}
                isLoading={this.props.isLoading}
            />
        </div>
    }
};

export default connect(state => state, mapDispatchToProps)(App);
