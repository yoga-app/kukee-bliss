import React, { Component } from 'react';
import './passwordrecovery.css';
import axios from 'axios';

class PasswordRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE}api/auth/forgot-pass`, this.state)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })
  }

  onPasswordReset = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE}api/auth/password-reset/`+ this.props.match.params.id, this.state)
    .then(response => {
      console.log(response.data.message);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.props.forReset) 
    { 
      return (
        <div className="password-recovery-form-wrapper">
        <form  className="password-recovery-form" onSubmit={this.onPasswordReset}>
        <h4>Password Reset</h4>
        <div>
        <label htmlFor="reset-input">e-mail:</label>
        <input name="password" id="reset-input" onChange={this.handleChange} value={this.state.password} />
        </div>
        <button className="login-signup  recovery-button">SUBMIT</button>
        </form>
        </div>
    
    )
      }
    else
    {
      return (
        <div className="password-recovery-form-wrapper">
        <form  className="password-recovery-form" onSubmit={this.handleFormSubmit}>
        <h4>Password Recovery</h4>
        <div>
        <label htmlFor="recovery-input">e-mail:</label>
        <input name="email" id="recovery-input" onChange={this.handleChange} value={this.state.email} />
        </div>
        <button className="login-signup recovery-button">SUBMIT</button>
        </form>
        </div> 
       
      )
    }
       
  }
}


export default PasswordRecovery;