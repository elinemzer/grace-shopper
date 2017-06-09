import React, {Component} from 'react';
import store from '../store';
import Product from '../components/Product';
import {connect} from 'react-redux';
import {addNewReview} from '../action-creators'


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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)