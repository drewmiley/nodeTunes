import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Playlist from './components/Playlist';
import SongList from './components/SongList';
import SongSearch from './components/SongSearch';
import { mapDispatchToProps } from './ducks/actions';

const App = props => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
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
                .then(props.fetchArtists)
                .then(props.fetchAlbums)
                .then(() => setLoading(false));
        }
    });

    if (loading) {
        return <h1>Loading from { window.location.search.substring(1) }</h1>
    }

    return <>
        <div className='half-width'>
            <SongSearch
                artists={props.artists}
                albums={props.albums}
                fetchData={props.fetchData}
            />
            <SongList
                songs={props.songs}
                playlistSongs={props.playlistSongs}
                songPlayingId={props.songPlayingId}
                setSongPlayingId={props.setSongPlayingId}
                addSongToPlaylist={props.addSongToPlaylist}
            />
        </div>
        <div className={`half-width ${ props.playlistSongs.length === 0 ? 'emptyPlaylist' : 'playlist' }`}>
            <Playlist
                songs={props.playlistSongs}
                songPlayingId={props.songPlayingId}
                setSongPlayingId={props.setSongPlayingId}
                removeSongFromPlaylist={props.removeSongFromPlaylist}
                setPlaylistSongPlayingIndex={props.setPlaylistSongPlayingIndex}
                playlistSongPlayingIndex={props.playlistSongPlayingIndex}
                setPlaylist={props.setPlaylist}
            />
        </div>
    </>
}

export default connect(state => state, mapDispatchToProps)(App);
