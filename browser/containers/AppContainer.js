import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from '../components/Navbar'

export default class AppContainer extends Component {

  constructor(props){
    super(props);
  }

  render () {
    return (
      <div>
        <Navbar />
        
        <div className="col-xs-12">
          { this.props.children }
        </div>
      </div>
    )
  }
}
