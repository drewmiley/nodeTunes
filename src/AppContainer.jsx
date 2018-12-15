import React, { Component } from 'react';
import { connect } from 'react-redux';

import SongList from './components/SongList';
import SongSearch from './components/SongSearch';
import { mapDispatchToProps } from './ducks/actions';

class App extends Component {
    render() {
        return <div>
            <SongSearch
                fetchData={this.props.fetchData}
            />
            <SongList
                items={this.props.items}
                hasErrored={this.props.hasErrored}
                isLoading={this.props.isLoading}
            />
        </div>
    }
};

export default connect(state => state, mapDispatchToProps)(App);
