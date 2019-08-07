import React, { Component } from 'react';
import './testimonial.css';

class Testimonial extends Component {
  render() {
    return (
      <div className="testimonial-card">
        {/* <small>[this is the <b>connected</b> testimonial component]</small><br /> */}
        {/* <small>[it renders the picture, text, attended, rating and author as a prop]</small> */}
        {/* <hr /> */}
        <div>
          <p><b>{this.props.rating} stars</b></p>
          <p>{this.props.text}</p>
        </div>
        <div className="author-section-testimonial">
          <div className="testimonial-picture-div">
            <img className="testimonial-picture" src={this.props.picture} alt="yogi" />
          </div>
          <p className="author-info"><span className="author-class">{this.props.author}</span> attended our <span className="author-class">{this.props.attended}</span> class</p>
        </div>
      </div>
    );
  }
}

export default Testimonial;