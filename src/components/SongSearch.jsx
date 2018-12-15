import React, { Component } from 'react';

export default class SongSearch extends Component {
    componentDidMount() {
        this.setState({
            artist: null,
            album: null,
            title: null
        });
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
                <button onClick={() => this.fetchData()}>Fetch Songs</button>
            </div>
        );
    }
}
