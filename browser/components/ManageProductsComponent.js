import React, { Component } from 'react';
import axios from 'axios'
import SingleProduct from './SingleProductAdminView'


export default class ManageProducts extends Component{
	
	constructor(props) {
		super(props);

		this.state = {
			addProd: false,
			name: '',
			notes: '',
			region: 'Africa',
			img: '',
			price: 0.00
		}
		
		this.toggleAddProduct = this.toggleAddProduct.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeNotes = this.onChangeNotes.bind(this);
		this.onChangeRegion = this.onChangeRegion.bind(this);
		this.onChangeImg = this.onChangeImg.bind(this);
		this.onChangePrice = this.onChangePrice.bind(this);
		this.submitNewProduct = this.submitNewProduct.bind(this);
	}

	toggleAddProduct() { this.setState({'addProd': !this.state.addProd}) }
	onChangeName(evt) { this.setState({'name': evt.target.value}) }
	onChangeNotes(evt) { this.setState({'notes': evt.target.value}) }
	onChangeRegion(evt) { this.setState({'region': evt.target.value}) }
	onChangeImg(evt) { this.setState({'img': evt.target.value}) }
	onChangePrice(evt) { this.setState({'price': evt.target.value}) }

	submitNewProduct(evt) {
		evt.preventDefault();
		const bodyObj = {
			title: this.state.name,
			description: this.state.notes,
			region: this.state.region,
			imageUrl: this.state.img,
			price: +this.state.price
		}
		this.props.handleSubmitNewProduct(bodyObj);
		this.setState({'addProd': false});
	}




	render() {
		const products = this.props.products;
		console.log(this.state);
		return (
			<div className="row default-container">
				<h2 className="fancy-type" id="products-title">Manage Inventory
					<span>  <button onClick={this.toggleAddProduct} className="btn btn-md btn-default">+</button></span>
				</h2>
				{
					(this.state.addProd) ? 
					<div className="row">
					<ul className="list-group col-md-6 col-md-offset-3" style={{color: 'black'}}> 
							<form onSubmit={this.submitNewProduct}>
								<li className="list-group-item container-fluid"><label htmlFor='regions'>Fish Name: </label><input type="text" id='regions' className="form-control col-md-6" onChange={this.onChangeName} aria-describedby="basic-addon1" /></li>
								<li className="list-group-item container-fluid">Field Notes:
									<textarea height='50' width='100'className="form-control col-md-6 " onChange={this.onChangeNotes} aria-describedby="basic-addon1" />
								</li>
								<li className="list-group-item">Native Region: 
									<select defaultValue="Africa" onChange={this.onChangeRegion}>
										<option value="Africa">Africa</option>
										<option value="Asia">Asia</option>
										<option value="Australia">Australia</option>
										<option value="Europe">Europe</option>
										<option value="North America">North America</option>
										<option value="South America">South America</option>
									</select>
								</li>
								<li className="list-group-item container-fluid">Sample Image URL: <input type="text" className="form-control col-md-6" onChange={this.onChangeImg} aria-describedby="basic-addon1" /></li>
								<li className="list-group-item container-fluid">Price (USD): <input type="number" step="0.01" className="form-control col-md-10" onChange={this.onChangePrice} aria-describedby="basic-addon1" /></li>
								<li className="list-group-item container-fluid">
									{
										(this.state.name=='' || this.state.notes=='' || this.state.region=='' || this.state.img=='' || this.state.price==0.00) ?
											<div>
												<button type='submit' className="btn btn-default" disabled>Save Changes</button>
												<button className="btn btn-default" onClick={this.toggleAddProduct}>Cancel</button>
												<span> All fields are required</span>
											</div>
										: <div>
											<button type='submit' className="btn btn-default">Save Changes</button>
											<button className="btn btn-default" onClick={this.toggleAddProduct}>Cancel</button>
										  </div>
									}
								</li>
							</form>
						</ul>
						</div>
					: null
				}
				{
					products && products.map(prod => {
						return (<SingleProduct fish={prod} deleteProduct={this.props.deleteFish} updateFish={this.props.updateFish} />)
					})

				}
			</div>)
		
	}
}

