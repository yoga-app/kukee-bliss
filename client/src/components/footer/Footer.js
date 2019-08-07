import React, { Component } from "react";
import {Link} from 'react-router-dom';
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-left">
          <p> Mission statement</p>
          <p>Kukee Bliss Yoga is on a mission to make yoga available to everyone! No more excuses! </p>
        </div>
        <div className="footer-middle">
          <ul>
            <li><Link to='/faq'>Frequently Asked Questions</Link></li>
            <li>Toffee dessert wafer marshmallow brownie cheesecake.</li>
            <li>Candy sugar plum chocolate bar dessert</li>
          </ul>
        </div>
        <div className="footer-right">
          <a href="https://www.facebook.com/kukeeblissyoga/" target="_blank" rel="noopener noreferrer"
          className="social-link">
          <img src="/images/facebook.svg" alt="" className="social-icon"/>
          <span className="social-text">Follow us on Facebook</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
