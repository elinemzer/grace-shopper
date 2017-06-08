import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from '../components/Navbar'
import {connect} from 'react-redux';

class AppContainer extends Component {

  constructor(props){
    super(props);
  }

  render () {
    return (
      <div id="entire-container">
        <div className="fullscreen-bg">
        <video loop muted autoPlay poster="img/videoframe.jpg" className="fullscreen-bg__video">
            <source src="files/img/productbg.mp4" type="video/mp4" />
        </video>
      </div>
        <Navbar user={this.props.loggedInUser} />
        
        <div className="col-xs-12">

          { this.props.children }
        </div>
      </div>
    )
  }
}


const mapStateToProps = function(state){
  return {
    loggedInUser: state.loggedInUser
    }
}

export default connect(mapStateToProps)(AppContainer)