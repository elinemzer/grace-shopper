import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from '../components/Navbar'
import {connect} from 'react-redux';
import { logoutUser} from '../action-creators'
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
        <Navbar logoutUser={this.props.logoutUser} user={this.props.loggedInUser} />
        
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

const mapDispatchToProps = function(dispatch) {
  return {
    logoutUser: () => {
      console.log('logout user clicked')
      axios.post('/api/login/logout')
      .then(()=>{
        return dispatch(logoutUser())
      })

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)