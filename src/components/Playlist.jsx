import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import PlaylistPlayer from './PlaylistPlayer';
import SortablePlaylist from './SortablePlaylist';

export default class Playlist extends Component {
    onSortEnd = ({oldIndex, newIndex}) => {
        const newPlaylist = arrayMove(this.props.songs, oldIndex, newIndex);
        if (this.props.playlistSongPlayingIndex >= 0) {
            const newPlayingIndex = newPlaylist.indexOf(this.props.songs[this.props.playlistSongPlayingIndex]);
            this.props.setPlaylistSongPlayingIndex(newPlayingIndex);
        }
        this.props.setPlaylist(newPlaylist);
    };

    render() {
        return (
            <>
                <h1>Playlist</h1>
                <PlaylistPlayer
                    songs={this.props.songs}
                    songPlayingId={this.props.songPlayingId}
                    setSongPlayingId={this.props.setSongPlayingId}
                    playlistSongPlayingIndex={this.props.playlistSongPlayingIndex}
                    setPlaylistSongPlayingIndex={this.props.setPlaylistSongPlayingIndex}
                />
                <SortablePlaylist
                    lockAxis={'y'}
                    onSortEnd={this.onSortEnd}
                    songs={this.props.songs}
                    playlistSongPlayingIndex={this.props.playlistSongPlayingIndex}
                    setPlaylistSongPlayingIndex={this.props.setPlaylistSongPlayingIndex}
                    removeSongFromPlaylist={this.props.removeSongFromPlaylist}
                />
            </>
        );
    }
}
