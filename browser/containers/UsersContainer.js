import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import UserComponent from '../components/UserComponent'
import {removeUser, flashMessage} from '../action-creators'
import axios from 'axios'

const mapStateToProps = function(state) {
	return {
		users: state.users,
		loggedInUser: state.loggedInUser,
		flashMessage: state.flashMessage

	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		delete: (userId) => {
			return dispatch(removeUser(userId));

		},
		setResetFlag: (userId) => {
			axios.put(`/api/users/password/${userId}`)
			.then( newUser => {
				dispatch(flashMessage('Password Reset'))
			});
		},
		makeAdmin: (userId) => {
			axios.put(`/api/users/${userId}`, {isAdmin: true})
			.then( newUser => {
				dispatch(flashMessage('User Is Now Admin'))
			});
		}

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
