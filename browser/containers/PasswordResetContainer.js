import React, { Component } from 'react';
import axios from 'axios';
import PasswordReset from '../components/PasswordReset';
import {connect} from 'react-redux';
import { loginUser, flash } from '../action-creators';
import { hashHistory } from 'react-router'


class LoginContainer extends Component{
	constructor(props){
		super(props)
		this.state ={
			email:'',
			password:'',
			newPassword:'',
			firstName:'',
			lastName:''
		}
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleFirst = this.handleFirst.bind(this);
		this.handleLast = this.handleLast.bind(this);
		this.handleNewPassword = this.handleNewPassword.bind(this);
		this.updatePass = this.updatePass.bind(this)
	}

	handleEmail (event) {
		const value = event.target.value;
		this.setState({
			email: value
		})
	}

	handlePassword (event) {
		const value = event.target.value;
		this.setState({
			password: value
		})
	}

	handleNewPassword (event) {
		const value = event.target.value;
		this.setState({
			newPassword: value
		})
	}
	handleFirst (event) {
		const value = event.target.value;
		this.setState({
			firstName: value
		})
	}

	handleLast (event) {
		const value = event.target.value;
		this.setState({
			lastName: value
		})
	}


	updatePass (event) {
		event.preventDefault()
		this.props.updatePass({email: this.state.email, password: this.state.password, newPassword: this.state.newPassword})
	}

	render () {
		return(<PasswordReset updatePass ={this.updatePass} flashMessage={this.props.flashMessage} handleNewPassword={this.handleNewPassword} handlePassword = {this.handlePassword} handleLast={this.handleLast} handleFirst={this.handleFirst} handleEmail={this.handleEmail} />
		)
	}

}


const mapStateToProps = function (state) {
	return {
		flashMessage: state.flashMessage

		}
	}


const mapDispatchToProps = function (dispatch) {
	return {
		updatePass: (user) => {
			axios.put('/api/login/updatepass',{
				email: user.email,
				password: user.password,
				newPassword: user.newPassword
			})
			.then((updatedUser) => {
				return dispatch(flash('Password has been updated. Please log in with your new password'))

			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
