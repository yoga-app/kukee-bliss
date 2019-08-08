import React, { Component } from 'react';
import './dailyroutine.css';

class DailyRoutine extends Component {
  showRoutines() {
    return this.props.currentUser.daily.routine.map(eachR=>{
      return (
        <div key={eachR._id} className="each-asana-builder-wrapper each-asana-builder-wrapper-on-card">
          <img src={eachR.img_url} alt="asana" className="daily-asana"/>
          <p className="daily-name">{eachR.english_name}</p>
          <p className="daily-sansk">{eachR.sanskrit_name}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="daily-routine-card">
        <h4>My Morning Routine</h4>
        <div className="daily-asanas-wrapper">
          {this.showRoutines()}
        </div>
        <p>{this.props.currentUser.daily.description}</p>
      </div>
    );
  }
}

export default DailyRoutine;