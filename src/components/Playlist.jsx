import React, { useEffect } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import PlaylistPlayer from './PlaylistPlayer';
import SortablePlaylist from './SortablePlaylist';

const Playlist = props => {
    const onSortEnd = ({oldIndex, newIndex}) => {
        const newPlaylist = arrayMove(props.songs, oldIndex, newIndex);
        if (props.playlistSongPlayingIndex >= 0) {
            const newPlayingIndex = newPlaylist.indexOf(props.songs[props.playlistSongPlayingIndex]);
            props.setPlaylistSongPlayingIndex(newPlayingIndex);
        }
        props.setPlaylist(newPlaylist);
    };

    useEffect(() => {
        localStorage.setItem('playlistSongs', JSON.stringify(props.songs));
    }, [props.songs]);

    return (
        <>
            <h1>Playlist</h1>
            <PlaylistPlayer
                songs={props.songs}
                songPlayingId={props.songPlayingId}
                setSongPlayingId={props.setSongPlayingId}
                playlistSongPlayingIndex={props.playlistSongPlayingIndex}
                setPlaylistSongPlayingIndex={props.setPlaylistSongPlayingIndex}
            />
            <SortablePlaylist
                lockAxis={'y'}
                onSortEnd={onSortEnd}
                songs={props.songs}
                playlistSongPlayingIndex={props.playlistSongPlayingIndex}
                removeSongFromPlaylist={props.removeSongFromPlaylist}
            />
        </>
    );
}

export default Playlist;
