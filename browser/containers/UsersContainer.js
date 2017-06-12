import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import UserComponent from '../components/UserComponent'
import {removeUser} from '../action-creators'
import axios from 'axios'

const mapStateToProps = function(state) {
	return {
		users: state.users,
		loggedInUser: state.loggedInUser,
		setResetFlag: (userId) => {
			axios.put(`/api/users/${userId}`)
			.then( newUser => {
				console.log(newUser);
			});
		}
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		delete: (userId) => {
			return dispatch(removeUser(userId));

		}

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
