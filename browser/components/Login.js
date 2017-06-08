import React from 'react';
import { Link } from 'react-router';

export default function Login (props) {
	
	console.log(props)

  return (
  	<div className='default-container'>
    	<div className="row">
    		<div className='col-xs-6'>
    			<h1>Returning User? Sign in here!</h1>
				<form onSubmit={props.loginUser}>
					<p>User Name</p>
						<input id="a1" type="text" className="form-control col-md-2" onChange={props.handleEmail} aria-describedby="basic-addon1" />
					<p>Password</p>
						<input id="a2" type="text" className="form-control col-md-2" onChange={props.handlePassword} aria-describedby="basic-addon1" />
					<span className="input-group-btn">
					   	<button className="btn btn-default" type="submit">Sign In</button>
				    </span>
			    </form>
		    </div>
		<div className='col-xs-6'>
    			<h1>New User? GET LOST!</h1>
				<form onSubmit= {props.signUpUser} >
					<p>First Name</p>
						<input id="a1" type="text" className="form-control col-md-2" onChange={props.handleFirst} aria-describedby="basic-addon1" />
					<p>Last Name</p>
						<input id="a2" type="text" className="form-control col-md-2" onChange={props.handleLast} aria-describedby="basic-addon1" />
					<p>Email</p>
						<input id="a1" type="text" className="form-control col-md-2" onChange={props.handleEmail} aria-describedby="basic-addon1" />
					<p>Password</p>
						<input id="a2" type="text" className="form-control col-md-2" onChange={props.handlePassword} aria-describedby="basic-addon1" />

					<span className="input-group-btn">
					   	<button className="btn btn-default" type="submit">Sign Up</button>
				    </span>
			    </form>
		    </div>
    	</div>
        
    </div>
  	)
}