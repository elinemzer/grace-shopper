import React, { Component } from 'react';
import axios from 'axios'
import SingleProduct from './SingleProductAdminView'


export default (props) => {
	const products = props.products;

	return (
		<div className="row default-container">
			<h2 className="fancy-type" id="products-title">Manage Inventory</h2>
			{
				products && products.map(prod => {
					return (<SingleProduct fish={prod} deleteProduct={props.deleteFish} updateFish={props.updateFish} />)
				})

			}
		</div>
	)
}

