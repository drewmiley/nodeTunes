import React, { useState } from 'react';
import AutoComplete from 'react-autocomplete';

const SongSearch = props => {
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [title, setTitle] = useState('');

    const fetchData = () => props.fetchData({ artist, album, sortBy, title });
    // TODO: Refactor autocomplete
    // TODO: Style dropdown menu width: 45%
    console.log(props)
    return (
        <>
            <button onClick={fetchData}>Fetch Songs</button>
            <AutoComplete
                getItemValue={item => item}
                items={props.artists}
                renderItem={(item, isHighlighted) =><div style={{ fontSize: '30px', background: isHighlighted ? 'lightgray' : 'white' }} key={item}>{item}</div>}
                shouldItemRender={(item, value) => item && item.includes(value)}
                value={artist}
                placeholder='Artist'
                onChange={e => setArtist(e.target.value)}
                onSelect={val => setArtist(val)}
            />
            <AutoComplete
                getItemValue={item => item}
                items={props.albums}
                renderItem={(item, isHighlighted) =><div style={{ fontSize: '30px', background: isHighlighted ? 'lightgray' : 'white' }} key={item}>{item}</div>}
                shouldItemRender={(item, value) => item && item.includes(value)}
                value={album}
                placeholder='Album'
                onChange={e => setAlbum(e.target.value)}
                onSelect={val => setAlbum(val)}
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
