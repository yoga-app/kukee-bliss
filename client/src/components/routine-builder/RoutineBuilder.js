import React, { Component } from 'react';
import './routinebuilder.css';
import axios from 'axios';

class RoutineBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routineIds: [],
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
          <p className="daily-name">{eachA.english_name}</p>
          <p className="daily-sansk">{eachA.sanskrit_name}</p>
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
      routine: this.state.routineIds,
      description: this.state.description,
    })
    .then(response=> {
      this.props.getCurrentUser();
      this.setState({routineIds: [], currentRoutine: [], description: ''})
    })
    .catch(err=> {
      console.log(err);
    })
  }

  assingToUserById = (userId) => {
    axios.post(`${process.env.REACT_APP_BASE}api/auth/update-daily-routine/${userId}`, {
      routine: this.state.routineIds,
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
    return this.state.currentRoutine.map((eachR,i)=>{
      return (
        <div key={eachR._id+i} className="each-asana-builder-wrapper builder-top" onClick={(e)=>{this.removeFromCurrent(e, eachR._id)}}>
          <img src={eachR.img_url} alt="asana" className="daily-builder-asana"/>
          <p className="daily-name">{eachR.english_name}</p>
          <p className="daily-sansk">{eachR.sanskrit_name}</p>
        </div>
      )
    })
  }

  removeFromCurrent = (e, id) => {
    let currentRoutineClone = this.state.currentRoutine;
    let routineIdsClone = this.state.routineIds;
    console.log(e);
    let newRoutine = currentRoutineClone.filter(eachR => {
      return eachR._id === id ? false : true
    })

    let newRoutineIds = routineIdsClone.filter(eachId => {
      return eachId === id ? false : true
    })
    
    this.setState({currentRoutine: newRoutine, routineIds: newRoutineIds})
  }

  addToRoutine = (id, uri, engName, sanName) => {
    let temp = this.state.currentRoutine;
    temp.push({
      _id: id,
      img_url: uri,
      english_name: engName,
      sanskrit_name: sanName, 
    })
    let clone = this.state.routineIds;
    clone.push(id)
    this.setState({currentRoutine: temp, routineIds: clone})
  }

  showListOfUsers = () => {
    return this.props.allUsersList.map(eachU => {
      return (
        <div key={eachU._id} className="one-user-wrapper builder-top" onClick={()=>{this.assingToUserById(eachU._id)}}>
          <img src={eachU.picture} alt="user" className="user-picture"/>
          <p>{eachU.firstName} {eachU.lastName}</p>
        </div>
      )
    })
  }

  clearCurrentRoutine = () => {
    this.setState({ 
      routineIds: [],
      description: '',
      currentRoutine: []
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
          <div>
            {this.state.routineIds && 
              <div className="builder-mid-section">
                <div className="routine-description">
                  <p>{this.state.description}</p>
                </div>
                <div className="builder">
                  {this.showCurrentRoutine()}
                </div>
                <div className="builder-buttons">
                  <button className="login-signup small-button" onClick={this.assingToAll}>ASSIGN TO ALL</button>
                  <button className="login-signup small-button" onClick={this.toggleUserList}>
                    {this.state.showUserList ?
                    "HIDE USERS" : "SELECT USERS"
                    }
                    </button>
                  <button className="login-signup small-button" onClick={this.clearCurrentRoutine}>CLEAR</button>
                </div>
                <div className="all-users-list-wrapper">
                  {this.state.showUserList && this.showListOfUsers()}
                </div>
              </div>
              }
          </div>
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