import React, { Component } from 'react';

import { Howl, Howler } from 'howler';

export default class SongPlayer extends Component {
    playSong(song) {
        const sound = new Howl({
          src: [song.location]
        });

        sound.play();
    }

    render() {
        return (
            <div>
                <button onClick={() => this.playSong(this.props.song)}>Play</button>
            </div>
        );
    }
}
