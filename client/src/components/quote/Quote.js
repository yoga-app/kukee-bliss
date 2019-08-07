import React, { Component } from 'react';
import './quote.css';

class Quote extends Component {
  render() {
    return (
      <div className="quote">
        <div>{this.props.text}</div>
        <div>{this.props.author}</div>
      </div>
    );
  }
}

export default Quote;