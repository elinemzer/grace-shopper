import React, { Component } from 'react';
import axios from 'axios';
import Login from '../components/Login';
import {connect} from 'react-redux';
import { loginUser } from '../action-creators';
import { hashHistory } from 'react-router'


class LoginContainer extends Component{
	constructor(props){
		super(props)
		this.state ={
			email:'',
			password:'',
			firstName:'',
			lastName:''
		}
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.signUpUser = this.signUpUser.bind(this);
		this.handleFirst = this.handleFirst.bind(this);
		this.handleLast = this.handleLast.bind(this);
		this.googleLogin = this.googleLogin.bind(this);


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

	googleLogin (event) {
		event.preventDefault()
		this.props.googleLogin()
		hashHistory.push('/products')
	}

	loginUser (event) {
		event.preventDefault()
		this.props.loginUser({email: this.state.email, password: this.state.password})
		hashHistory.push('/products')
	}

	signUpUser (event) {
		event.preventDefault()
		this.props.signUpUser({email: this.state.email, lastName: this.state.lastName, firstName: this.state.firstName, password: this.state.password})
		hashHistory.push('/products')
	}

	render () {
		return(<Login loginUser={this.loginUser} handleLast={this.handleLast} handleFirst={this.handleFirst} signUpUser={this.signUpUser} handleEmail={this.handleEmail} googleLogin={this.googleLogin} handlePassword={this.handlePassword} />
		)
	}

}


const mapStateToProps = function (state) {
	return {
		state: state
		}
	}


const mapDispatchToProps = function (dispatch) {
	return {
		loginUser: (user) => {
			axios.post('/api/login/login',{
				email:user.email,
				password:user.password
			})
			.then((result) => {
				if(result.status === 202){
					hashHistory.push('/passwordreset')
				} else {return dispatch(loginUser(result.data))}

			})
		},
		googleLogin: (user) => {
			axios.get('/google')
			.then((result) => {
				//return dispatch(loginUser(result.data))
			})
		},
		signUpUser: (user) => {
			axios.post('/api/login/signup',{
				email:user.email,
				password:user.password,
				firstName: user.firstName,
				lastName: user.lastName
			})
			.then((result) => {
				return dispatch(loginUser(result.data))
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
