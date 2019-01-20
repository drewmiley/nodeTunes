import React, {Component} from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import PlaylistPlayer from './PlaylistPlayer';
import SongInfo from './SongInfo';

// const PlaylistSong = SortableElement(props => {
//     console.log(props);
//     return (
//         <div key={`playlistSong-${ props.i }`} className={`songContainer ${ props.i === props.playlistSongPlayingIndex ? 'playlistSongPlaying' : '' }`}>
//             <SongInfo song={props.song} />
//             <button onClick={() => props.removeSongFromPlaylist(props.i)}>Remove Song From Playlist</button>
//         </div>
//     )
// });
//
// const SortablePlaylist = SortableContainer(props => {
//     console.log(props);
//     return (
//         <>
//             {props.songs.map((song, i) => (
//                 <PlaylistSong
//                     song={song}
//                     index={i}
//                     i={i}
//                     playlistSongPlayingIndex={props.playlistSongPlayingIndex}
//                     setPlaylistSongPlayingIndex={props.setPlaylistSongPlayingIndex}
//                     removeSongFromPlaylist={props.removeSongFromPlaylist}
//                 />
//             ))}
//         </>
//     )
// });
//
// class PlaylistSorter extends Component {
//     onSortEnd() {
//         console.log('hello');
//     }
//
//     render() {
//         return <SortablePlaylist {...this.props} onSortEnd={this.onSortEnd} />
//     }
// }
//
// class Playlist extends Component {
//     render() {
//     return (
//         <>
//             <h1>Playlist</h1>
//             <PlaylistPlayer
//                 songs={this.props.songs}
//                 songPlayingId={this.props.songPlayingId}
//                 setSongPlayingId={this.props.setSongPlayingId}
//                 playlistSongPlayingIndex={this.props.playlistSongPlayingIndex}
//                 setPlaylistSongPlayingIndex={this.props.setPlaylistSongPlayingIndex}
//             />
//         <PlaylistSorter {...this.props} />
//         </>
//     );
//     }
// }
//
const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}
//
// render(<SortableComponent />, document.getElementById('root'));

export default SortableComponent;
