import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import SongInfo from './SongInfo';

const PlaylistSong = SortableElement(({value, title, artist, album, playlistSongPlayingIndex, setPlaylistSongPlayingIndex, removeSongFromPlaylist}) => {
    return (
        <div className={`songContainer ${ value === playlistSongPlayingIndex ? 'playlistSongPlaying' : '' }`}>
            <SongInfo song={{title, artist, album}} />
            <button onClick={() => removeSongFromPlaylist(value)}>Remove Song From Playlist</button>
        </div>
    )
});

const SortablePlaylist = SortableContainer(({songs, playlistSongPlayingIndex, setPlaylistSongPlayingIndex, removeSongFromPlaylist}) => {
    return (
        <div>
            {songs.map((song, index) => (
                <PlaylistSong
                    key={`item-${index}`}
                    index={index}
                    value={index}
                    title={song.title}
                    artist={song.artist}
                    album={song.album}
                    playlistSongPlayingIndex={playlistSongPlayingIndex}
                    setPlaylistSongPlayingIndex={setPlaylistSongPlayingIndex}
                    removeSongFromPlaylist={removeSongFromPlaylist}
                />
            ))}
        </div>
    );
});

export default SortablePlaylist;
