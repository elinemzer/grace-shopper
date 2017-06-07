import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import SingleUser from '../components/SingleUser'
import {updateUser} from '../action-creators'

const mapStateToProps = function(state) {
	return {
		user: state.selectedUser
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		submitEmail(value, userId) {
			console.log("VAL: ", value);
			return dispatch(updateUser(userId, {'email': value}))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)