import React, { Component } from 'react';
import './profile.css';
import ProfileTop from '../profile-top/ProfileTop.js';
import PrivateGallery from '../private-gallery/PrivateGallery.js';
import ProgressTracker from '../progress-tracker/ProgressTracker.js';
import Subscription from '../subscription/Subscription.js';
import Docs from '../docs/Docs.js';
import axios from 'axios';
import RoutineBuilder from '../routine-builder/RoutineBuilder';
import DailyRoutine from '../daily-routine/DailyRoutine';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asanas: [],
      ready: false,
    }
  }

  componentDidMount() {
    this.getAllAsanas();
  }
  
  getAllAsanas = () => {
    axios.get(`http://localhost:5000/asanas`, {withCredentials: true})
    .then(response => {
      console.log(response)
      this.setState({
        asanas: response.data,
        ready: true,
      })
    })
  }

  render() {
    return (
      <div>
        <ProfileTop currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>
        <PrivateGallery currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>

        {this.props.theUser && this.props.theUser.isAdmin &&
           <ProgressTracker currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>}
        <Subscription />

        {(this.props.theUser.isAdmin && this.state.ready) &&<RoutineBuilder asanas={this.state.asanas} 
        currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>}

        {this.state.ready && <DailyRoutine currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>}
        
        <Docs />
      </div>
    );
  }
}

export default Profile;