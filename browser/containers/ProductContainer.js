import React, {Component} from 'react';
import store from '../store';
import Product from '../components/Product';
import {connect} from 'react-redux';


const mapStateToProps = function(state){
	return {
		product: state.selectedProduct,
		reviews: state.selectedProduct.Reviews
	}
}

// const mapDispatchToProps = function(dispatch) {
// 	editForm: function() {
// 		props.
// 	}
// }

export default connect(mapStateToProps)(Product)