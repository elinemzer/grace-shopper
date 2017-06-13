import React, {Component} from 'react';
import { Link } from 'react-router'
import SingleOrder from './SingleOrder'


export default (props) =>  {
    const orders = props.orders

    return (
      <div className="row default-container">
      {
        orders && orders.map(order => {
          return ( <SingleOrder key={order.id} order={order} changeStatus={props.updateOrderStatus} /> )
        })
      }
    </div>)
  }
