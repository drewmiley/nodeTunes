import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import SortablePlaylistSong from './SortablePlaylistSong';

export default SortableContainer(({songs, playlistSongPlayingIndex, removeSongFromPlaylist}) => {
    return (
        <div>
            {songs.map((song, index) => (
                <SortablePlaylistSong
                    key={`item-${index}`}
                    index={index}
                    value={index}
                    song={song}
                    playlistSongPlayingIndex={playlistSongPlayingIndex}
                    removeSongFromPlaylist={removeSongFromPlaylist}
                />
            ))}
        </div>
    );
});
