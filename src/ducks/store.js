import { createStore, applyMiddleware } from 'redux';
import anonReducer from 'redux-anon-reducer';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import * as reducers from './reducers';

const sessionStoragePlaylistSongs = localStorage.getItem('playlistSongs');
const playlistSongsValue = (sessionStoragePlaylistSongs && sessionStoragePlaylistSongs !== "undefined") ?
    JSON.parse(sessionStoragePlaylistSongs) : [];

const initialState = {
    playlistSongs: playlistSongsValue,
    artists: [],
    albums: [],
    songs: [],
    songPlayingId: null,
    playlistSongPlayingIndex: null
}

const reducer = combineReducers({
    playlistSongs: reducers.playlistSongs,
    songs: reducers.songs,
    songPlayingId: reducers.songPlayingId,
    playlistSongPlayingIndex: reducers.playlistSongPlayingIndex,
    artists: reducers.artists,
    albums: reducers.albums
});

export default createStore(reducer, initialState, applyMiddleware(thunk));
