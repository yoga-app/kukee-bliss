import React, { Component } from 'react';
import './routinebuilder.css';
import axios from 'axios';

class RoutineBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routine: [],
      description: '',
    }
  }
  showAllAsanas() {
    return this.props.asanas.map(eachA => {
      return (
        <div key={eachA._id} className="each-asana-builder-wrapper" onClick={()=>{this.addToRoutine(eachA._id)}}>
          <img src={eachA.img_url} alt="asana" className="daily-builder-asana"/>
          <p>{eachA.english_name}</p>
          <p>{eachA.sanskrit_name}</p>
        </div>
      )
    })
  }

  handleInput = (e) => {
    this.setState({description: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/update-daily-routine-for-all/', this.state)
    .then(response=> {
      this.props.getCurrentUser();
      this.setState({routine: [], description: ''})
    })
    .catch(err=> {
      console.log(err);
    })
  }

  addToRoutine = (asanaId) => {
    let temp = this.state.routine;
    temp.push(asanaId)
    this.setState({routine: temp})
  }


  render() {
    return (
      <div className="temporary">
        <small>[this is the <b>Routine Builder component</b>]</small><br />
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <input name="description" onChange={this.handleInput} value={this.state.description} />
            <button>Save</button>
          </form>
        </div>
        <div className="asanas-list-builder-wrapper">
          {this.showAllAsanas()}
        </div>
        <div className="daily-asanas-builder-wrapper">

        </div>
      </div>
    );
  }
}

export default RoutineBuilder;