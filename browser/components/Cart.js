import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash'

export default function Cart (props) {
  console.log(props)
  const products = _.uniqBy(props.products, 'id')
  const removeOrDecrement = function(event){
    props.removeOrDecrement(event.target.value)
  }
  
  return (
    <div className="container-fluid default-container">
      <h2 className="fancy-type" id="products-title">{props.user.firstName + '\'s Cart'}</h2>
      <div className="row">
      {
        products && products.map(oneFish => (
          <div id="product-tile" className="col-xs-4" key={ oneFish.id }>
            <Link className="thumbnail" to={`/cart`}>
              <img src={ oneFish.imageUrl } />
              <div className="caption">
                  <p id="product-tile-title">{ oneFish.title } ({ oneFish.region })</p>
                  <p className="yellow" id="product-tile-price">${oneFish.price}</p>
              </div>
              <div className ='quantity-control'>
              <form method='post' action=''>
                <button onClick={removeOrDecrement} className='btn btn-danger dec' value={oneFish.id}> - </button>
                  <input type='text' name='quantity' id='cart-quantity' value={oneFish.Cart.quantity} />
                <button className='btn btn-success inc' value={oneFish.id}> + </button>
              </form>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
    )
}
