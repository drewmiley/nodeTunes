import React, { Component } from 'react';

import { Howl, Howler } from 'howler';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    playSong(item) {
        var sound = new Howl({
          src: [item.location]
        });

        sound.play();
    }

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
                            <button onClick={() => this.playSong(item)}>Play</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ItemList;
