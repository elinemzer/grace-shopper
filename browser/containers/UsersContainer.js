import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import UserComponent from '../components/UserComponent'
import {removeUser} from '../action-creators'

const mapStateToProps = function(state) {
	return {
		users: state.users,
		loggedInUser: state.loggedInUser
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		delete: (userId) => {
			console.log("passed in userId: ", userId)
			return dispatch(removeUser(userId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent)
