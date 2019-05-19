import React, { useState } from 'react';

import SongSearchAutoComplete from './SongSearchAutoComplete';

const SongSearch = props => {
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [title, setTitle] = useState('');

    const fetchData = () => props.fetchData({ artist, album, sortBy, title });

    const filteredArtists = props.artists
        .filter(a => !album || a.albums.filter(d => d && d.toLowerCase().includes(album.toLowerCase())).length)
        .map(d => d.name);

    const filteredAlbums = props.albums
        .filter(a => !artist || a.artist.toLowerCase().includes(artist.toLowerCase()))
        .map(d => d.title);

    return (
        <>
            <button onClick={fetchData}>Fetch Songs</button>
            <SongSearchAutoComplete
                placeholder='Artist'
                items={filteredArtists}
                value={artist}
                setValue={setArtist}
            />
            <SongSearchAutoComplete
                placeholder='Album'
                items={filteredAlbums}
                value={album}
                setValue={setAlbum}
            />
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
            <select defaultValue={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="album">Album</option>
                <option value="artist">Artist</option>
                <option value="length">Length</option>
                <option value="title">Title</option>
            </select>
        </>
    );
}

export default SongSearch;
