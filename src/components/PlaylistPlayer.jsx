import React, { useState, useEffect } from 'react';

import { Howl, Howler } from 'howler';

const PlaylistPlayer = props => {
    const [id, setId] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);

    const getHowl = (songs, index, p = playlist) => {
        console.log("getHowl");
        const playlistValue = p || new Howl({
            src: [songs[index].location],
            html5: true
        });
        playlistValue.on('pause', () => navigatePlaylist(1 + index, playlistValue));
        return playlistValue;
    }

    const playPlaylist = () => {
        const initialIndex = 0;
        const playlistValue = getHowl(props.songs, initialIndex);
        const idValue = playlistValue.play(id);
        startPlaying(idValue, playlistValue, initialIndex);
    }

    const navigatePlaylist = (index, p = playlist) => {
        console.log('navigatePlaylist');
        p.stop(id);
        const playIndex = (index + props.songs.length) % props.songs.length;
        const playlistValue = getHowl(props.songs, playIndex, null);
        const idValue = playlistValue.play(null);
        startPlaying(idValue, playlistValue, playIndex);
    }

    const startPlaying = (idValue, playlistValue, index) => {
        props.setPlaylistSongPlayingIndex(index);
        props.setSongPlayingId(idValue);
        setId(idValue);
        setPlaylist(playlistValue);
        setPlaying(true);
        setPaused(false);
    }

    const pausePlaylist = () => {
        playlist.pause(id);
        setPlaying(false);
        setPaused(true);
    }

    const stopPlaylist = () => {
        playlist.stop(id);
        setPlaying(false);
        setPaused(false);
        setPlaylist(null);
        setId(null);
        props.setPlaylistSongPlayingIndex(null);
    }

    useEffect(() => {
        if (props.songPlayingId !== id && playing) {
            pausePlaylist();
        }
    }, [props.songPlayingId])

    const onSongsChange = playlist => {
        if (playlist) {
            // TODO: Navigate doesn't work for more than one instance of the same song
            console.log("songChange")
            const playIndex = props.songs.map(song => song.location).indexOf(playlist._src);
            if (playIndex > -1) {
                props.setPlaylistSongPlayingIndex(playIndex);
                const playlistValue = playlist;
                playlistValue.on('pause', () => navigatePlaylist(1 + playIndex, playlistValue));
                setPlaylist(playlistValue);
            } else {
                stopPlaylist();
            }
        }
    }

    useEffect(() => onSongsChange(playlist), [props.songs]);

    return (
      <>
          <p>
              <button
                  className={playing ? 'active-button': ''}
                  onClick={playPlaylist}
              >
                  Play
              </button>
              <button
                  className={paused ? 'active-button': ''}
                  disabled={!playlist}
                  onClick={pausePlaylist}
              >
                  Pause
              </button>
              <button
                  disabled={!playlist}
                  onClick={stopPlaylist}
              >
                  Stop
              </button>
          </p>
          <p>
              <button
                  disabled={!playlist}
                  onClick={() => navigatePlaylist(props.playlistSongPlayingIndex + 1)}
              >
                  Next Song
              </button>
              <button
                  disabled={!playlist}
                  onClick={() => navigatePlaylist(props.playlistSongPlayingIndex)}
              >
                  Restart Song
              </button>
              <button
                  disabled={!playlist}
                  onClick={() => navigatePlaylist(props.playlistSongPlayingIndex - 1)}
              >
                  Previous Song
              </button>
          </p>
      </>
    );
}

export default PlaylistPlayer;
