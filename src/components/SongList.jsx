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
                            <p>{item.artist}</p>
                            <p>{item.album}</p>
                            <p>{item.title}</p>
                            <SongPlayer song={item} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
