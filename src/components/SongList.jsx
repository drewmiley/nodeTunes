import React from 'react';

import SongInfo from './SongInfo';
import SongPlayer from './SongPlayer';

const SongList = props => {
    return (
        <>
            {props.songs.map((song, i) => (
                <div key={i} className='songContainer'>
                    <SongInfo song={song} />
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
