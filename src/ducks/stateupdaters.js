const setter = actionProperty => (state = defaultState, action) => action;

const setter2 = property => state => payload => {
    return payload[property];
};

export const songs = setter2('songs');
export const songPlayingId = setter2('songPlayingId');
export const playlistSongPlayingIndex = setter2('index');
export const artists = setter2('artists');
export const albums = setter2('albums');

// TODO: Rewrite setter
const getLeaderboards = state => ({ leaderboards }) => {
    state.leaderboards = leaderboards;
    return state;
}
