import React, { Component } from 'react';
import AuthService from '../../services/AuthServices.js';
import './signup.css';
import Button from '../button/Button.js';
import Breakpoint from 'react-socks';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstNameInput: '',
      lastNameInput: '',
      usernameInput: '',
      passwordInput: ''
    };
    this.service = new AuthService();
  }

  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value})
  }

  tryToSignUp = (e) =>{
      e.preventDefault();
      const uName = this.state.usernameInput;
      const pWord = this.state.passwordInput;
      const lName = this.state.lastNameInput;
      const fName = this.state.firstNameInput;

    this.service.signup(uName, pWord, lName, fName)
    .then(()=>{
        this.props.toggleForm('signup');
        this.props.getUser();
    })
  }

  render(){
    return(
      <form className="form" onSubmit = {this.tryToSignUp}>

        <Breakpoint small down>  
          <div>
            <input placeholder="e-mail" value={this.state.usernameInput}
              name="usernameInput"
              type="email"
              autoComplete="current-email"
              onChange={this.handleChange}
            />
            <input placeholder="password" value={this.state.passwordInput} 
              name="passwordInput"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <input placeholder="first name" value={this.state.firstNameInput}
              name="firstNameInput"
              onChange={this.handleChange}
            />
            <input placeholder="last name" value={this.state.lastNameInput}
              name="lastNameInput"
              onChange={this.handleChange}
            />
          <Button text="SIGNUP" class="login-signup"/>
          </div>
        </Breakpoint>

        <Breakpoint medium up>
          <div>
            <label>e-mail:</label>
            <input value={this.state.usernameInput}
              name="usernameInput"
              type="email"
              autoComplete="current-email"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>password:</label>
            <input value={this.state.passwordInput} 
              name="passwordInput"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>first name:</label>
            <input value={this.state.firstNameInput}
              name="firstNameInput"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>last name:</label>
            <input value={this.state.lastNameInput}
              name="lastNameInput"
              onChange={this.handleChange}
            />
          </div>
          <Button text="SIGNUP" class="login-signup"/>
        </Breakpoint>

      </form>
    )
  }
}

export default Signup; 