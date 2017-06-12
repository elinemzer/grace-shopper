import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash'

export default function Cart (props) {

  const products = _.uniqBy(props.products, 'id').sort()
  const removeOrDecrement = function(event){
    props.removeOrDecrement(event.target.value)
  }
  const increment = function(event){
    props.increment(event.target.value)
  }
  const totalPrice = products.length === 0? 0 : products.map( item =>{
    return item.Cart && item.price * item.Cart.quantity
  }).reduce((a, b) => a + b)

  const checkoutHandler = function(){
    props.checkout(products)
  }
  return (
    <div className="container-fluid default-container">
      <h2 className="fancy-type" id="products-title">{`Total: $ ${totalPrice}`}</h2>
      <Link to='/order'>
      <button onClick={checkoutHandler} className="btn btn-success"> Checkout</button>
      </Link>
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
                  <input type='text' name='quantity' id='cart-quantity' value={oneFish.Cart && oneFish.Cart.quantity} />
                <button onClick={increment} className='btn btn-success inc' value={oneFish.id}> + </button>
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
