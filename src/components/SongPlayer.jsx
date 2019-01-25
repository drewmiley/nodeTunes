import React, { useState, useEffect } from 'react';

import { Howl, Howler } from 'howler';

const SongPlayer = props => {
    const [id, setId] = useState(null);
    const [song, setSong] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [fastforward, setFastforward] = useState('');
    const [rewind, setRewind] = useState('');
    const [speed, setSpeed] = useState('');

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

    useEffect(() => {
      setId(null);
      setSong(null);
      setPlaying(false);
      setPaused(false);
      setFastforward('');
      setRewind('');
      setSpeed('');
    }, [props.song])

    return (
        <>
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
                    type='number' placeholder='Rewind Seconds'
                    value={rewind}
                    onChange={(e) => setRewind(parseFloat(e.target.value) || '')}
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
                    type='number' placeholder='FastForward Seconds'
                    value={fastforward}
                    onChange={(e) => setFastforward(parseFloat(e.target.value) || '')}
                />
            </p>
            <p>
                <input
                    type='number' placeholder='Playback Rate'
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value) || '')}
                />
                <button
                    disabled={(!song || !speed || speed < 0.5 || speed > 4)}
                    onClick={playbackRate}
                >
                    Playback Rate
                </button>
            </p>
        </>
    )
}

export default SongPlayer;
