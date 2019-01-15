import React, { useState, useEffect } from 'react';

import { Howl, Howler } from 'howler';

const SongPlayer = props => {
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

    useEffect(() => {
        if (props.onlyAllowOneSongToPlay && props.songPlayingId !== id && playing) {
            pauseSong();
        }
    }, [props.songPlayingId])

    return (
        <div>
            <p>
                <button
                    className={playing ? 'active-button': ''}
                    onClick={playSong}
                >
                    Play
                </button>
                <button
                    className={paused ? 'active-button': ''}
                    disabled={!song}
                    onClick={pauseSong}
                >
                    Pause
                </button>
                <button
                    disabled={!song}
                    onClick={stopSong}
                >
                    Stop
                </button>
            </p>
            <p>
                <input
                    type='text' placeholder='Rewind Seconds'
                    onChange={(e) => setRewind(parseFloat(e.target.value))}
                />
                <button
                    disabled={!song || !rewind}
                    onClick={rewindSong}
                >
                    {"<<"}
                </button>
                <button
                    disabled={!song || !fastforward}
                    onClick={fastforwardSong}
                >
                    {">>"}
                </button>
                <input
                    type='text' placeholder='FastForward Seconds'
                    onChange={(e) => setFastforward(parseFloat(e.target.value))}
                />
            </p>
            <p>
                <input
                    type='text' placeholder='Playback Rate'
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                />
                <button
                    disabled={(!song || !speed || speed < 0.5 || speed > 4)}
                    onClick={playbackRate}
                >
                    Playback Rate
                </button>
            </p>
        </div>
    )
}

export default SongPlayer;
