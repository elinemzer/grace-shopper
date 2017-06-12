import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import ManageProductsComponent from '../components/ManageProductsComponent'
import { updateProduct, removeProduct } from '../action-creators'

const mapStateToProps = function(state) {
	console.log(state);
	return {
		products: state.products
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		updateFish: (bodyObj, fishId) => {
			dispatch(updateProduct(bodyObj, fishId))
		},
		deleteFish: (fishId) => {
			dispatch(removeProduct(fishId));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsComponent);
