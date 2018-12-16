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

    playbackRate() {
        this.state.song.rate(this.state.speed, this.state.id);
    }

    render() {
        return (
            <div>
                <p>
                    <button onClick={this.playSong.bind(this)}>Play</button>
                    <button onClick={this.pauseSong.bind(this)}>Pause</button>
                    <button onClick={this.stopSong.bind(this)}>Stop</button>
                </p>
                <p>
                    <input
                        type='text' placeholder='Rewind Seconds'
                        onChange={(e) => this.setState({ rewind: parseFloat(e.target.value) })}
                    />
                    <button disabled={!this.state.rewind} onClick={this.rewindSong.bind(this)}>{"<<"}</button>
                    <button disabled={!this.state.fastforward} onClick={this.fastforwardSong.bind(this)}>{">>"}</button>
                    <input
                        type='text' placeholder='FastForward Seconds'
                        onChange={(e) => this.setState({ fastforward: parseFloat(e.target.value) })}
                    />
                </p>
                <p>
                    <input
                        type='text' placeholder='Playback Rate'
                        onChange={(e) => this.setState({ speed: parseFloat(e.target.value) })}
                    />
                    <button
                        disabled={(!this.state.speed || this.state.speed < 0.5 || this.state.speed > 4)}
                        onClick={this.playbackRate.bind(this)}
                    >
                        Playback Rate
                    </button>
                </p>
            </div>
        );
    }
}