import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import ManageOrders from '../components/ManageOrders'
import axios from 'axios'
import {callUpdateOrders} from '../action-creators'

const mapStateToProps = function(state) {
	return {
		orders: state.orders.sort((a, b) => {
			return a.id > b.id
		})
	}
};

const mapDispatchToProps = function(dispatch) {
	return {
		updateOrderStatus: function(orderId, bodyObj) {
			dispatch(callUpdateOrders(orderId, bodyObj))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrders);
