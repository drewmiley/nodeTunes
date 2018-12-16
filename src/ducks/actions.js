export const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(itemsFetchData(url)),
        setSongPlayingId: songPlayingId => dispatch(setSongPlayingId(songPlayingId))
    };
};

function itemsFetchData(params) {
    return dispatch => {
        dispatch(itemsIsLoading(true));
        let url = `http://localhost:8000/api/songs/title/${ params.title }?sortBy=title`;
        if (params.artist) {
            url += `&artist=${ params.artist }`;
        }
        if (params.album) {
            url += `&album=${ params.album }`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then(response => response.json())
            .then(response => response.results)
            .then(items => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

function setSongPlayingId(songPlayingId) {
    return dispatch => {
        dispatch({
            type: 'SET_SONG_PLAYING_ID',
            songPlayingId
        })
    };
}
