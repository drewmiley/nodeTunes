import React from 'react';

const Playlist = props => {
    return (
        <>
            <h1>Playlist</h1>
            {props.songs.map((song, i) => (
                <div key={i} className='songContainer'>
                    <p>{song.title} - {song.artist} - {song.album}</p>
                </div>
            ))}
        </>
    );
}

export default Playlist;
