import React, { Component } from 'react';
import './routinebuilder.css';
import axios from 'axios';

class RoutineBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routine: [],
      description: '',
      currentRoutine: [],
      allUsersList: [],
      showUserList: false,
    }
  }
  showAllAsanas() {
    return this.props.asanas.map(eachA => {
      return (
        <div key={eachA._id} className="each-asana-builder-wrapper" onClick={()=>{
          this.addToRoutine(eachA._id, eachA.img_url, eachA.english_name, eachA.sanskrit_name)}}>
          <img src={eachA.img_url} alt="asana" className="daily-builder-asana"/>
          <p>{eachA.english_name}</p>
          <small>{eachA.sanskrit_name}</small>
        </div>
      )
    })
  }

  handleInput = (e) => {
    this.setState({description: e.target.value})
  }

  toggleUserList = () => {
   this.setState({showUserList: !this.state.showUserList})
  }

  assingToAll = () => {
    axios.post(`${process.env.REACT_APP_BASE}api/auth/update-daily-routine-for-all/`, {
      routine: this.state.routine,
      description: this.state.description,
    })
    .then(response=> {
      this.props.getCurrentUser();
      this.setState({routine: [], currentRoutine: [], description: ''})
    })
    .catch(err=> {
      console.log(err);
    })
  }

  assingToUserById = (userId) => {
    axios.post(`${process.env.REACT_APP_BASE}api/auth/update-daily-routine/${userId}`, {
      routine: this.state.routine,
      description: this.state.description,
    })
    .then(response=> {
      this.props.getCurrentUser();
    })
    .catch(err=> {
      console.log(err);
    })
  }

  showCurrentRoutine = () => {
    return this.state.currentRoutine.map(eachR=>{
      return (
        <div key={eachR._id} className="each-asana-builder-wrapper" >
          <img src={eachR.img_url} alt="asana" className="daily-builder-asana"/>
          <p>{eachR.english_name}</p>
          <p>{eachR.sanskrit_name}</p>
        </div>
      )
    })
  }

  addToRoutine = (id, uri, engName, sanName) => {
    let temp = this.state.currentRoutine;
    temp.push({
      _id: id,
      img_url: uri,
      english_name: engName,
      sanskrit_name: sanName, 
    })
    let clone = this.state.routine;
    clone.push(id)
    this.setState({currentRoutine: temp, routine: clone})
  }

  showListOfUsers = () => {
    return this.props.allUsersList.map(eachU => {
      return (
        <div key={eachU._id} className="one-user-wrapper">
          <img src={eachU.picture} alt="user" className="user-picture"/>
          <p>{eachU.firstName} {eachU.lastName}</p>
          <button onClick={()=>{this.assingToUserById(eachU._id)}}>Assign to this user</button>
        </div>
      )
    })
  }


  render() {
    return (
      <div className="each-profile-section routine-builder">
        <h4>Routine Builder</h4>
        <div className="assigning-section">
          <div className="form-wrapper">
            <label>description:</label>
            <input name="description" onChange={this.handleInput} value={this.state.description} />
          </div>
          <div className="asanas-list-builder-wrapper">
            {this.state.routine && 
              <div>
                <div className="routine-description">
                  <p>{this.state.description}</p>
                </div>
                <div className="asanas-list-builder-wrapper">
                {this.showCurrentRoutine()}
                <div>
                  <button onClick={this.assingToAll}>Assign to Everyone</button>
                  <button onClick={this.toggleUserList}>Assign personally</button>
                </div>
                </div>
                <div className="all-users-list-wrapper">
                  {this.state.showUserList && this.showListOfUsers()}
                </div>
              </div>
              }
          </div>
        </div>



        <div className="asanas-list-builder-wrapper">
          <h5>All the asanas</h5>
          {this.showAllAsanas()}
        </div>
        <div className="daily-asanas-builder-wrapper">

        </div>
      </div>
    );
  }
}

export default RoutineBuilder;