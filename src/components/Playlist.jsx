import React, {Component} from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import PlaylistPlayer from './PlaylistPlayer';
import SongInfo from './SongInfo';

// const PlaylistSong = SortableElement(props => {
//     console.log(props);
//     return (
//         <div className={`songContainer ${ props.i === props.playlistSongPlayingIndex ? 'playlistSongPlaying' : '' }`}>
//             <SongInfo song={props.song} />
//             <button onClick={() => props.removeSongFromPlaylist(props.i)}>Remove Song From Playlist</button>
//         </div>
//     )
// });

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortablePlaylist = SortableContainer(({items}) => {
    console.log(items)
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={index} />
      ))}
    </ul>
  );
});

// const SortablePlaylist = SortableContainer(({items}) => {
//     console.log(items);
//     return (<div></div>)
//     return (
//         <div>
//             {items.map((song, i) => (
//                 <SortableItem key={`item-${i}`} index={i} value={song} />
//             ))}
//         <div/>
//     )
//     // return (
//     //     <>
//     //         {props.songs.map((song, i) => (
//     //             <PlaylistSong
//     //                 key={i}
//     //                 song={song}
//     //                 index={i}
//     //                 i={i}
//     //                 playlistSongPlayingIndex={props.playlistSongPlayingIndex}
//     //                 setPlaylistSongPlayingIndex={props.setPlaylistSongPlayingIndex}
//     //                 removeSongFromPlaylist={props.removeSongFromPlaylist}
//     //             />
//     //         ))}
//     //     </>
//     // )
// });

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

    onSortEnd1 = () => {
        console.log('hello');
    }

    render() {
        return (
            <>
                <h1>Playlist</h1>
                <PlaylistPlayer
                    songs={this.props.songs}
                    songPlayingId={this.props.songPlayingId}
                    setSongPlayingId={this.props.setSongPlayingId}
                    playlistSongPlayingIndex={this.props.playlistSongPlayingIndex}
                    setPlaylistSongPlayingIndex={this.props.setPlaylistSongPlayingIndex}
                />
            <SortablePlaylist items={this.props.songs} onSortEnd={this.onSortEnd1} />
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
            </>
        );
    }
}

export default SortableComponent;
