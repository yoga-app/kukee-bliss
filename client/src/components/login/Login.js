import React, { Component } from 'react';
import AuthService from '../../services/AuthServices.js';
import {Link} from 'react-router-dom';
import Button from '../button/Button.js';
import './login.css';
import Breakpoint from 'react-socks';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { 
      usernameInput: '', 
      passwordInput: '',
      error: '', 
    };
    this.service = new AuthService();
  }

  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value})
  }

  tryToLogin = (e) =>{
      e.preventDefault();
      const uName = this.state.usernameInput;
      const pWord = this.state.passwordInput;

      this.service.login(uName, pWord)
      .then((response)=>{
          this.props.toggleForm('login');
          this.props.getUser();
      })
      .catch(err =>{
        if(err.toString().includes('401')) {
          let temp = 'Login or password not found';
          this.setState({error: temp, usernameInput: '', passwordInput: ''})
        }
      })

  }

  resetError =() => {
    this.setState({error: ''})
  }

  render(){
    return(
      <form className="form-login" onSubmit = {this.tryToLogin}>

        <Breakpoint small down>
          <div>
            <div className="error-message">{this.state.error && 
            <span className="error-span" onAnimationEnd={this.resetError}>{this.state.error}</span>}</div>
          
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
          <Button text="LOGIN" class="login-signup"/>
          <Link to="/forgot-password-email" onClick={()=>{this.props.toggleForm('login')}}> Forgot Password</Link>
          </div>
        </Breakpoint>

        <Breakpoint medium up>
          <div className="error-message">{this.state.error && 
          <span className="error-span" onAnimationEnd={this.resetError}>{this.state.error}</span>}</div>
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
          <Button text="LOGIN" class="login-signup"/>
          <Link to="/forgot-password-email" onClick={()=>{this.props.toggleForm('login')}}> Forgot Password</Link>
        </Breakpoint>
     
      </form>
    )
  }
}

export default Login; 