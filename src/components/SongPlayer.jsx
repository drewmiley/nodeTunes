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
        const id = this.state.song.play(this.state.id);
        this.setState({ id });
    }

    pauseSong() {
        this.state.song.pause(this.state.id);
    }

    stopSong() {
        this.state.song.stop(this.state.id);
    }

    render() {
        return (
            <div>
                <button onClick={this.playSong.bind(this)}>Play</button>
                <button onClick={this.pauseSong.bind(this)}>Pause</button>
                <button onClick={this.stopSong.bind(this)}>Stop</button>
            </div>
        );
    }
}
