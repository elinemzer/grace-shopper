import React, {Component} from 'react';
import store from '../store';
import Product from '../components/Product';
import {connect} from 'react-redux';
import axios from 'axios'
import {addNewReview, receiveCart} from '../action-creators'


const mapStateToProps = function(state){
	return {
		product: state.selectedProduct,
		reviews: state.selectedProduct.Reviews,
		loggedInUser: state.loggedInUser
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

		submitNewReview: function(bodyObj) {
			return dispatch(addNewReview(bodyObj))
		},
		addToCart: (product) => {
			axios.post('/api/users/addItem',product)
			.then((result) => {
				return axios.get(`/api/auth/me`)
			})
			.then(user =>{
				console.log(user)
				return dispatch(receiveCart(user.data.Products))
			})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)