import { createStore, applyMiddleware } from 'redux';
import anonReducer from 'redux-anon-reducer';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import * as actionmaps from './actionmaps';

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

const reducer = combineReducers(Object.assign({}, ...Object.keys(initialState)
    .map(k => ({[k]: anonReducer(actionmaps[k], initialState[k])}))))

export default createStore(reducer, initialState, applyMiddleware(thunk));
