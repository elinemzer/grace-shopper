import React, { Component } from 'react';
import axios from 'axios'


export default class Order extends Component {


	constructor(props) {
		super(props);
		this.state = {
			editEmail: false,
			editAddress: false,
			email: this.props.user.email,
			address1: this.props.user.address1,
			address2: this.props.user.address2,
			city: this.props.user.city,
			state: this.props.user.state,
			zipcode: this.props.user.zipcode
		}
		this.editEmailClick = this.editEmailClick.bind(this);
		this.submitEmailButton = this.submitEmailButton.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.editAddressClick = this.editAddressClick.bind(this);
		this.onChangeAddress1 = this.onChangeAddress1.bind(this);
		this.onChangeAddress2 = this.onChangeAddress2.bind(this);
		this.onChangeCity = this.onChangeCity.bind(this);
		this.onChangeState = this.onChangeState.bind(this);
		this.onChangeZipcode = this.onChangeZipcode.bind(this);
		this.submitAddressButton = this.submitAddressButton.bind(this);
	}


  calculateOrderTotal(order) {
		let total = 0;
		this.props.products && this.props.products.map(product => {
			total += product.Product_order.price * product.Product_order.quantity
		})
		return total.toFixed(2);
	}

	editEmailClick() {this.setState({'editEmail': true});}

	editAddressClick() {this.setState({'editAddress': true})}

	submitEmailButton(evt) {
		evt.preventDefault();
		this.props.submitEmail(this.state.email, this.props.user.id);
		this.setState({'editEmail': false})
	}

	submitAddressButton(evt) {
		evt.preventDefault();
		const bodyObj = {
			address1: this.state.address1,
			address2: this.state.address2,
			city: this.state.city,
			state: this.state.state,
			zipcode: this.state.zipcode
		}
		this.props.submitAddress(bodyObj, this.props.user.id);
		this.setState({'editAddress': false})
	}

	onChangeEmail(evt) {this.setState({'email': evt.target.value})}

	onChangeAddress1(evt) {this.setState({'address1': evt.target.value})}

	onChangeAddress2(evt) {this.setState({'address2': evt.target.value})}

	onChangeCity(evt) {this.setState({'city': evt.target.value})}

	onChangeState(evt) {this.setState({'state': evt.target.value})}

	onChangeZipcode(evt) {this.setState({'zipcode': evt.target.value})}

	render() {
		const editStyle = {
			fontSize: 12,
			color: 'blue'
		};

		const user = this.props.user;
		console.log('userOrder: ', user.Orders)

		return(
		<div className="default-container">
		<div className="row">
		<div className="col-md-6">
			<h2 className="fancy-type"> Shipping Details</h2>
			<div className="panel panel-default">
			  <div className="panel-body" style={{color: '#1c3151' }}>
			    <h4>Name: {user.firstName} {user.lastName}</h4>
			    {
			    	(!this.state.editEmail) ?
			    	<h4>Email: {user.email} <span onClick={this.editEmailClick} style={editStyle}> edit </span> </h4>
			    	:
			    	<div>
			    	<h4>Email: </h4>
			    	<span className="input-group">
			    		<form onSubmit={this.submitEmailButton} >
						  <input type="text" className="form-control" onChange={this.onChangeEmail} defaultValue={user.email} aria-describedby="basic-addon1" />
						  <span className="input-group-btn">
					        <button className="btn btn-default" type="submit">Change Email</button>
					      </span>
					      </form>
					</span>
					</div>
			    }
			    {
			    	(!this.state.editAddress) ?
			    	<div>
				    	<h4>Shipping Address:  <span onClick={this.editAddressClick} style={editStyle}> edit </span> </h4>
						    <h5> {user.address1} </h5>
						    {(user.address2) ? <h5> {user.address2} </h5> : null}
						    <h5> {user.city}, {user.state} {user.zipcode} </h5>
				    </div>
						: <div>
					    	<h4>Shipping Address: </h4>
					    	<span className="input-group">
					    		<form onSubmit={this.submitAddressButton} >
									  <p>Address Line 1</p>
									  <input id="a1" type="text" className="form-control col-md-2" onChange={this.onChangeAddress1} defaultValue={user.address1} aria-describedby="basic-addon1" />
									  <p>Address Line 2</p>
									  <input id="a2" type="text" className="form-control col-md-2" onChange={this.onChangeAddress2} defaultValue={user.address2} aria-describedby="basic-addon1" />
									  <p>City</p>
									  <input id="city" type="text" className="form-control col-md-2" onChange={this.onChangeCity} defaultValue={user.city} aria-describedby="basic-addon1" />
									  <p>State</p>
									  <input id="state" type="text" className="form-control col-md-2" onChange={this.onChangeState} defaultValue={user.state} aria-describedby="basic-addon1" />
									  <p>Zipcode</p>
									  <input id="zip" type="text" className="form-control col-md-2" onChange={this.onChangeZipcode} defaultValue={user.zipcode} aria-describedby="basic-addon1" />
										  <span className="input-group-btn">
									        <button className="btn btn-default" type="submit">Change Address</button>
								      </span>
							    </form>
							</span>
					</div>
			    }
			  </div>
				</div>
			</div>


			<div className="col-md-6">
			<h2 className="fancy-type">Your Order</h2>
				<div className="panel panel-default">
				  <div className="panel-body" style={{color: '#1c3151' }}>
					{
						this.props.order &&
							
								<ul className="list-group">
								<li className="list-group-item"><h3>Order Placed On: {this.props.order && this.props.order.datePlaced} </h3></li>
								  {this.props.products && this.props.products.map((product, idx) => {
											return (<li key={idx} className="list-group-item"><p><span className="col-md-4" style={{'textAlign': 'left'}}>{product.title} </span><span className="col-md-4" style={{'textAlign': 'center'}}>Quantity: {product.Product_order.quantity}</span><span className="col-md-4" style={{'textAlign': 'right'}}>Price: {product.Product_order.price}</span></p></li>)
										})
									}
									<li className="list-group-item" style={{'textAlign': 'right'}}><p>Order Total: ${this.props.order.Products && this.calculateOrderTotal(this.props.order)} </p></li>
								</ul>
						

					}
    		</div>
    	</div>
			</div>
			</div>
		</div>)
	}
}
