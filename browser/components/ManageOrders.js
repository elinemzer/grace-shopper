import React, {Component} from 'react';
import { Link } from 'react-router'
import SingleOrder from './SingleOrder'


export default class ManageOrders extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        created: false,
        processing: false,
        cancelled: false,
        completed: false,
      }
      this.createdOrders = this.createdOrders.bind(this);
      this.processingOrders = this.processingOrders.bind(this);
      this.cancelledOrders = this.cancelledOrders.bind(this);
      this.completedOrders = this.completedOrders.bind(this);
      this.allOrders = this.allOrders.bind(this);
    }

    createdOrders() {
      this.setState({'created': true})
      this.setState({'completed': false})
      this.setState({'cancelled': false})
      this.setState({'processing': false})
    }

    processingOrders() {
      this.setState({'processing': true})
      this.setState({'created': false})
      this.setState({'completed': false})
      this.setState({'cancelled': false})
    }

    cancelledOrders() {
      this.setState({'cancelled': true})
      this.setState({'processing': false})
      this.setState({'created': false})
      this.setState({'completed': false})
    }

    completedOrders() {
      this.setState({'completed': true})
      this.setState({'cancelled': false})
      this.setState({'processing': false})
      this.setState({'created': false})
    }

    allOrders() {
      this.setState({'completed': false})
      this.setState({'cancelled': false})
      this.setState({'processing': false})
      this.setState({'created': false})
    }

    render() {
      let orders = this.props.orders;

      if (this.state.completed) { orders = orders.filter((o) => {return o.status==='Completed'}) }
      else if (this.state.cancelled){ orders = orders.filter((o) => {return o.status==='Cancelled'}) } 
      else if (this.state.processing) { orders = orders.filter((o) => {return o.status==='Processing'}) }
      else if (this.state.created) { orders = orders.filter((o) => {return o.status==='Created'}) }

      return (
          <div className="row default-container">
          <div className="account-details col-md-6 col-md-offset-3 text-center" style={{padding: 10}}>
            <button className="btn btn-default" onClick={this.createdOrders}>Created</button>
            <button className="btn btn-default" onClick={this.processingOrders}>Processing</button>
            <button className="btn btn-default" onClick={this.cancelledOrders}>Cancelled</button>
            <button className="btn btn-default" onClick={this.completedOrders}>Completed</button>
            <button className="btn btn-default" onClick={this.allOrders}>All Orders</button>
          </div>
          {
            orders && orders.map(order => {
              return ( <SingleOrder key={order.id} order={order} changeStatus={this.props.updateOrderStatus} /> )
            })
          }
        </div>)
      
    }
  }
