import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import Order from '../components/Order'
import {updateUser} from '../action-creators'

const mapStateToProps = function(state) {
	return {
		user: state.loggedInUser,
		order: state.selectedOrder,
		products: state.selectedOrder.Products
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		submitEmail: (value, userId) => {
			return dispatch(updateUser(userId, {'email': value}))
		},
		submitAddress: (bodyObj, userId) => {
			return dispatch(updateUser(userId, bodyObj))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
