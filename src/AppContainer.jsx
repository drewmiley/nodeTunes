import React, { Component } from 'react';
import { connect } from 'react-redux';

import Playlist from './components/Playlist';
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
                    songs={this.props.songs}
                    playlistSongs={this.props.playlistSongs}
                    songPlayingId={this.props.songPlayingId}
                    setSongPlayingId={this.props.setSongPlayingId}
                    addSongToPlaylist={this.props.addSongToPlaylist}
                />
            </div>
            <div className={`half-width ${ this.props.playlistSongs.length === 0 ? 'emptyPlaylist' : '' }`}>
                <Playlist
                    songs={this.props.playlistSongs}
                    songPlayingId={this.props.songPlayingId}
                    setSongPlayingId={this.props.setSongPlayingId}
                    removeSongFromPlaylist={this.props.removeSongFromPlaylist}
                    setPlaylistSongPlayingIndex={this.props.setPlaylistSongPlayingIndex}
                    playlistSongPlayingIndex={this.props.playlistSongPlayingIndex}
                />
            </div>
        </>
    }
};

export default connect(state => state, mapDispatchToProps)(App);
