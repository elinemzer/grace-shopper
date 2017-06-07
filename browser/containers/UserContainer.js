import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import SingleUser from '../components/SingleUser'

export default class UsersContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<SingleUser />
			)
	}
}