import React, { Component } from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import AllProducts from '../components/AllProducts';
import {connect} from 'react-redux';
import { logoutUser, receiveProducts} from '../action-creators'

const mapStateToProps = function(state){
  return {
    loggedInUser: state.loggedInUser,
    products: state.products
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    logoutUser: () => {
      axios.post('/api/login/logout')
      .then(() => {
        return dispatch(logoutUser())
      })
    },
    searchProducts: ({ inputValue }) => {
      dispatch(receiveProducts(inputValue));
    }
  }
}

class AppContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      inputValue: ''
   };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const inputValue = evt.target.value;
    this.setState({ inputValue });
  }

  handleSubmit (evt) {
  evt.preventDefault();
  let searchedFish = this.props.products;

  if (this.state.inputValue){
    searchedFish = searchedFish.filter( fish => {
      return fish.title.split(' ').join('').toLowerCase() === this.state.inputValue.split(' ').join('').toLowerCase();
    })
    hashHistory.push(`/products/${searchedFish[0].id}`)
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
        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
