import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import SongInfo from './SongInfo';

export default SortableElement(({value, song, playlistSongPlayingIndex, removeSongFromPlaylist}) => {
    return (
        <div className={`songContainer ${ value === playlistSongPlayingIndex ? 'playlistSongPlaying' : '' }`}>
            <SongInfo song={song} />
            <button onClick={() => removeSongFromPlaylist(value)}>Remove Song From Playlist</button>
        </div>
    )
});
