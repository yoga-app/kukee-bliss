import React from 'react';
import {NavLink} from 'react-router-dom';
import './nav.css';



function Nav(props){

  const doLogoutNowPlease = () =>{
      props.pleaseLogOut()
      .then(()=>{
          props.getUser();
      })
  }

  return(

    // nav-links:
    // home
    // about
    // prices
    // signup
    // FAQ
    // gallery
    // schedules
    // newsletter feed

    <nav>
      <NavLink className="logo-link" to="/" onClick={props.hideLoginAndSignupForms}>
        <div className="logo">
          <img className="kukee-img" src="/images/logo.svg" alt="logo" />
          <p className="kukee">Kukee <span>Bliss Yoga</span></p>
        </div>
      </NavLink>
      <div className="nav-links">
        <NavLink exact to="/" 
        activeClassName="nav-link-active" 
        className="nav-link"
        onClick={props.hideLoginAndSignupForms}> home</NavLink>

        {!props.theUser && 
          <span>
            <button className="nav-button" onClick = {()=> props.toggleForm('login')}>login</button>
            <button className="nav-button" onClick = {()=> props.toggleForm('signup')}>sign up</button>
          </span>
        }

        <NavLink exact to="/classes" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={props.hideLoginAndSignupForms}
        >classes</NavLink>

        <NavLink exact to="/aboutus" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={props.hideLoginAndSignupForms}
        >about us</NavLink>

        <NavLink exact to="/gallery" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={props.hideLoginAndSignupForms}
        >gallery</NavLink>

        {/* <NavLink to="/newsletter" className="nav-link">newsletter</NavLink> */}

        {props.theUser && 
          <span>
            <button className="nav-button" onClick = {doLogoutNowPlease}>logout</button>
          </span>
        }

        {props.theUser && 
          <NavLink to="/profile" activeClassName="nav-link-active" 
          className="nav-link profile"
          >
            <img className="profile-pic" alt="profile" src={props.theUser.picture} />
            <div>
              {props.theUser.firstName} {props.theUser.lastName}
            </div>
          </NavLink>
        }

      </div>
    </nav>
  )

}

export default Nav;