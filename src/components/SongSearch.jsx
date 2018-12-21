import React, { useState } from 'react';

const useComponentState = props => {
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState(null);
  const [sortBy, setSortBy] = useState('title');
  const [title, setTitle] = useState(null);

  const fetchData = () => {
    props.fetchData({
      artist,
      album,
      sortBy,
      title
    })
  }

  return {
    artist,
    setArtist,
    album,
    setAlbum,
    sortBy,
    setSortBy,
    title,
    setTitle,
    fetchData
  }
}

const SongSearch = props => {
    const state = useComponentState(props);

    return (
        <div>
            <input type='text' placeholder='Artist' onChange={(e) => state.setArtist(e.target.value)}/>
            <input type='text' placeholder='Album' onChange={(e) => state.setAlbum(e.target.value)}/>
            <input type='text' placeholder='Title' onChange={(e) => state.setTitle(e.target.value)}/>
            <select defaultValue={state.sortBy} onChange={(e) => state.setSortBy(e.target.value)}>
                <option value="album">Album</option>
                <option value="artist">Artist</option>
                <option value="length">Length</option>
                <option value="title">Title</option>
            </select>
            <button onClick={state.fetchData}>Fetch Songs</button>
        </div>
    );
}

export default SongSearch;
