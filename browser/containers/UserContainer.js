import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import SingleUser from '../components/SingleUser'

const mapStateToProps = function(state) {
	return {
		user: state.selectedUser
	}
}


export default connect(mapStateToProps)(SingleUser)