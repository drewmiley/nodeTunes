module.exports = url => track => {
    const libraryUrl = url && url !== 'undefined' ? url : 'http://localhost:3000';
    const song = {
        album: track['Album'],
        artist: track['Artist'],
        length: track['Total Time'],
        location: track['Location'].replace('file:///Users/drewmiley/Music/iTunes', libraryUrl),
        runningOrder: {
            ...(track['Disc Count'] > 1 && { disc: track['Disc Number'] }),
            number: track['Track Number']
        },
        title: track['Name']
    }
    return song;
}
