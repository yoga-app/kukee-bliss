import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

import './menucontent.css'

class MenuContent extends Component {
  constructor(props) {
    super(props)

    this.items = []
    for (let i=1; i<=5; i++) {
      this.items.push(i)
    }
  }

  render() {
    return (
      <div className="menu">
          {this.props.theUser && 
          <div className="menu-item">
            <NavLink to="/profile" activeClassName="nav-link-active" 
            className="nav-link profile"
            >
              <img className="profile-pic" alt="profile" src={this.props.theUser.picture} />
                {this.props.theUser.firstName}
            </NavLink>
          </div>
          }
          
        <div className="menu-item">
          <NavLink exact to="/" 
        activeClassName="nav-link-active" 
        className="nav-link"
        onClick={this.props.closeCallback}> home</NavLink>
        </div>


        {this.props.theUser ? 
        <div className="menu-item"> 
          <span>
            <button className="nav-button" onClick = {this.props.logout}>logout</button>
          </span>
        </div>
        :
        <div className="menu-item">
          <span>
            <button className="nav-button" onClick = {this.props.closeCallbackForLogin}>login</button>
            <button className="nav-button" onClick = {this.props.closeCallbackForSignup}>sign up</button>
          </span>
        </div>
        }
        <div className="menu-item">
        <NavLink exact to="/classes" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={this.props.closeCallback}
        >classes</NavLink>
        </div>
        <div className="menu-item">
        <NavLink exact to="/aboutus" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={this.props.closeCallback}
        >about us</NavLink>
        </div>
        <div className="menu-item">
        <NavLink exact to="/gallery" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={this.props.closeCallback}
        >gallery</NavLink>
        </div>
      
        <p className="hint">Kukee bliss Yoga. Experience the best things in life with a clear mind and healthy body.</p>
      </div>
    )
  }
}


export default MenuContent
