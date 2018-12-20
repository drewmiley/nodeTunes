export const mapDispatchToProps = dispatch => ({
    fetchData: url => dispatch(itemsFetchData(url)),
    setSongPlayingId: songPlayingId => dispatch(setSongPlayingId(songPlayingId))
});

const itemsFetchData = params => dispatch => {
    let url = `http://localhost:8000/api/songs/title/${ params.title }?sortBy=${ params.sortBy }`;
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

            return response;
        })
        .then(response => response.json())
        .then(response => response.results)
        .then(items => dispatch(itemsFetchDataSuccess(items)));
};

const itemsFetchDataSuccess = items => ({
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
});

const setSongPlayingId = songPlayingId => dispatch => dispatch({ type: 'SET_SONG_PLAYING_ID', songPlayingId });
