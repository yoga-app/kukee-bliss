import React, { Component } from 'react';
import axios from 'axios';
import Button from '../button/Button';
import './faq.css';

class AddFaq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    }
  }
  
  onInputChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/faq/create', this.state)
    .then(response=> {
      this.setState({question: '', answer: ''})
      this.props.update();
    })
    .catch(err=> {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="add-faq-wrapper">
        <form className="form-login add-faq-form" onSubmit={this.onFormSubmit}>
          <div>
            <label htmlFor="add-question">Add a question: </label>
            <input name="question" id="add-question" onChange={this.onInputChange} value={this.state.question} />
          </div>
          <div>
            <label htmlFor="answer">Add an answer: </label>
            <input name="answer" id="answer" onChange={this.onInputChange} value={this.state.answer} />
          </div>
          <Button class="login-signup" text="SUBMIT"/>
        </form>
      </div>
    );
  }
}

export default AddFaq;