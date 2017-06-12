import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import ManageProductsComponent from '../components/ManageProductsComponent'
import {removeUser} from '../action-creators'
import axios from 'axios'

const mapStateToProps = function(state) {
	return {
		products: state.products
	};
};

const mapDispatchToProps = function(dispatch) {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsComponent);
