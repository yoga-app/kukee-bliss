import './footer.css';

import React, { Component } from 'react';

import Breakpoint from 'react-socks';
import Liability from '../liability/Liability.js';
import { Link } from 'react-router-dom';
import Waiver from '../waiver/Waiver.js';

class Footer extends Component {
  render() {
    return (
      <div>
        <Breakpoint small down>
          <div className="footer-mobile">
            <div className="footer-middle">
              <ul>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  {' '}
                  <Waiver />
                </li>
                <li>
                  <Liability />
                </li>
              </ul>
            </div>
            <div className="footer-right">
              <a
                href="https://www.facebook.com/kukeeblissyoga/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img
                  src="/images/facebook.svg"
                  alt=""
                  className="social-icon"
                />
              </a>
              <pre className="builtby-p-mobile">
                Built by{' '}
                <a
                  href="https://github.com/arstrel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="builtby-link"
                >
                  Artem
                </a>{' '}
                and{' '}
                <a
                  href="https://github.com/taluama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="builtby-link"
                >
                  Talu
                </a>
              </pre>
            </div>
          </div>
        </Breakpoint>
        <Breakpoint medium up>
          <div className="footer">
            <div className="footer-left">
              {/* <p> Our Mission</p> */}
              <p>
                Kukee Bliss Yoga was founded to put people first and to make
                yoga available to everyone.{' '}
              </p>
            </div>
            <div className="footer-middle">
              <ul>
                <li>
                  <span className="footer-hover">
                    <Link to="/faq">Frequently Asked Questions</Link>
                  </span>
                </li>
                <li>
                  <span className="footer-hover">
                    <Waiver />
                  </span>
                </li>
                <li>
                  <span className="footer-hover">
                    <Liability />
                  </span>
                </li>
              </ul>
            </div>
            <div className="footer-right">
              <a
                href="https://www.facebook.com/kukeeblissyoga/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img
                  src="/images/facebook.svg"
                  alt=""
                  className="social-icon"
                />
                <span className="footer-hover social-text">
                  Follow us on Facebook
                </span>
              </a>

              <pre className="builtby-p">
                Built by{' '}
                <a
                  href="https://github.com/arstrel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="builtby-link"
                >
                  Artem
                </a>
              </pre>
            </div>
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export default Footer;
