import React, {Component} from 'react';
import store from '../store';
import Product from '../components/Product';
import {connect} from 'react-redux';
import {receiveCart} from '../action-creators';
import axios from 'axios'
const mapStateToProps = function(state){
	return {
		product: state.selectedProduct, 
		reviews: state.reviews.filter( review => {
			return review.productId === state.selectedProduct.id
		})
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		addToCart: (product) => {
			axios.post('/api/users/addItem',product)
			.then((result) => {
				return axios.get(`/api/auth/me`)
			})
			.then(user =>{
				console.log(user)
				return dispatch(receiveCart(user.data.Products))
			})
				// return dispatch(addToCart(result.data))

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)