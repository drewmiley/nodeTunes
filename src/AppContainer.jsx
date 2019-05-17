import React, { Component } from 'react';
import { connect } from 'react-redux';

import Playlist from './components/Playlist';
import SongList from './components/SongList';
import SongSearch from './components/SongSearch';
import { mapDispatchToProps } from './ducks/actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        let url = `${ process.env.API_URL }/api/`;
        if (window.location.search.substring(1)) {
            console.log(`loading from ${ window.location.search.substring(1) }`);
            url += `loadNewLibrary?url=${ window.location.search.substring(1) }`;
        } else {
            console.log('clearing library');
            url += 'clearLibrary';
        }
        fetch(url)
            .then(res => res.json())
            .then(console.log)
            .then(this.props.fetchArtists)
            .then(this.props.fetchAlbums)
            .then(() => this.setState({ loading: false }));
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading from { window.location.search.substring(1) }</h1>
        }

        console.log(this.props.albums);
        console.log(this.props.artists);

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
            <div className={`half-width ${ this.props.playlistSongs.length === 0 ? 'emptyPlaylist' : 'playlist' }`}>
                <Playlist
                    songs={this.props.playlistSongs}
                    songPlayingId={this.props.songPlayingId}
                    setSongPlayingId={this.props.setSongPlayingId}
                    removeSongFromPlaylist={this.props.removeSongFromPlaylist}
                    setPlaylistSongPlayingIndex={this.props.setPlaylistSongPlayingIndex}
                    playlistSongPlayingIndex={this.props.playlistSongPlayingIndex}
                    setPlaylist={this.props.setPlaylist}
                />
            </div>
        </>
    }
};

export default connect(state => state, mapDispatchToProps)(App);
