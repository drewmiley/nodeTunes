import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import SongInfo from './SongInfo';

export default SortableElement(({value, title, artist, album, playlistSongPlayingIndex, removeSongFromPlaylist}) => {
    return (
        <div className={`songContainer ${ value === playlistSongPlayingIndex ? 'playlistSongPlaying' : '' }`}>
            <SongInfo song={{title, artist, album}} />
            <button onClick={() => removeSongFromPlaylist(value)}>Remove Song From Playlist</button>
        </div>
    )
});
