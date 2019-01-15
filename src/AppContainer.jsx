import React, { Component } from 'react';
import { connect } from 'react-redux';

import SongList from './components/SongList';
import SongSearch from './components/SongSearch';
import { mapDispatchToProps } from './ducks/actions';

class App extends Component {
    render() {
        return <>
            <div className='half-width'>
                <SongSearch
                    fetchData={this.props.fetchData}
                />
                <SongList
                    items={this.props.items}
                    hasErrored={this.props.hasErrored}
                    isLoading={this.props.isLoading}
                    songPlayingId={this.props.songPlayingId}
                    setSongPlayingId={this.props.setSongPlayingId}
                />
            </div>
            <div className='half-width'>
                Playlist
            </div>
        </>
    }
};

export default connect(state => state, mapDispatchToProps)(App);
