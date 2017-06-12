import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import ManageOrders from '../components/ManageOrders'
import axios from 'axios'

const mapStateToProps = function(state) {
	return {
		orders: state.orders
	};
};

export default connect(mapStateToProps)(ManageOrders);
