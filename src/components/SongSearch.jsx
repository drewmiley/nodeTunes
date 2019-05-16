import React, { useState } from 'react';

const SongSearch = props => {
    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState(null);
    const [sortBy, setSortBy] = useState('title');
    const [title, setTitle] = useState(null);

    const fetchData = () => props.fetchData({ artist, album, sortBy, title });

    return (
        <>
            <button onClick={fetchData}>Fetch Songs</button>
            <input type='text' placeholder='Artist' onChange={(e) => setArtist(e.target.value)}/>
            <input type='text' placeholder='Album' onChange={(e) => setAlbum(e.target.value)}/>
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
