import React, {Component} from 'react';
import store from '../store';
import Cart from '../components/Cart';
import {connect} from 'react-redux';
import {reduceCart} from '../action-creators'
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
			return dispatch(reduceCart(result.data));
				
			})
    	},

    	increment: (product) =>{
    		axios.put(`/api/users/item/${product}`)
    		.then((result) => {
    			return dispatch(reduceCart(result.data))
    		})
    	},

    	checkout: (cart) => {
    		axios.post(`/api/orders/checkout`, cart)
    		.then( (result) => {
    			console.log(result)
    			// return dispatch(reduceCart([]))
			})
    	}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)