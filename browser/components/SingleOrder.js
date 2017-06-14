import React, {Component} from 'react';
import { Link } from 'react-router'

export default class SingleOrder extends Component {
	constructor(props) {
		super(props);
		this.onChangeStatus = this.onChangeStatus.bind(this);
	}

	 onChangeStatus(evt) {
	 	const bodyObj = {
	 		status: evt.target.value,
	 		datePlace: this.props.order.datePlaced,
	 		UserId: this.props.order.UserId
	 	}
	    this.props.changeStatus(this.props.order.id, bodyObj)
	  }

	render() {
		const order = this.props.order;

		return(
			<div key={order.id} className="account-details col-md-6 col-md-offset-3 text-center">
		        <ul className="account-details list-group">
		            <Link to={`/users/${order.UserId}`}>
		                <li className="account-details list-group-item">Order Details: Order #{order.id}</li>
		            </Link>
		                <li className="account-details list-group-item">Date Placed: {order.datePlaced.slice(0,10)}</li>
		                <li className="account-details list-group-item">Status: 
		                    <select style={{'color': 'black'}} defaultValue={order.status} onChange={this.onChangeStatus}>
		                        <option value="Created">Created</option>
		                        <option value="Processing">Processing</option>
		                        <option value="Cancelled">Cancelled</option>
		                        <option value="Completed">Completed</option>
		                    </select>
		                </li>
		        </ul>
	        </div>)

		
	}
}
