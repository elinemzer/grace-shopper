import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from '../components/Navbar'
import {connect} from 'react-redux';
import { logoutUser, searchProducts} from '../action-creators'

class AppContainer extends Component {

  constructor(props){
    super(props);
    this.state = { inputValue: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const inputValue = evt.target.value;
    this.setState({ inputValue });
  }

  handleSubmit (evt) {
  evt.preventDefault();
  if (this.state.inputValue){
    this.props.searchProducts(this.state)
  }
}

  render () {
    return (
      <div id="entire-container">
        <div className="fullscreen-bg">
        <video loop muted autoPlay poster="img/videoframe.jpg" className="fullscreen-bg__video">
            <source src="files/img/productbg.mp4" type="video/mp4" />
        </video>
      </div>
        <Navbar logoutUser={this.props.logoutUser} user={this.props.loggedInUser} handleChange={this.handleChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />

        <div className="col-xs-12">

          { this.props.children }
        </div>
      </div>
    )
  }
}


const mapStateToProps = function(state){
  return {
    loggedInUser: state.loggedInUser,
    products: state.products.products
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
    },
    searchProducts: ({ inputValue }) => {
      dispatch(searchProducts(inputValue));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
