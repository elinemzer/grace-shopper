import React, {Component} from 'react';
import { Link } from 'react-router'


export default (props) => {
  const orders = props.orders
  const editStyle = {
			fontSize: 12,
			color: 'blue'
		};

		return (
      <div className="row default-container">
			{
				orders && orders.map(order => {
					return (
						<div key={order.id} className="col-md-12 text-center">
              <ul className="list-group">
              <Link to={`/users/${order.UserId}`}>
              <li className="list-group-item" style={editStyle}>Order Details: {order.id}</li>
              <li className="list-group-item" style={editStyle}>Date Placed: {order.datePlaced.slice(0,10)}</li>
              <li className="list-group-item" style={editStyle}>Status: {order.status}</li>
                </Link>
              </ul>
      </div>)
    })
	}
  </div>)
}
