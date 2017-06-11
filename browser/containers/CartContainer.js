import React, {Component} from 'react';
import store from '../store';
import Cart from '../components/Cart';
import {connect} from 'react-redux';
import {receiveCart} from '../action-creators'
import axios from 'axios'

const mapStateToProps = function(state){
	return {
		user: state.loggedInUser,
		products: state.cart
		}
	}
const mapDispatchToProps = function(dispatch) {
	return {


		removeOrDecrement: (product) => {
			axios.delete(`/api/users/item/${product}`)
			.then((result) => {
			return dispatch(receiveCart(result.data));
				
			})
    	}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)