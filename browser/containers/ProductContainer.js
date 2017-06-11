import React, {Component} from 'react';
import store from '../store';
import Product from '../components/Product';
import {connect} from 'react-redux';
import axios from 'axios'
import {addNewReview, receiveCart, flashMessage} from '../action-creators'
import _ from 'lodash'

const mapStateToProps = function(state){
	return {
		product: state.selectedProduct,
		reviews: state.selectedProduct.Reviews,
		loggedInUser: state.loggedInUser,
		flashMessage: state.flashMessage
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

		submitNewReview: function(bodyObj) {
			return dispatch(addNewReview(bodyObj))
		},
		addToCart: (product) => {
			axios.post('/api/users/item', product)
			.then((result) => {
			//result status of 201 will be sent if the user was not logged in when adding to the cart
				if(result.status === 201){
					return result.data
				} 
				//pulling back user in order to get user.Products - eager loading issues
				else {return axios.get(`/api/auth/me`)} 
				
			})
			.then(user =>{
				//Check to see if this is from the auth/me promise or the origin addItem call
				if(user.status === 200)
					return dispatch(receiveCart(user.data.Products))
				else return dispatch(receiveCart(user))			
			})
			.then(result =>{
				return dispatch(flashMessage('Item Added to Cart'))
			})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)