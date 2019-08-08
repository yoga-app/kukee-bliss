import React, { Component } from 'react';
import pdf from './liability.pdf';
import './liability.css';

class Liability extends Component {
  render () {
    return (
      <a href={pdf} target="_blank" rel="noopener noreferrer">See liability release form</a>
      )
  }
}

export default Liability;