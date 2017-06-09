import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash'

export default function Cart (props) {
  // let products = _.uniq(props.user.Products)
  const products = props.products
  
  console.log(products)
  return (
    <div className="container-fluid default-container">
      <h2 className="fancy-type" id="products-title">{props.user.firstName+'\'s Cart'}</h2>
      <div className="row">
      {
        products && products.map(oneFish => (
          <div id="product-tile" className="col-xs-4" key={ oneFish.id }>
            <Link className="thumbnail" to={`/products/${oneFish.id}`}>
              <img src={ oneFish.imageUrl } />
              <div className="caption">
                  <p id="product-tile-title">{ oneFish.title } ({ oneFish.region })</p>
                  <p className="yellow" id="product-tile-price">${oneFish.price}</p>
              </div>
              <div className ='quantity-control'>
              <button> - </button>
              <button> + </button>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
    )
}
