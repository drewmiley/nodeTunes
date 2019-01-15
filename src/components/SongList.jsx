import React from 'react';

import SongPlayer from './SongPlayer';

const SongList = props => {
    return (
        <>
            {props.items.map((item, i) => (
                <div key={i} className='songContainer'>
                    <p>{item.title} - {item.artist} - {item.album}</p>
                    <SongPlayer
                        onlyAllowOneSongToPlay={true}
                        song={item}
                        songPlayingId={props.songPlayingId}
                        setSongPlayingId={props.setSongPlayingId}
                    />
                </div>
            ))}
        </>
    );
}

export default SongList;
