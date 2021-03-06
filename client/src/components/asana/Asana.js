import React, { Component } from 'react';
import './asana.css';

class Asana extends Component {

  showAsanas() {
    return this.props.asanaList.map((eachA, index)=> {
      return (
        <div key={eachA._id + index}>
          <h3>Sanskrit Name: {eachA.sanskrit_name}</h3>
          <h3>English Name: {eachA.english_name}</h3>
          <img src={eachA.img_url} alt="asana pic" className="asana-pic"/>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.props.ready ? this.showAsanas() : <h1>Loading ...</h1>}
      </div>
    );
  }
}

export default Asana;

