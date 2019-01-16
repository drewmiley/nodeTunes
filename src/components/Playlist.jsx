import React from 'react';

import PlaylistPlayer from './PlaylistPlayer';
import SongInfo from './SongInfo';

const Playlist = props => {
    return (
        <>
            <h1>Playlist</h1>
            <PlaylistPlayer
                songs={props.songs}
                songPlayingId={props.songPlayingId}
                setSongPlayingId={props.setSongPlayingId}
                playlistSongPlayingIndex={props.playlistSongPlayingIndex}
                setPlaylistSongPlayingIndex={props.setPlaylistSongPlayingIndex}
            />
            {props.songs.map((song, i) => (
                <div key={i} className={`songContainer ${ i === props.playlistSongPlayingIndex ? 'playlistSongPlaying' : '' }`}>
                    <SongInfo song={song} />
                    <button onClick={() => props.removeSongFromPlaylist(i)}>Remove Song From Playlist</button>
                </div>
            ))}
        </>
    );
}

export default Playlist;
