import React, { Component } from 'react';
import './docs.css';
import Waiver from '../waiver/Waiver.js';
import Liability from '../liability/Liability.js';

class Docs extends Component {
  render() {
    return (
      <div className="docs temporary">
        <small>[this is the <b>docs component</b>]</small><br />
        <Waiver />
        <Liability />
        
      </div>
    );
  }
}

export default Docs;