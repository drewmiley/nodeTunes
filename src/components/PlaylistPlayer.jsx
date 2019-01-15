import React, { useState, useEffect } from 'react';

import { Howl, Howler } from 'howler';

const PlaylistPlayer = props => {
    const [id, setId] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);

    const playPlaylist = () => {
        const initialIndex = 0;
        const playlistValue = playlist || new Howl({
            src: [props.songs[initialIndex].location],
            html5: true
        });
        const idValue = playlistValue.play(id);
        props.setPlaylistSongPlayingIndex(initialIndex);
        startPlaying(idValue, playlistValue, initialIndex);
    }

    const navigatePlaylist = (indexChange) => {
        playlist.stop(id);
        const playIndex = props.songs.map(playlist => playlist.location).indexOf(playlist._src) + indexChange;
        const playlistValue = new Howl({
            src: [props.songs[playIndex].location],
            html5: true
        });
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

    useEffect(() => {
        if (playlist) {
            stopPlaylist();
        }
    }, [props.songs.length])

    return (
      <div>
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
                  disabled={!playlist || props.playlistSongPlayingIndex === props.songs.length - 1}
                  onClick={() => navigatePlaylist(1)}
              >
                  Next Song
              </button>
              <button
                  disabled={!playlist}
                  onClick={() => navigatePlaylist(0)}
              >
                  Restart Song
              </button>
              <button
                  disabled={!playlist || props.playlistSongPlayingIndex === 0}
                  onClick={() => navigatePlaylist(-1)}
              >
                  Previous Song
              </button>
          </p>
      </div>
    );
}

export default PlaylistPlayer;
