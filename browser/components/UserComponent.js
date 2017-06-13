import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

export default (props) => {
	const users = props.users
	const resetHandler = function (event) {
		props.setResetFlag(event.target.value)
	}

	const adminHandler = function(event){
		props.makeAdmin(event.target.value)
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
                props.flashMessage &&
                <div className="alert alert-danger" role="alert">
                  <strong>Success: </strong> { props.flashMessage }
                </div>
			}
			{
				users && users.map(user => {
					return (
						<div key={user.id} className="col-sm-6 text-center ">
						   	<ul className="list-group">

								<Link to={`/users/${user.id}`}>

								  <li className="list-group-item account-details users-details">User name: {user.firstName} {user.lastName}</li>
								  <li className="list-group-item account-details users-details">User email: {user.email}</li>
								</Link>
								  <li className="list-group-item account-details">
								  	<div className="btn-group btn-group-sm" role="group" aria-label="...">
									  <button type="button" className="btn btn-info" onClick={resetHandler} value={user.id}>Reset Password</button>
									  <button type="button" className="btn btn-danger" onClick={() => {props.delete(user.id)}}>Delete</button>
										<button type="button" className="btn btn-success" value={user.id} onClick={adminHandler}>Make Admin</button>
									</div>
								  </li>

							</ul>
					  </div>)
				})

			}
			</div>)
	}

}
