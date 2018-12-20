import React from 'react';

import SongPlayer from './SongPlayer';

const SongList = props => {
    return (
        <div>
            {props.items.map((item, i) => (
                <div key={i} className='songContainer'>
                    <div>
                        <p>{item.title} - {item.artist} - {item.album}</p>
                        <SongPlayer
                            onlyAllowOneSongToPlay={true}
                            song={item}
                            songPlayingId={props.songPlayingId}
                            setSongPlayingId={props.setSongPlayingId}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SongList;
