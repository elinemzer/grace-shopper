import React, { Component } from 'react';


export default (props) => {
	const editStyle = {
		fontSize: 12
	};

	const user = props.user
	return (
		<div>
		<h2>Account Details</h2>
		<div className="panel panel-default col-md-6">
		  <div className="panel-body">
		    <h4>Name: {user.firstName} {user.lastName}</h4>
		    <h4>Email: {user.email} <span style={editStyle}> edit </span> </h4> 
		    <h4>Shipping Address: </h4>
		    <h5> {user.address1} </h5>
		    {
		    	(user.address2) ? <h5> {user.address2} </h5> : null
		    }
		    <h5> {user.city}, {user.state} {user.zipcode} </h5>
		  </div>
		</div>
		


		</div>)
}