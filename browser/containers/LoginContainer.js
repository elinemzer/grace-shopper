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
	loginUser(event) {
		event.preventDefault()
		this.props.loginUser({email: this.state.email, password: this.state.password})
		hashHistory.push('/')
	}

	signUpUser(event) {
		event.preventDefault()
		this.props.signUpUser({email: this.state.email, password: this.state.password})
		hashHistory.push('/')
	}

	render(){
		return(<Login loginUser={this.loginUser} signUpUser={this.signUpUser} handleEmail={this.handleEmail} handlePassword={this.handlePassword} />
		)
	}

}


const mapStateToProps = function(state){
	return {
		state: state
		}
	}


const mapDispatchToProps = function(dispatch) {
	return {
		loginUser: (user) => {
			axios.post('/api/login/login',{
				email:user.email,
				password:user.password
			})
			.then((result) => {
				return dispatch(loginUser(result.data))
			})

		},
		signUpUser: (user) => {
			axios.post('/api/login/signup',{
				email:user.email,
				password:user.password
			})
			.then((result) => {
				return dispatch(loginUser(result.data))
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)