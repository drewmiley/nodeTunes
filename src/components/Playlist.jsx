import React from 'react';

import PlaylistPlayer from './PlaylistPlayer';

const Playlist = props => {
    return (
        <>
            <h1>Playlist</h1>
            <PlaylistPlayer
                songs={props.songs}
                songPlayingId={props.songPlayingId}
                setSongPlayingId={props.setSongPlayingId}
                setPlaylistSongPlayingIndex={props.setPlaylistSongPlayingIndex}
            />
            {props.songs.map((song, i) => (
                <div key={i} className={`songContainer ${ i === props.playlistSongPlayingIndex ? 'playlistSongPlaying' : '' }`}>
                    <p>{song.title} - {song.artist} - {song.album}</p>
                    <button onClick={() => props.removeSongFromPlaylist(song)}>Remove Song From Playlist</button>
                </div>
            ))}
        </>
    );
}

export default Playlist;
