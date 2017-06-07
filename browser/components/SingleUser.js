import React, { Component } from 'react';
import axios from 'axios'


export default class SingleUser extends Component {


	constructor(props) {
		super(props);
		this.state = {
			editEmail: false,
			editAddress: false
		}
		this.editEmailClick = this.editEmailClick.bind(this);
		this.submitEmailButton = this.submitEmailButton.bind(this);
	}


	editEmailClick() {
		this.setState({'editEmail': true});
	}

	submitEmailButton(evt) {
		evt.preventDefault();
		console.log(evt.target.value)
		this.props.submitEmail(evt.target.value, this.props.user.id);
	}

	render() {
		const editStyle = {
			fontSize: 12,
			color: 'blue'
		};

		const user = this.props.user;

		return(
		<div className="default-container">
			<h2>Account Details</h2>
			<div className="panel panel-default col-md-6">
			  <div className="panel-body">
			    <h4>Name: {user.firstName} {user.lastName}</h4>
			    {
			    	(!this.state.editEmail) ?
			    	<h4>Email: {user.email} <span onClick={this.editEmailClick} style={editStyle}> edit </span> </h4> 
			    	: 
			    	<div>
			    	<h4>Email: </h4>
			    	<span className="input-group">
			    		<form onSubmit={this.submitEmailButton} >
						  <input type="text" className="form-control" defaultValue={user.email} aria-describedby="basic-addon1" />
						  <span className="input-group-btn">
					        <button className="btn btn-default"  type="submit">Change Email</button>
					      </span>
					      </form>
					</span>
					</div>
			    }

			    {
			    	(!this.state.editAddress) ?
			    	<h4>Shipping Address: <span style={editStyle}> edit </span> </h4>
			    	: null
			    }
			    <h5> {user.address1} </h5>
			    {
			    	(user.address2) ? <h5> {user.address2} </h5> : null
			    }
			    <h5> {user.city}, {user.state} {user.zipcode} </h5>


			    


			  </div>
			</div>
		</div>)
	}
}

