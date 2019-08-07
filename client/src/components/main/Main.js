import React, { Component } from 'react';
import axios from 'axios';
// import Asana from '../asana/Asana';
import Home from '../home/Home.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAsanas: [],
      ready: false,
    }

  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE}asanas`)
    .then((response)=> {
      this.setState({allAsanas: response.data, ready: true})
    })
    .catch(err=> {
      console.log(err);
    })
  }
  
  render() {
    return (
      <div>
        <Home />
        {/* <Asana ready={this.state.ready} asanaList={this.state.allAsanas}/> */}
      </div>
    );
  }
}

export default Main;