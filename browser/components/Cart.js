import React from 'react';
import { Link } from 'react-router';
import Product from './Product'

export default function Cart (props) {
  console.log(props)
  const cart = props.cart

  return (
	<div className='default-container'>
    {
      cart.map((product) => {
        return (
          <div key={product.id}>
            <img src={ product.imageUrl } className ="cart-item img-thumbnail"/>
            <span> {product.title} </span>
            <span> {product.price} </span>
            <div>
              <button>-</button>
              1
              <button>+</button>
            </div>
          </div>
        )
      })
    }
  </div>
  )	
}