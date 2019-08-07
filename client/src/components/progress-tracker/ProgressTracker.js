import React, { Component } from 'react';
import './progress-tracker.css';
import axios from 'axios';

class ProgressTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPendingUsers: [],
      listOfPaidUsers: [],
      message: '',
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/api/auth/getallusers')
    .then((response)=> {
      let temp = response.data.filter(eachU => {
        return (eachU.package && eachU.package.status === "pending")
      })
      let paidTemp = response.data.filter(eachU => {
        return (eachU.package && eachU.package.status === "paid")
      })
      this.setState({listOfPendingUsers: temp, listOfPaidUsers: paidTemp})
    })  
    .catch(err=> {
      console.log(err);
    })
  }

  updateUserList() {
    axios.get('http://localhost:5000/api/auth/getallusers')
    .then((response)=> {
      let temp = response.data.filter(eachU => {
        return (eachU.package && eachU.package.status === "pending")
      })
      let paidTemp = response.data.filter(eachU => {
        return (eachU.package && eachU.package.status === "paid")
      })
      this.setState({listOfPendingUsers: temp, listOfPaidUsers: paidTemp})
    })  
    .catch(err=> {
      console.log(err);
    })
  }

  onCancel = (userID) => {
    axios.post('http://localhost:5000/api/auth/updateuserpackage/' + userID, {
      status: '',
      type: '', 
      classesLeft: '',
    })
    .then(response=> {
      this.updateUserList();
      this.setState({message: 'Package cancelled'}) ;
    })
    .catch(err=> {
      console.log(err);
    })
  }

  onPaid = (userID, type, classesLeft) => {
    axios.post('http://localhost:5000/api/auth/updateuserpackage/' + userID, {
      status: 'paid',
      type: type, 
      classesLeft: classesLeft,
    })
    .then(response=> {
      this.updateUserList();
      this.setState({message: response.data.message}) ;
    })
    .catch(err=> {
      console.log(err);
    })
  }

  onPending = (userID, type, classesLeft) => {
    axios.post('http://localhost:5000/api/auth/updateuserpackage/' + userID, {
      status: 'pending',
      type: type, 
      classesLeft: classesLeft,
    })
    .then(response=> {
      this.updateUserList();
      this.setState({message: response.data.message}) ;
    })
    .catch(err=> {
      console.log(err);
    })
  }

  
  showPendingUsers= () => {
    return this.state.listOfPendingUsers.map(eachU=> {
      return (
        <div className="each-alert not-paid" key={eachU._id}>
          <div className="exclamation">!</div>
          <a href="mailto:test"><b>{eachU.firstName} {eachU.lastName}</b> is interested in acquiring the <u>{eachU.package.type}</u> package with <u>{eachU.package.classesLeft} classes</u>.</a>
          <p>({eachU.package.status})</p>
          <button className="login-signup small-button" onClick={()=>{this.onCancel(eachU._id)}}>CANCEL</button>
          <button className="login-signup small-button" onClick={()=>{this.onPaid(eachU._id, eachU.package.type, eachU.package.classesLeft)}}>PAID</button>
        </div>
      )
    })
  }

  showPaidUsers= () => {
    return this.state.listOfPaidUsers.map(eachU=> {
      return (
        <div className="each-alert" key={eachU._id}>
          <p>{eachU.firstName} {eachU.lastName} have paid for:</p>
          <p>Level: {eachU.package.type}</p>
          <p>Package for {eachU.package.classesLeft} classes</p>
          <strong>Status: {eachU.package.status}</strong>
          <button className="login-signup small-button" onClick={()=>{this.onCancel(eachU._id)}}>CANCEL</button>
          <button className="login-signup small-button" onClick={()=>{this.onPending(eachU._id, eachU.package.type, eachU.package.classesLeft)}}>PENDING</button>
        </div>
      )
    })
  }

  render() {
    return (

      <div>
        {(this.state.listOfPaidUsers.length > 0 || this.state.listOfPendingUsers.length > 0) &&
          <div className="each-profile-section tracker">
            <div className="users-list-wrapper">
              <div className="users-pending-wrapper">
              {this.showPendingUsers()}
              </div>
              <div className="users-paid-wrapper">
              {this.showPaidUsers()}
              </div>
            </div>
          </div>   
        }

      </div>
    );
  }
}

export default ProgressTracker;