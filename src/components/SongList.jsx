import React, { Component } from 'react';

import SongPlayer from './SongPlayer';

export default class SongList extends Component {
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                {this.props.items.map((item, i) => (
                    <div key={i} className='songContainer'>
                        <div>
                            <p>{item.title} - {item.artist} - {item.album}</p>
                            <SongPlayer
                                song={item}
                                songPlayingId={this.props.songPlayingId}
                                setSongPlayingId={this.props.setSongPlayingId}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
