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
		submitEmail: (value, userId) => {
			return dispatch(updateUser(userId, {'email': value}))
		},
		submitAddress: (bodyObj, userId) => {
			return dispatch(updateUser(userId, bodyObj))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)