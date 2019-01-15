export const mapDispatchToProps = dispatch => ({
    fetchData: url => dispatch(songsFetchData(url)),
    setSongPlayingId: songPlayingId => dispatch(setSongPlayingId(songPlayingId))
});

const songsFetchData = params => dispatch => {
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
        .then(songs => dispatch(songsFetchDataSuccess(songs)));
};

const songsFetchDataSuccess = songs => ({
    type: 'SONGS_FETCH_DATA_SUCCESS',
    songs
});

const setSongPlayingId = songPlayingId => dispatch => dispatch({ type: 'SET_SONG_PLAYING_ID', songPlayingId });
