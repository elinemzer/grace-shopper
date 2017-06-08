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
				    <Link to={`/users/${user.id}`}>
					   	<ul className="list-group">
						  <li className="list-group-item">User name: {user.firstName} {user.lastName}</li>
						  <li className="list-group-item">User email: {user.email}</li>
						  <li className="list-group-item">
						  	<div className="btn-group btn-group-sm" role="group" aria-label="...">
							  <button type="button" className="btn btn-info">Orders</button>
							  <button type="button" className="btn btn-info">Reset Password</button>
							  <button type="button" className="btn btn-danger">Delete</button>
							</div>
						  </li>
						</ul>
					</Link>
				  </div>)
			})

		}
		  </div>
		  )

}
