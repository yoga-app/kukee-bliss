import React, { Component } from 'react';
import './quote.css';
import Breakpoint, { BreakpointProvider } from 'react-socks';

class Quote extends Component {
  render() {
    return (
      <div>
        <Breakpoint small down>
          <div className="quote-mobile">
            <div>{this.props.text}</div>
            <div>{this.props.author}</div>
          </div>        
        </Breakpoint>
        <Breakpoint medium up>
          <div className="quote">
            <div>{this.props.text}</div>
            <div>{this.props.author}</div>
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export default Quote;