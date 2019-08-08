import React, { Component } from 'react';
import './slogan.css';
import Breakpoint from 'react-socks';

class Slogan extends Component {
  render() {
    return (
      <div>
        <Breakpoint small down>
          <div className="slogan-mobile">
            <h1>LIVE YOUR HAPPINESS</h1>
          </div>
        </Breakpoint>
        <Breakpoint medium up>
          <div className="slogan">
            <h1>LIVE YOUR HAPPINESS</h1>
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export default Slogan;