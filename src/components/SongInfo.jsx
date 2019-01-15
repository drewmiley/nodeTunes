import React from 'react';

const SongInfo = props => (<p>{props.song.title} - {props.song.artist} - {props.song.album}</p>);

export default SongInfo;
