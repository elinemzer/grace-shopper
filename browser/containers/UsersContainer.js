import React, { Component } from 'react';
import store from '../store'
import {connect} from 'react-redux'
import UserComponent from '../components/UserComponent'

const mapStateToProps = function(state) {
	return {
		users: state.users
	}
}


export default connect(mapStateToProps)(UserComponent)



