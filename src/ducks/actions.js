import * as actiontypes from './actiontypes';

const songsFetchData = params => dispatch => {
    let url = `${ process.env.API_URL }/api/songs/title/${ params.title }?sortBy=${ params.sortBy }`;
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
    type: actiontypes.SONGS_FETCH_DATA_SUCCESS,
    songs
});

const fetchArtists = () => dispatch => {
    fetch(`${ process.env.API_URL }/api/artists`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then(response => response.json())
        .then(response => response.results)
        .then(artists => dispatch(artistsFetchDataSuccess(artists.map(artist => artist.name))));
};

const artistsFetchDataSuccess = artists => ({
    type: actiontypes.ARTISTS_FETCH_DATA_SUCCESS,
    artists
});

const fetchAlbums = () => dispatch => {
    fetch(`${ process.env.API_URL }/api/albums`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then(response => response.json())
        .then(response => response.results)
        .then(albums => dispatch(albumsFetchDataSuccess(albums.map(album => album.title))));
};

const albumsFetchDataSuccess = albums => ({
    type: actiontypes.ALBUMS_FETCH_DATA_SUCCESS,
    albums
});

const setSongPlayingId = songPlayingId => dispatch => dispatch({ type: actiontypes.SET_SONG_PLAYING_ID, songPlayingId });

const addSongToPlaylist = song => dispatch => dispatch({ type: actiontypes.ADD_SONG_TO_PLAYLIST, song });
const removeSongFromPlaylist = index => dispatch => dispatch({ type: actiontypes.REMOVE_SONG_FROM_PLAYLIST, index });

const setPlaylistSongPlayingIndex = index => dispatch => dispatch({type: actiontypes.SET_PLAYLIST_SONG_PLAYING_INDEX, index});

const setPlaylist = songs => dispatch => dispatch({type: actiontypes.SET_PLAYLIST, songs});

export const mapDispatchToProps = dispatch => ({
    fetchData: params => dispatch(songsFetchData(params)),
    setSongPlayingId: songPlayingId => dispatch(setSongPlayingId(songPlayingId)),
    addSongToPlaylist: song => dispatch(addSongToPlaylist(song)),
    removeSongFromPlaylist: index => dispatch(removeSongFromPlaylist(index)),
    setPlaylistSongPlayingIndex: i => dispatch(setPlaylistSongPlayingIndex(i)),
    setPlaylist: songs => dispatch(setPlaylist(songs)),
    fetchArtists: () => dispatch(fetchArtists()),
    fetchAlbums: () => dispatch(fetchAlbums())
});
