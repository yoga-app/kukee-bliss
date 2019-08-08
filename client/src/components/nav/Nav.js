import React from 'react';
import {NavLink} from 'react-router-dom';
import './nav.css';
import Breakpoint from 'react-socks';
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'
import MenuContent from '../menu-content/MenuContent'


class Nav extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
    }
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.props.hideLoginAndSignupForms()
    this.setState({ menuOpen: false })
  }
  closeMenuForLogin() {
    this.props.toggleForm('login')
    this.setState({ menuOpen: false })
  }
  closeMenuForSignup() {
    this.props.toggleForm('signup')
    this.setState({ menuOpen: false })
  }

  doLogoutNowPlease = () =>{
      this.props.pleaseLogOut()
      .then(()=>{
          this.props.getUser();
      })
  }

  render () {
  return(
    <div>
    <Breakpoint small down>
    <div>
      <CheeseburgerMenu
        isOpen={this.state.menuOpen}
        closeCallback={this.closeMenu.bind(this)}>
        <MenuContent 
        closeCallback={this.closeMenu.bind(this)}
        closeCallbackForLogin={this.closeMenuForLogin.bind(this)}
        closeCallbackForSignup={this.closeMenuForSignup.bind(this)}
        logout={this.doLogoutNowPlease}
        theUser={this.props.theUser}
        toggleForm={this.props.toggleForm}
        />
      </CheeseburgerMenu>
      
      <HamburgerMenu
        isOpen={this.state.menuOpen}
        menuClicked={this.openMenu.bind(this)}
        width={32}
        height={24}
        strokeWidth={3}
        rotate={0}
        color='black'
        borderRadius={0}
        animationDuration={0.5}
        
      />
      
      <div className="d-flex">
        <div className="logo">
          <img className="kukee-img" src="/images/logo.svg" alt="logo" />
          <p className="kukee">Kukee <span>Bliss Yoga</span></p>
        </div>
      </div>
    </div>
    </Breakpoint>

    <Breakpoint medium up>
        <nav>
      <NavLink className="logo-link" to="/" onClick={this.props.hideLoginAndSignupForms}>
      <div className="logo">
          <img className="kukee-img" src="/images/logo.svg" alt="logo" />
          <p className="kukee">Kukee <span>Bliss Yoga</span></p>
        </div>
      </NavLink>
      <div className="nav-links">
        <NavLink exact to="/" 
        activeClassName="nav-link-active" 
        className="nav-link"
        onClick={this.props.hideLoginAndSignupForms}> home</NavLink>

        {!this.props.theUser && 
          <span>
            <button className="nav-button" onClick = {()=> this.props.toggleForm('login')}>login</button>
            <button className="nav-button" onClick = {()=> this.props.toggleForm('signup')}>sign up</button>
          </span>
        }

        <NavLink exact to="/classes" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={this.props.hideLoginAndSignupForms}
        >classes</NavLink>

        <NavLink exact to="/aboutus" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={this.props.hideLoginAndSignupForms}
        >about us</NavLink>

        <NavLink exact to="/gallery" activeClassName="nav-link-active" 
        className="nav-link"
        onClick={this.props.hideLoginAndSignupForms}
        >gallery</NavLink>

        {/* <NavLink to="/newsletter" className="nav-link">newsletter</NavLink> */}

        {this.props.theUser && 
          <span>
            <button className="nav-button" onClick = {this.doLogoutNowPlease}>logout</button>
          </span>
        }

        {this.props.theUser && 
          <NavLink to="/profile" activeClassName="nav-link-active" 
          className="nav-link profile"
          >
            <img className="profile-pic" alt="profile" src={this.props.theUser.picture} />
            <div>
              {this.props.theUser.firstName} {this.props.theUser.lastName}
            </div>
          </NavLink>
        }

      </div>
    </nav>
    </Breakpoint>

    </div>
  )
}
}

export default Nav;