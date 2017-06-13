import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';



export default function Home (props) {
  const order = props.order
  console.log(order)
  return(
    <div className="row default-container">
    <div key={order.id} className="col-md-12 text-center">
          <ul className="list-group">
          <Link to={`/users/${order.UserId}`}>
          <li className="list-group-item" >Order Details: {order.id}</li>
          <li className="list-group-item" >Date Placed: {order.datePlaced.slice(0,10)}</li>
          </Link>
          <li className="list-group-item" >Status: 
            <form >
              <select defaultValue={order.status} value={order.id}>
              {
                props.statuses.map( status => {
                  return <option key={status} value={status}> {status}</option>
                })
              }

              </select>
              <button className='btn btn-default' type="submit"> Update </button>
            </form>
          </li>
          </ul>
      </div>
    </div>
    )

}