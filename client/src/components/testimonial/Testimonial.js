import React, { Component } from 'react';
import './testimonial.css';
import Breakpoint from 'react-socks';

class Testimonial extends Component {
  render() {
    return (
      <div>
        <Breakpoint small down>
          <div className="testimonial-card-mobile">
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
        </Breakpoint>
        <Breakpoint medium up>
          <div className="testimonial-card">
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
        </Breakpoint>
      </div>
    );
  }
}

export default Testimonial;