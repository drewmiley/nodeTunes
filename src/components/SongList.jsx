import React from 'react';

import SongPlayer from './SongPlayer';

const SongList = props => {
    return (
        <>
            {props.songs.map((song, i) => (
                <div key={i} className='songContainer'>
                    <p>{song.title} - {song.artist} - {song.album}</p>
                    <button onClick={() => props.addSongToPlaylist(song)}>Add Song To Playlist</button>
                    <SongPlayer
                        onlyAllowOneSongToPlay={true}
                        song={song}
                        songPlayingId={props.songPlayingId}
                        setSongPlayingId={props.setSongPlayingId}
                    />
                </div>
            ))}
        </>
    );
}

export default SongList;
