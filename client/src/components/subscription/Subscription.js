import React, { Component } from 'react';
import './subscription.css';

class Subscription extends Component {
  render() {
    return (
      <div className="temporary">
        <small>[this is the <b>subscription component</b>]</small><br />
        <small>it shows the yogi's credits - how many classes paid for/ left/ days left if monthly</small>
      </div>
    );
  }
}

export default Subscription;