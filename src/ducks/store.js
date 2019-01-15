import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { playlistSongs, songs, songPlayingId, playlistSongPlayingIndex } from './reducers';

const reducer = combineReducers({
    playlistSongs,
    songs,
    songPlayingId,
    playlistSongPlayingIndex
});

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
