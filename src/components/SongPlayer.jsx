import React, { useState, useEffect } from 'react';

import { Howl, Howler } from 'howler';

function useSongPlayerState(props) {
    const [id, setId] = useState(null);
    const [song, setSong] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [fastforward, setFastforward] = useState(null);
    const [rewind, setRewind] = useState(null);
    const [speed, setSpeed] = useState(null);

    const playSong = () => {
        const songValue = song || new Howl({
            src: [props.song.location],
            html5: true
        });
        const idValue = songValue.play(id);
        props.setSongPlayingId(idValue);
        setId(idValue);
        setSong(songValue);
        setPlaying(true);
        setPaused(false);
    }

    const pauseSong = () => {
        song.pause(id);
        setPlaying(false);
        setPaused(true);
    }

    const stopSong = () => {
        song.stop(id);
        setPlaying(false);
        setPaused(false);
    }

    const rewindSong = () => {
        const seconds = song.seek();
        song.seek(Math.max(0, seconds - rewind), id);
    }

    const fastforwardSong = () => {
        const seconds = song.seek();
        song.seek(Math.min(seconds + fastforward, song.duration()), id);
    }

    const playbackRate = () => {
        song.rate(speed, id);
    }

    return {
        id,
        song,
        playing,
        paused,
        fastforward,
        setFastforward,
        rewind,
        setRewind,
        speed,
        setSpeed,
        playSong,
        pauseSong,
        stopSong,
        rewindSong,
        fastforwardSong,
        playbackRate
    }
}

const SongPlayer = props => {
    const state = useSongPlayerState(props);

    useEffect(() => {
        if (props.onlyAllowOneSongToPlay && props.songPlayingId !== state.id && state.playing) {
            state.pauseSong();
        }
    })

    return (
        <div>
            <p>
                <button
                    className={state.playing ? 'active-button': ''}
                    onClick={state.playSong}
                >
                    Play
                </button>
                <button
                    className={state.paused ? 'active-button': ''}
                    onClick={state.pauseSong}
                >
                    Pause
                </button>
                <button onClick={state.stopSong}>Stop</button>
            </p>
            <p>
                <input
                    type='text' placeholder='Rewind Seconds'
                    onChange={(e) => state.setRewind(parseFloat(e.target.value))}
                />
                <button disabled={!state.rewind} onClick={state.rewindSong}>{"<<"}</button>
                <button disabled={!state.fastforward} onClick={state.fastforwardSong}>{">>"}</button>
                <input
                    type='text' placeholder='FastForward Seconds'
                    onChange={(e) => state.setFastforward(parseFloat(e.target.value))}
                />
            </p>
            <p>
                <input
                    type='text' placeholder='Playback Rate'
                    onChange={(e) => state.setSpeed(parseFloat(e.target.value))}
                />
                <button
                    disabled={(!state.speed || state.speed < 0.5 || state.speed > 4)}
                    onClick={state.playbackRate}
                >
                    Playback Rate
                </button>
            </p>
        </div>
    )
}

export default SongPlayer;
