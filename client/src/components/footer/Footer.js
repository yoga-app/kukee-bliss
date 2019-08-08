import React, { Component } from "react";
import {Link} from 'react-router-dom';
import "./footer.css";
import Waiver from '../waiver/Waiver.js';
import Liability from '../liability/Liability.js';
import Breakpoint from 'react-socks';

class Footer extends Component {
  render() {
    return (
      <div>
        <Breakpoint small down>
          <div className="footer-mobile">
            <div className="footer-middle">
              <ul>
                <li><Link to='/faq'>FAQ</Link></li>
                <li> <Waiver /></li>
                <li><Liability /></li>
              </ul>
            </div>
            <div className="footer-right">

              <p className="builtby-p">
              Built by <a href="https://github.com/arstrel" target="_blank" rel="noopener noreferrer" className="builtby-link">
              Artem  
              </a> and <a href="https://github.com/taluama" target="_blank" rel="noopener noreferrer" className="builtby-link">
              Talu 
              </a>
              </p>
              <a href="https://www.facebook.com/kukeeblissyoga/" target="_blank" rel="noopener noreferrer"
              className="social-link">
              <img src="/images/facebook.svg" alt="" className="social-icon"/>
              </a>

            </div>
          </div>
        </Breakpoint>
        <Breakpoint medium up>
          <div className="footer">
            <div className="footer-left">
              <p> Our Mission</p>
              <p>Kukee Bliss Yoga is founded to put people first and to make yoga available to everyone. </p>
            </div>
            <div className="footer-middle">
              <ul>
                <li><Link to='/faq'>Frequently Asked Questions</Link></li>
                <li> <Waiver /></li>
                <li><Liability /></li>
              </ul>
            </div>
            <div className="footer-right">
              <a href="https://www.facebook.com/kukeeblissyoga/" target="_blank" rel="noopener noreferrer"
              className="social-link">
              <img src="/images/facebook.svg" alt="" className="social-icon"/>
              <span className="social-text">Follow us on Facebook</span>
              </a>

              <p className="builtby-p">
              Built by <a href="https://github.com/arstrel" target="_blank" rel="noopener noreferrer" className="builtby-link">
              Artem  
              </a> and <a href="https://github.com/taluama" target="_blank" rel="noopener noreferrer" className="builtby-link">
              Talu 
              </a>
              </p>

            </div>
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export default Footer;
