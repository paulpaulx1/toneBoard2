import './App.css';
import * as Tone from 'tone';
import React from 'react';
import Modal from 'react-modal';
import { nanoid } from 'nanoid';

class MapTile extends React.Component {
  render() {
    return Object.values(localStorage).map((palette, index) =>
      palette.split(')').map((color) => (
        <div key={nanoid()} className='mapholder'>
          <div
            classname='stripemaps'
            style={{
              background: `${color})`.substr(1),
            }}
          >
            {`${color}`}
          </div>
          <span />
        </div>
      ))
    );
  }
}

export default MapTile