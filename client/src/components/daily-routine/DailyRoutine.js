import React, { Component } from 'react';
import './dailyroutine.css';

class DailyRoutine extends Component {
  showRoutines() {
    return this.props.currentUser.daily.routine.map(eachR=>{
      return (
        <div key={eachR._id} className="each-asana-wrapper">
          <img src={eachR.img_url} alt="asana" className="daily-asana"/>
          <p>{eachR.english_name}</p>
          <p>{eachR.sanskrit_name}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="temporary">
        <small>[this is the <b>connected</b> Daily Routine component]</small><br />
        <h5>Short routine for today:</h5>
        <p>Description: {this.props.currentUser.daily.description}</p>
        <div className="daily-asanas-wrapper">
          {this.showRoutines()}
        </div>
      </div>
    );
  }
}

export default DailyRoutine;