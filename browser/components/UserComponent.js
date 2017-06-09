import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

export default (props) => {
	const users = props.users

	return (
		<div className="row default-container">
		{
			users && users.map(user => {
				return (
					<div className="col-sm-6 text-center">
					   	<ul className="list-group">
							<Link to={`/users/${user.id}`}>
						  <li className="list-group-item">User name: {user.firstName} {user.lastName}</li>
						  <li className="list-group-item">User email: {user.email}</li>
						  <li className="list-group-item">
						  	<div className="btn-group btn-group-sm" role="group" aria-label="...">
								<Link to={`/admin`}>
							  <button type="button" className="btn btn-info" align="left">Reset Password</button>
							  <button type="button" className="btn btn-danger" align="right" onClick={props.delete}>Delete</button>
								</Link>
							</div>
						  </li>
							</Link>
						</ul>
				  </div>)
			})

		}
		  </div>
		  )

}
