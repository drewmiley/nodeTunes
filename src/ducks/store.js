import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, songId } from './reducers';

const reducer = combineReducers({
    items,
    hasErrored: itemsHasErrored,
    isLoading: itemsIsLoading,
    songId
});

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
