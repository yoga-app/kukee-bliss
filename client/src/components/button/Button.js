import React, { Component } from 'react';
import './button.css';

class Button extends Component {
  render() {
    return (
      <button className={this.props.class}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;