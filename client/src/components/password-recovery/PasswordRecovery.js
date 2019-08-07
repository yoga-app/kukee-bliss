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
    axios.post('http://localhost:5000/api/auth/forgot-pass', this.state)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })
  }

  onPasswordReset = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/password-reset/'+ this.props.match.params.id, this.state)
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
        <div className="password-recovery-form">
        <h4>Password Reset</h4>
        <form onSubmit={this.onPasswordReset}>
        <input name="password" onChange={this.handleChange} value={this.state.password} />
        <button>Submit</button>
        </form>
        </div>
    
    )
      }
    else
    {
      return (
        <div className="password-recovery-form">
        <h4>Password Recovery</h4>
        <form onSubmit={this.handleFormSubmit}>
        <input name="email" onChange={this.handleChange} value={this.state.email} />
        <button>Submit</button>
        </form>
        </div> 
       
      )
    }
       
  }
}


export default PasswordRecovery;