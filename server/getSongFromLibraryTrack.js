module.exports = url => track => {
    const song = {
        album: track['Album'],
        artist: track['Artist'],
        length: track['Total Time'],
        location: track['Location'].replace('file:///Users/drewmiley/Music/iTunes', url || 'http://localhost:3000'),
        runningOrder: {
            ...(track['Disc Count'] > 1 && { disc: track['Disc Number'] }),
            number: track['Track Number']
        },
        title: track['Name']
    }
    return song;
}
