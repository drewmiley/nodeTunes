import React, { Component } from 'react';

import { Howl, Howler } from 'howler';

class ItemList extends Component {
    componentDidMount() {
        this.state = {
            artist: null,
            album: null,
            title: null
        }
    }

    fetchData() {
        this.props.fetchData(this.state);
    }

    playSong(item) {
        var sound = new Howl({
          src: [item.location]
        });

        sound.play();
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                <input type='text' placeholder='Artist' onChange={(e) => this.setState({ artist: e.target.value })}/>
                <input type='text' placeholder='Album' onChange={(e) => this.setState({ album: e.target.value })}/>
                <input type='text' placeholder='Title' onChange={(e) => this.setState({ title: e.target.value })}/>
                <button onClick={() => this.fetchData()}>Fetch Songs</button>
                {this.props.items.map((item, i) => (
                    <div key={i} className='songContainer'>
                        <div>
                            <p>{item.artist}</p>
                            <p>{item.album}</p>
                            <p>{item.title}</p>
                            <button onClick={() => this.playSong(item)}>Play</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ItemList;
