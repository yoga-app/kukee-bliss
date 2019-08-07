import React, { Component } from 'react';
import './hero.css';

class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <section style={{position: 'absolute', top: '340px',left: '10px'}}>
          {this.props.showMandala(4)}
        </section>
        {/* <section style={{position: 'absolute', top: '150px',left: '297px'}}>
          {this.props.showMandala(1)}
        </section> */}
        {/* <section style={{position: 'absolute', top: '299px',left: '603px'}}>
          {this.props.showMandala(1)}
        </section> */}
        <section style={{position: 'absolute', top: '680px',left: '33px'}}>
          {this.props.showMandala(5)}
        </section>
        <section style={{position: 'absolute', top: '490px',left: '320px'}}>
          {this.props.showMandala(4)}
        </section>
        <section style={{position: 'absolute', top: '830px',left: '342px'}}>
          {this.props.showMandala(4)}
        </section>
        {/* <small>[hero picture goes here]</small><br /> */}
        {/* <small>[call to action goes here (book a class/buy a package/subscribe)]</small><br />
        <small>[short about-us goes here]</small> */}
      </div>
    );
  }
}

export default Hero;