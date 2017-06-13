import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import Order from '../components/Order'
import {updateUser} from '../action-creators'
import axios from 'axios'
import {hashHistory} from 'react-router'

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
		},
		updateShippingInfo: (info) =>{

			axios.put(`/api/orders/${info[0]}/info`, info[1])
			.then( result =>{
				hashHistory.push('/products')

			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
