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
import { BreakpointProvider } from 'react-socks';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asanas: [],
      allUsersList: [],
      ready: false,
    }
  }

  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_BASE}asanas`)
    .then(asanas => {
      axios.get(`${process.env.REACT_APP_BASE}api/auth/getallusers`)
      .then(users=> {
        this.setState({
          allUsersList: users.data,
          asanas: asanas.data,
          ready: true,
        })
      })
      .catch(err=> {
        console.log(err);
      })
    })
    .catch(err=> {
      console.log(err);
    })
  }

 

  render() {
    return (
      <div>
        <BreakpointProvider>
          <ProfileTop currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>
        </BreakpointProvider>
        {this.props.theUser && this.props.theUser.isAdmin &&
           <ProgressTracker currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>}
        <div className="routine-related-things">
          {this.state.ready && <DailyRoutine currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>}
          {(this.props.theUser.isAdmin && this.state.ready) &&<RoutineBuilder 
          asanas={this.state.asanas} 
          currentUser={this.props.theUser}
          allUsersList = {this.state.allUsersList} 
          getCurrentUser = {this.props.getCurrentUser}/>}
        </div>

        <PrivateGallery currentUser={this.props.theUser} getCurrentUser = {this.props.getCurrentUser}/>
        
        <Subscription />
        <Docs />
      </div>
    );
  }
}

export default Profile;