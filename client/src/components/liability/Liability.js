import React, { Component } from 'react';
import pdf from './liability.pdf';
import './liability.css';

class Liability extends Component {
  render () {
    return (
      <a href={pdf} target="_blank" rel="noopener noreferrer">OPEN LIABILITY RELEASE</a>
      )
  }
}

export default Liability;