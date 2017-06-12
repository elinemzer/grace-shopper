import React, { Component } from 'react';
import axios from 'axios'


export default class MangeProducts extends Component {
	constructor(props) {
		super(props);
		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit() {

	}

	render() {

		const editStyle = {
			fontSize: 12,
			color: 'blue'
		};

		return (
			<div className="row default-container">
			{
				this.props.products && this.props.products.map(prod => {
					return (
						<div key={prod.id} className="col-sm-6 text-center">
						<p>
							{prod.title} <span onClick={this.handleEdit} style={editStyle}> edit </span>
						</p>
						</div>
						)
				})
			}
			</div>
			)
	}
}