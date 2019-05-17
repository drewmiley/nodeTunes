import React, { useState } from 'react';

import SongSearchAutoComplete from './SongSearchAutoComplete';

const SongSearch = props => {
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [title, setTitle] = useState('');

    const fetchData = () => props.fetchData({ artist, album, sortBy, title });

    return (
        <>
            <button onClick={fetchData}>Fetch Songs</button>
            <SongSearchAutoComplete
                placeholder='Artist'
                items={props.artists}
                value={artist}
                setValue={setArtist}
            />
            <SongSearchAutoComplete
                placeholder='Album'
                items={props.albums}
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
