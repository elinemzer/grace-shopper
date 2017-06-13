import React, { Component } from 'react';
import axios from 'axios'


export default class SingleProd extends Component {

	constructor(props) {
		super(props);
		this.state = {
			editFish: false,
			name: this.props.fish.title,
			notes: this.props.fish.description,
			region: this.props.fish.region,
			img: this.props.fish.imageUrl,
			price: this.props.fish.price,
			outOfStock: this.props.fish.outOfStock
		}
		this.toggleEdit = this.toggleEdit.bind(this);
		this.submitChanges = this.submitChanges.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeNotes = this.onChangeNotes.bind(this);
		this.onChangeImg = this.onChangeImg.bind(this);
		this.onChangePrice = this.onChangePrice.bind(this);
		this.onChangeRegion = this.onChangeRegion.bind(this);
		this.outOfStock = this.outOfStock.bind(this);
	}

	toggleEdit() { this.setState({'editFish': !this.state.editFish}) }

	submitChanges(evt) {
		evt.preventDefault();
		this.toggleEdit();
		const bodyObj = {
			title: this.state.name,
			description: this.state.notes,
			region: this.state.region,
			imageUrl: this.state.img,
			price: this.state.price,
			outOfStock: this.props.fish.outOfStock
		}
		this.props.updateFish(bodyObj, this.props.fish.id)
	}

	onChangeName(evt) { this.setState({'name': evt.target.value}) }
	onChangeNotes(evt) { this.setState({'notes': evt.target.value}) }
	onChangeRegion(evt) { this.setState({'region': evt.target.value})}
	onChangeImg(evt) { this.setState({'img': evt.target.value}) }
	onChangePrice(evt) { this.setState({'price': evt.target.value}) }

	outOfStock(evt) {
		evt.preventDefault();
		this.toggleEdit();
		const bodyObj = {
			title: this.state.name,
			description: this.state.notes,
			region: this.state.region,
			imageUrl: this.state.img,
			price: this.state.price,
			outOfStock: !this.props.fish.outOfStock
		}
		this.props.updateFish(bodyObj, this.props.fish.id)
	}

	render() {
		const editStyle = {
			fontSize: 12,
			color: 'blue'
		};
			
		const labelStyle = {
			textDecoration: 'underline'
		}
			
		const prod = this.props.fish;
			
		return (
			<div key={prod.id} className="col-sm-6 text-center">

				{
					(!this.state.editFish) ?
						<ul className="list-group" style={{color: 'black'}}>
							<li className="list-group-item" style={{fontSize: 18}}><span style={labelStyle}>Fish Name</span>: {prod.title} <span onClick={this.toggleEdit} style={editStyle}>  edit </span></li>
							{
								(prod.description.length>50) ? <li className="list-group-item"><span style={labelStyle}>Field Notes:</span> {prod.description.substring(0, 50).concat("...")}</li>
								: <li className="list-group-item"><span style={labelStyle}>Field Notes:</span> {prod.description}</li>
							}
							<li className="list-group-item"><span style={labelStyle}>Native Region</span>: {prod.region}</li>
							<li className="list-group-item"><span style={labelStyle}>Sample Image URL</span>: {prod.imageUrl}</li>
							<li className="list-group-item"><span style={labelStyle}>Price</span>: ${prod.price}</li>
						</ul>
						: <ul className="list-group" style={{color: 'black'}}> 
							<form onSubmit={this.submitChanges}>
								<li className="list-group-item container-fluid"><label htmlFor='regions'>Fish Name: </label><input type="text" id='regions' className="form-control col-md-6" onChange={this.onChangeName} defaultValue={prod.title} aria-describedby="basic-addon1" /></li>
								<li className="list-group-item container-fluid">Field Notes:
									<textarea height='50' width='100'className="form-control col-md-6 " onChange={this.onChangeNotes} defaultValue={prod.description} aria-describedby="basic-addon1" />
								</li>
								<li className="list-group-item">Native Region: 
									<select defaultValue={prod.region} onChange={this.onChangeRegion}>
										<option value="Africa">Africa</option>
										<option value="Asia">Asia</option>
										<option value="Australia">Australia</option>
										<option value="Europe">Europe</option>
										<option value="North America">North America</option>
										<option value="South America">South America</option>
									</select>
								</li>
								<li className="list-group-item container-fluid">Sample Image URL: <input type="text" className="form-control col-md-6" onChange={this.onChangeImg} defaultValue={prod.imageUrl} aria-describedby="basic-addon1" /></li>
								<li className="list-group-item container-fluid">Price (USD): <input type="number" step="0.01" className="form-control col-md-10" onChange={this.onChangePrice} defaultValue={prod.price} aria-describedby="basic-addon1" /></li>
								<li className="list-group-item container-fluid">
									<button type='submit' className="btn btn-default">Save Changes</button><button className="btn btn-default" onClick={this.toggleEdit}>Cancel</button><button className="btn btn-default" onClick={this.outOfStock}>{ (this.state.outOfStock) ? <span>Back In Stock</span> : <span>Out of Stock</span>}</button>
									<button className="btn btn-danger" onClick={() => this.props.deleteProduct(prod.id)}>Delete</button>
								</li>
							</form>
						</ul>
				}
			</div>)
	}

}