import React, { Component } from 'react';
import axios from 'axios';
import './oneqanda.css';

class OneQandA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: `${this.props.question}`,
      answer: `${this.props.answer}`,
      isEditing: false,
    }
  }

  deleteQandA = () => {
    axios.post('http://localhost:5000/faq/deletebyid/'+this.props.id)
    .then(()=> {
      this.props.update();
    })
    .catch(err=> {
      console.log(err);
    })
  }

  showQandA() {
    return (
      <div className="oneqa">
      <h3>{this.props.question}</h3>
        <p>{this.props.answer}</p>
        {this.props.theUser && this.props.theUser.isAdmin &&
        <button className="login-signup small-button" onClick={this.toggleEditForm}>EDIT</button>}
      </div>
    )
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/faq/updatebyid/'+this.props.id, this.state)
    .then(()=> {
      this.props.update()
      this.setState({isEditing: false})
    })
    .catch(err=> {
      console.log(err);
    })
  }



  showEditForm() {
    return (
      <div className="faq-edit-form-wrapper">
        <form id="faq-edit-form" className="faq-edit-form" onSubmit={this.onFormSubmit}>
          {/* <legend htmlFor="question">Updated question</legend> */}
          <input name="question" id="question" onChange={this.onInputChange} value={this.state.question} />
          {/* <legend htmlFor="answer">Updated answer</legend> */}
          <textarea name="answer" id="answer" onChange={this.onInputChange} value={this.state.answer} />
          <div className="edit-buttons">
            <button className="login-signup small-button">SAVE</button>
            <button className="login-signup small-button" onClick={this.cancel}>CANCEL</button>
          </div>
        </form>
      </div>
    )
  }

  onInputChange = (e) => {
  this.setState({[e.target.name]:e.target.value})
}
toggleEditForm = (e) => {
  e.preventDefault();
  if(this.state.isEditing) {
    this.submitEditForm()
  }
  this.setState({isEditing: !this.state.isEditing})
}

cancel = ()=> {
  this.setState({isEditing: false});
}

  render() {
    return (
      <div className="eachqa">
        {this.state.isEditing ? this.showEditForm() : this.showQandA()}

        {this.props.theUser && this.props.theUser.isAdmin &&
        <button className="login-signup small-button" onClick={this.deleteQandA}>DELETE</button>}
      </div>
    );
  }
}

export default OneQandA;