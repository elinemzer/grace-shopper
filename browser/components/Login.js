import React from 'react';
import { Link } from 'react-router';

export default function Login (props) {

	console.log(props)

  return (
  	<div className='login-container'>
    	<div className="row">
    		<div className='col-xs-5' id="line">
    			<h1 className="fancy-type form-title">Returning User?</h1>
          <h1 className="form-subtitle">Sign in</h1>
				<form onSubmit={props.loginUser}>
					<p>Email</p>
						<input id="a1" type="text" className="form-control col-md-2" onChange={props.handleEmail} aria-describedby="basic-addon1" />
					<p>Password</p>
						<input id="a2" type="text" className="form-control col-md-2" onChange={props.handlePassword} aria-describedby="basic-addon1" />
					<span className="input-group-btn">
					   	<button className="btn btn-default login-btn" type="submit">Sign In</button>
				    </span>
			    </form>
		    </div>
    <div className="col-md-2">
    </div>
		<div className='col-xs-5 signup'>
    			<h1 className="fancy-type form-title">New User?</h1>
          <h1 className="form-subtitle">Sign Up</h1>
				<form onSubmit= {props.signUpUser} >
          <div className="signup-names">
  					<p>First Name</p>
  						<input id="a1" type="text" className="form-control col-md-2" onChange={props.handleFirst} aria-describedby="basic-addon1" />
          </div>
          <div className="signup-names" id="last-name">
					<p>Last Name</p>
						<input id="a2" type="text" className="form-control col-md-2" onChange={props.handleLast} aria-describedby="basic-addon1" />
          </div>
					<p>Email</p>
						<input id="a1" type="text" className="form-control col-md-2" onChange={props.handleEmail} aria-describedby="basic-addon1" />
					<p>Password</p>
						<input id="a2" type="text" className="form-control col-md-2" onChange={props.handlePassword} aria-describedby="basic-addon1" />

					<span className="input-group-btn">
					   	<button className="btn btn-default login-btn" type="submit">Sign Up</button>
				    </span>
			    </form>
		    </div>
    	</div>

    </div>
  	)
}
