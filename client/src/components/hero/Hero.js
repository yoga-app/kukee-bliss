import React, { Component } from 'react';
import './hero.css';
import Breakpoint from 'react-socks';

class Hero extends Component {
  render() {
    return (
      <div>
        <Breakpoint small down>
          <div className="hero-mobile">
            <section style={{position: 'absolute', top: '250px',left: '15px'}}>
              {this.props.showMandala(3)}
            </section>
          </div>
        </Breakpoint>
        <Breakpoint medium up>
          <div className="hero">
            <section style={{position: 'absolute', top: '340px',left: '10px'}}>
              {this.props.showMandala(4)}
            </section>
            <section style={{position: 'absolute', top: '680px',left: '33px'}}>
              {this.props.showMandala(5)}
            </section>
            <section style={{position: 'absolute', top: '490px',left: '320px'}}>
              {this.props.showMandala(4)}
            </section>
            <section style={{position: 'absolute', top: '830px',left: '342px'}}>
              {this.props.showMandala(4)}
            </section>
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export default Hero;