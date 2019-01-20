import React from 'react';

import PlaylistPlayer from './PlaylistPlayer';
import SongInfo from './SongInfo';

const Playlist = props => {
    return (
        <>
            <h1>Playlist</h1>
            <PlaylistPlayer
                songs={props.songs}
                songPlayingId={props.songPlayingId}
                setSongPlayingId={props.setSongPlayingId}
                playlistSongPlayingIndex={props.playlistSongPlayingIndex}
                setPlaylistSongPlayingIndex={props.setPlaylistSongPlayingIndex}
            />
            {props.songs.map((song, i) => (
                <div key={i} className={`songContainer ${ i === props.playlistSongPlayingIndex ? 'playlistSongPlaying' : '' }`}>
                    <SongInfo song={song} />
                    <button onClick={() => props.removeSongFromPlaylist(i)}>Remove Song From Playlist</button>
                </div>
            ))}
        </>
    );
}

// import React, {Component} from 'react';
// import {render} from 'react-dom';
// import {
//   SortableContainer,
//   SortableElement,
//   arrayMove,
// } from 'react-sortable-hoc';
//
// const SortableItem = SortableElement(({value}) => <li>{value}</li>);
//
// const SortableList = SortableContainer(({items}) => {
//   return (
//     <ul>
//       {items.map((value, index) => (
//         <SortableItem key={`item-${index}`} index={index} value={value} />
//       ))}
//     </ul>
//   );
// });
//
// class SortableComponent extends Component {
//   state = {
//     items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
//   };
//   onSortEnd = ({oldIndex, newIndex}) => {
//     this.setState(({items}) => ({
//       items: arrayMove(items, oldIndex, newIndex),
//     }));
//   };
//   render() {
//     return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
//   }
// }
//
// render(<SortableComponent />, document.getElementById('root'));

export default Playlist;
