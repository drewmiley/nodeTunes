import React, { Component } from 'react';

import {Howl, Howler} from 'howler';

var sound = new Howl({
  src: ['http://localhost:3000/Blondie/Blondie%20Greatest%20Hits/09%20Rapture.mp3']
});

sound.play();

export default class App extends Component {
    render() {
        return <div>
            <h1>Hello, world!</h1>
        </div>
    }
};
