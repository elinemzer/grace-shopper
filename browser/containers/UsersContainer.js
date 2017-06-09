import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import UserComponent from '../components/UserComponent'
import {removeUser} from '../action-creators'

const mapStateToProps = function(state) {
	return {
		users: state.users
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		delete: (userId) => {
			return dispatch(removeUser(userId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent)
