import React, {Component} from 'react';
import store from '../store';
import Cart from '../components/Cart';
import {connect} from 'react-redux';


const mapStateToProps = function(state){
	return {
		user: state.loggedInUser,
		products: state.cart
		}
	}


export default connect(mapStateToProps)(Cart)