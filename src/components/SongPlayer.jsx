import React, { Component } from 'react';

import { Howl, Howler } from 'howler';

export default class SongPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = { location: props.song.location, playing: false, paused: false };
    }

    playSong() {
        if (this.state.id) {
            this.state.song.play(this.state.id);
        } else {
            const song = new Howl({
              src: [this.state.location],
              html5: true
            });
            const id = song.play(this.state.id);
            this.setState({ id, song });
        }
        this.setState({ playing: true, paused: false });
    }

    pauseSong() {
        this.state.song.pause(this.state.id);
        this.setState({ playing: false, paused: true });
    }

    stopSong() {
        this.state.song.stop(this.state.id);
        this.setState({ playing: false, paused: false });
    }

    rewindSong() {
        const seconds = this.state.song.seek();
        this.state.song.seek(Math.max(0, seconds - this.state.rewind), this.state.id);
    }

    fastforwardSong() {
        const seconds = this.state.song.seek();
        this.state.song.seek(Math.min(seconds + this.state.fastforward, this.state.song.duration()), this.state.id);
    }

    playbackRate() {
        this.state.song.rate(this.state.speed, this.state.id);
    }

    render() {
        return (
            <div>
                <p>
                    <button
                        className={this.state.playing ? 'active-button': ''}
                        onClick={this.playSong.bind(this)}
                    >
                        Play
                    </button>
                    <button
                        className={this.state.paused ? 'active-button': ''}
                        onClick={this.pauseSong.bind(this)}
                    >
                        Pause
                    </button>
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
