import React from 'react';
import { Link } from 'react-router';

export default function PasswordReset (props) {


  return (
  	<div className='login-container'>
    	<div className="row">
    		<div className='col-xs-5' id="line">
    			<h1 className="fancy-type form-title">Reset Your Password</h1>
              {
                props.flashMessage &&
                <div className="alert alert-success" role="alert">
                  <strong>Success!</strong> {props.flashMessage}
                </div>
              }

          <h1 className="form-subtitle">Sign in</h1>
				<form onSubmit={props.loginUser}>
					<p>Email</p>
						<input id="a1" type="text" className="form-control col-md-2" onChange={props.handleEmail} aria-describedby="basic-addon1" />
					<p>Old Password</p>
						<input id="a2" type="text" className="form-control col-md-2" onChange={props.handlePassword} aria-describedby="basic-addon1" />
					<p>New Password</p>
            <input id="a2" type="text" className="form-control col-md-2" onChange={props.handleNewPassword} aria-describedby="basic-addon1" />
          <span className="input-group-btn">
					<button onClick={props.updatePass} className="btn btn-default login-btn" type="submit">Reset</button>
				  </span>
			   </form>
		    </div>
      </div>
  </div>
  	)
}
