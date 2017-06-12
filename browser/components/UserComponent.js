import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

export default (props) => {
	const users = props.users
	const resetHandler = function (event) {
		props.setResetFlag(event.target.value)
	}
	
	if (props.loggedInUser == {} || !props.loggedInUser.isAdmin) {
		return(
			<div className="row default-container">
				<Link to={`/home`}><p style={{'color': '#ffffff'}}className='fancy-type'>Oops! Click here to return to home page</p></Link>
			</div>)
	}


	else {
		return (
			<div className="row default-container">
			{
				users && users.map(user => {
					return (
						<div key={user.id} className="col-sm-6 text-center">
						   	<ul className="list-group">
								<Link to={`/users/${user.id}`}>
								  <li className="list-group-item">User name: {user.firstName} {user.lastName}</li>
								  <li className="list-group-item">User email: {user.email}</li>
								  <li className="list-group-item">
								  	<div className="btn-group btn-group-sm" role="group" aria-label="...">
									  <button type="button" className="btn btn-info" onClick={resetHandler} value={user.id}>Reset Password</button>
									  <button type="button" className="btn btn-danger" onClick={() => {props.delete(user.id)}}>Delete</button>
									</div>
								  </li>
								</Link>
							</ul>
					  </div>)
				})

			}
			</div>)
	}

}
