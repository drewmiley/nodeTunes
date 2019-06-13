import { createStore, applyMiddleware } from 'redux';
import anonReducer from '../redux-anon-reducer';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import * as actionmaps from './actionmaps';
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
    songs: anonReducer(actionmaps.songs, []),
    songPlayingId: anonReducer(actionmaps.songPlayingId, null),
    playlistSongPlayingIndex: anonReducer(actionmaps.playlistSongPlayingIndex, null),
    artists: anonReducer(actionmaps.artists, []),
    albums: anonReducer(actionmaps.albums, [])
});

export default createStore(reducer, initialState, applyMiddleware(thunk));
