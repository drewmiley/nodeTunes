import React, { useState, useEffect } from 'react';

import { Howl, Howler } from 'howler';

const PlaylistPlayer = props => {
    const [id, setId] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);

    const playPlaylist = () => {
        const playlistValue = playlist || new Howl({
            src: props.songs.map(playlist => playlist.location),
            html5: true
        });
        const idValue = playlistValue.play(id);
        props.setPlaylistSongPlayingIndex(0);
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
    }

    const nextSong = () => {
        playlist.stop(id);
        const index = props.songs.map(playlist => playlist.location).indexOf(playlist._src);
        const playlistValue = new Howl({
            src: props.songs.filter((_, i) => i >= index + 1).map(playlist => playlist.location),
            html5: true
        });
        props.setPlaylistSongPlayingIndex(index + 1);
        const idValue = playlistValue.play(null);
        props.setSongPlayingId(idValue);
        setId(idValue);
        setPlaylist(playlistValue);
        setPlaying(true);
        setPaused(false);
    }

    const restartSong = () => {
        playlist.stop(id);
        const index = props.songs.map(playlist => playlist.location).indexOf(playlist._src);
        const playlistValue = new Howl({
            src: props.songs.filter((_, i) => i >= index).map(playlist => playlist.location),
            html5: true
        });
        props.setPlaylistSongPlayingIndex(index);
        const idValue = playlistValue.play(null);
        props.setSongPlayingId(idValue);
        setId(idValue);
        setPlaylist(playlistValue);
        setPlaying(true);
        setPaused(false);
    }

    const previousSong = () => {
        playlist.stop(id);
        const index = props.songs.map(playlist => playlist.location).indexOf(playlist._src);
        const playlistValue = new Howl({
            src: props.songs.filter((_, i) => i >= index - 1).map(playlist => playlist.location),
            html5: true
        });
        props.setPlaylistSongPlayingIndex(index - 1);
        const idValue = playlistValue.play(null);
        props.setSongPlayingId(idValue);
        setId(idValue);
        setPlaylist(playlistValue);
        setPlaying(true);
        setPaused(false);
    }

    useEffect(() => {
        if (props.songPlayingId !== id && playing) {
            pausePlaylist();
        }
    })

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
                  onClick={nextSong}
              >
                  Next Song
              </button>
              <button
                  disabled={!playlist}
                  onClick={restartSong}
              >
                  Restart Song
              </button>
              <button
                  disabled={!playlist || props.playlistSongPlayingIndex === 0}
                  onClick={previousSong}
              >
                  Previous Song
              </button>
          </p>
      </div>
    );
}

export default PlaylistPlayer;
