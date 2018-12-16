import React, { Component } from 'react';

import { Howl, Howler } from 'howler';

export default class SongPlayer extends Component {
    constructor(props) {
        super(props);
        const song = new Howl({
          src: [props.song.location],
          html5: true
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

    rewindSong() {
        const seconds = this.state.song.seek();
        this.state.song.seek(seconds - this.state.rewind, this.state.id);
    }

    fastforwardSong() {
        const seconds = this.state.song.seek();
        this.state.song.seek(seconds + this.state.fastforward, this.state.id);
    }

    render() {
        return (
            <div>
                <button onClick={this.playSong.bind(this)}>Play</button>
                <button onClick={this.pauseSong.bind(this)}>Pause</button>
                <button onClick={this.stopSong.bind(this)}>Stop</button>
                <input type='text' placeholder='Rewind Seconds' onChange={(e) => this.setState({ rewind: parseInt(e.target.value) })}/>
                <button disabled={!this.state.rewind} onClick={this.rewindSong.bind(this)}>{"<<"}</button>
                <input type='text' placeholder='FastForward Seconds' onChange={(e) => this.setState({ fastforward: parseInt(e.target.value) })}/>
                <button disabled={!this.state.fastforward} onClick={this.fastforwardSong.bind(this)}>{">>"}</button>
            </div>
        );
    }
}
