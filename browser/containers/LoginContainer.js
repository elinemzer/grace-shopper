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
		this.loginUserHandler = this.loginUserHandler.bind(this);
		this.signUpHandler = this.signUpHandler.bind(this);
		this.handleFirst = this.handleFirst.bind(this);
		this.handleLast = this.handleLast.bind(this);


	}

	handleEmail(event){
		const value = event.target.value;
		this.setState({
			email: value
		})
	}

	handlePassword(event){
		const value = event.target.value;
		this.setState({
			password: value
		})
	}

	handleFirst(event){
		const value = event.target.value;
		this.setState({
			firstName: value
		})
	}

	handleLast(event){
		const value = event.target.value;
		this.setState({
			lastName: value
		})
	}

	loginUserHandler (event) {
		event.preventDefault()
		this.props.postUser({email: this.state.email, password: this.state.password})
		hashHistory.push('/')
	}

	signUpHandler(event) {
		console.log('in user signup handler')
		event.preventDefault()
		console.log('sending state for signup: ', this.state);
		this.props.signUpUser({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password})
		hashHistory.push('/')
	}

	render(){
		return(<Login loginUser={this.postUser} signUpHandler={this.signUpHandler} handleFirst={this.handleFirst} handleLast={this.handleLast} handleEmail={this.handleEmail} handlePassword={this.handlePassword} />
		)
	}

}


const mapStateToProps = function(state){
	return {
		state
		}
	}


const mapDispatchToProps = function(dispatch) {
	return {
		postUser: (user) => {
			console.log('oops')
			axios.post('/api/login/logIn',{
				email:user.email,
				password:user.password
			})
			.then((result) => {
				return dispatch(loginUser(result.data))
			})

		},
		signUpUser: (user) => {
			console.log('in signup user')
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