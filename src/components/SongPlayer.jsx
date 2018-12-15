import React, { Component } from 'react';

import { Howl, Howler } from 'howler';

export default class SongPlayer extends Component {
    constructor(props) {
        super(props);
        const song = new Howl({
          src: [props.song.location]
        });
        this.state = { song };
    }

    playSong() {
        this.state.song.play();
    }

    render() {
        return (
            <div>
                <button onClick={this.playSong.bind(this)}>Play</button>
            </div>
        );
    }
}
