import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import OrderStats from '../components/OrderStats'
import {updateUser} from '../action-creators'
import axios from 'axios'
import {hashHistory} from 'react-router'

const mapStateToProps = function(state) {
	return {
		orders: state.orders,
		products: state.products,
		productOrders: state.productOrders
	}
}

export default connect(mapStateToProps)(OrderStats)
