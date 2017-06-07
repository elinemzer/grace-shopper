import React, {Component} from 'react';
import store from '../store';
import Product from '../components/Product';
import {connect} from 'react-redux';


const mapStateToProps = function(state){
	return {
		cart: state.cart
		})
	}
}

export default connect(mapStateToProps)(Product)