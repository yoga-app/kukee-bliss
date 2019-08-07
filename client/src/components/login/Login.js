import React, { Component } from 'react';
import AuthService from '../../services/AuthServices.js';
import {Link} from 'react-router-dom';
import Button from '../button/Button.js';
import './login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { usernameInput: '', passwordInput: '' };
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
      .then(()=>{
          this.props.toggleForm('login');
          this.props.getUser();
      })

  }

  render(){
    return(
      <form className="form-login" onSubmit = {this.tryToLogin}>
        <div>
          <label>e-mail:</label>
          <input value={this.state.usernameInput}
            name="usernameInput"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>password:</label>
          <input value={this.state.passwordInput} 
            name="passwordInput"
            onChange={this.handleChange}
          />
        </div>
        <Button text="LOGIN" class="login-signup"/>
        <Link to="/forgot-password-email" onClick={()=>{this.props.toggleForm('login')}}> Forgot Password</Link>
      </form>
    )
  }
}

export default Login; 