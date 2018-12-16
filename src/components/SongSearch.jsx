import React, { Component } from 'react';

export default class SongSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: null,
            album: null,
            sortBy: 'title',
            title: null
        };
    }

    fetchData() {
        this.props.fetchData(this.state);
    }

    render() {
        return (
            <div>
                <input type='text' placeholder='Artist' onChange={(e) => this.setState({ artist: e.target.value })}/>
                <input type='text' placeholder='Album' onChange={(e) => this.setState({ album: e.target.value })}/>
                <input type='text' placeholder='Title' onChange={(e) => this.setState({ title: e.target.value })}/>
                <select defaultValue={this.state.sortBy} onChange={(e) => this.setState({ sortBy: e.target.value })}>
                    <option value="album">Album</option>
                    <option value="artist">Artist</option>
                    <option value="length">Length</option>
                    <option value="title">Title</option>
                </select>
                <button onClick={() => this.fetchData()}>Fetch Songs</button>
            </div>
        );
    }
}
