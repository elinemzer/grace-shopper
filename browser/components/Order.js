import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router'


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
			zipcode: this.props.user.zipcode,
			orderTotal: 0.00,
			discount: false,
			discountCode: ''
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
		this.addShippingInfoButton = this.addShippingInfoButton.bind(this);
		this.submitDiscountButton = this.submitDiscountButton.bind(this);
		this.onChangeDiscount = this.onChangeDiscount.bind(this);
	}


	onChangeDiscount(evt) {
		this.setState({'discountCode': evt.target.value})
	}

	submitDiscountButton(evt) {
        evt.preventDefault();
        if (this.state.discountCode.toUpperCase() === 'HOTGEOFF'){
        	this.setState({'discount': true})
        }
    }

	editEmailClick() {this.setState({'editEmail': true});}

	editAddressClick() {this.setState({'editAddress': true})}

	submitEmailButton(evt) {
		evt.preventDefault();
		this.props.submitEmail(this.state.email, this.props.user.id);
		this.setState({'editEmail': false})
	}

	addShippingInfoButton(evt){
		evt.preventDefault();
		this.props.updateShippingInfo(
			[
			this.props.order.id,
			{
				email: this.state.email,
				address1: this.state.address1,
				address2: this.state.address2,
				city: this.state.city,
				state: this.state.state,
				zipcode: this.state.zipcode
			}]
			)
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
		// calc order total with or without discount
		let total = 0;
		this.props.products && this.props.products.map(product => {
			total += product.Product_order.price * product.Product_order.quantity
		})
		if (this.state.discount) total = total/2;
		total = total.toFixed(2);


		const editStyle = {
			fontSize: 12,
			color: 'blue'
		};

		const user = this.props.user;
		if(this.props.order.datePlaced){
			this.props.order.datePlaced = this.props.order.datePlaced.slice(0, 10)
		}

		return(
		<div className="default-container">
		<div className="row">
		<div className="col-md-6">
			{
   				user.firstName?
   				''
   				:
                <div className="alert alert-danger" role="alert">
                  <strong>Alert!</strong> Your order will not be processed unless you add the following information
                </div>
            }
			<h2 className="fancy-type"> Shipping Details</h2>
			<div className="panel panel-default account-details">
			  <div className="panel-body">
			    <h4 className="inner-panel">Name: {user.firstName} {user.lastName}</h4>
			    {
			    	(!this.state.editEmail) ?
			    	<h4>Email: {user.email} <span onClick={this.editEmailClick} className="edit"> edit </span> </h4>
			    	:
			    	<div>
			    	<h4>Email: </h4>
			    	<span className="input-group">
			    		<form onSubmit={this.submitEmailButton} >
						  <input type="text" value={this.state.email}  className="form-control" onChange={this.onChangeEmail} aria-describedby="basic-addon1" />
						  <span className="input-group-btn">
						  {
						  	user.firstName && <button className="btn btn-default" type="submit">Change Email</button>
						  }

					      </span>
					      </form>
					</span>
					</div>
			    }
			    {

			    	(!this.state.editAddress) ?
			    	<div>
				    	<h4>Shipping Address:  <span onClick={this.editAddressClick} className="edit"> edit </span> </h4>
						    <h5> {user.address1} </h5>
						    {(user.address2) ? <h5> {user.address2} </h5> : null}
						    <h5> {user.city}, {user.state} {user.zipcode} </h5>
				    </div>
						: <div>
					    	<h4>Shipping Address: </h4>
					    	<span className="input-group">
					    		<form onSubmit={ user.firstName? this.submitAddressButton : this.addShippingInfoButton} >
									  <p>Address Line 1</p>
									  <input id="a1" type="text" value={this.state.address1} className="form-control col-md-2" onChange={this.onChangeAddress1}  aria-describedby="basic-addon1" />
									  <p>Address Line 2</p>
									  <input id="a2" type="text" value={this.state.address2}className="form-control col-md-2" onChange={this.onChangeAddress2} aria-describedby="basic-addon1" />
									  <p>City</p>
									  <input id="city" type="text" value={this.state.city}className="form-control col-md-2" onChange={this.onChangeCity} aria-describedby="basic-addon1" />
									  <p>State</p>
									  <input id="state" type="text" value={this.state.state}className="form-control col-md-2" onChange={this.onChangeState}  aria-describedby="basic-addon1" />
									  <p>Zipcode</p>
									  <input id="zip" type="text" value={this.state.zipcode}className="form-control col-md-2" onChange={this.onChangeZipcode}  aria-describedby="basic-addon1" />
										  <span className="input-group-btn">
										  {
										  	user.firstName && <button className="btn btn-default" type="submit">Change Address</button>
										  }
										  {
										  	user.firstName || <button className="btn btn-danger" type="submit">Add Shipping Info</button>
										  }

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
				<div className="panel panel-default account-details">
				  <div className="panel-body inner-panel">
					{
						this.props.order &&

								<ul className="list-group inner-panel">
									<li className="list-group-item inner-panel"><h3>Order Placed On: {this.props.order.datePlaced && this.props.order.datePlaced.slice(0,10)} </h3></li>
								  	{this.props.products && this.props.products.map((product, idx) => {
											return (<li key={idx} className="list-group-item account-details"><Link to={`/products/${product.id}`}><span className="col-md-4" style={{'textAlign': 'left'}}>{product.title}</span></Link>
														<span className="col-md-4" style={{'textAlign': 'center'}}>Quantity: {product.Product_order.quantity}</span>
														<span className="col-md-4" style={{'textAlign': 'right'}}>Price: {product.Product_order.price}</span></li>)
										})
									}
									<li className="list-group-item inner-panel">
										<form onSubmit={this.submitDiscountButton}>
                                    		<input id="discount" type="text" className="form-horizontal col-md-6" onChange={this.onChangeDiscount} aria-describedby="basic-addon1" />
                                    		<button id="discount-btn" className="btn btn-default" type="submit">Enter Discount Code</button>
                                    	</form>
                                    </li>
									<li className="list-group-item inner-panel" style={{'textAlign': 'right'}}><p>Order Total: ${this.props.order.Products && total} </p></li>
								</ul>


					}
    		</div>
    	</div>
			</div>
			</div>
		</div>)
	}
}
