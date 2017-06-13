import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import ManageProductsComponent from '../components/ManageProductsComponent'
import { addNewProduct, updateProduct, removeProduct } from '../action-creators'
import _ from 'lodash'

const mapStateToProps = function(state) {
	return {
		products: _.sortBy(state.products, [(prod) => {
					return prod.title
				}])
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		updateFish: (bodyObj, fishId) => {
			dispatch(updateProduct(bodyObj, fishId))
		},
		deleteFish: (fishId) => {
			dispatch(removeProduct(fishId));
		},
		handleSubmitNewProduct: (bodyObj) => {
			dispatch(addNewProduct(bodyObj))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsComponent);
