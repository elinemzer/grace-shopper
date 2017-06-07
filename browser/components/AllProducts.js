import React from 'react';
import { Link } from 'react-router';

export default function AllProducts (props) {

  const fish = props.products;

  return (
  	<div id="all-products" className="container-fluid">
      <h3>Pick a tropical fish</h3>
      <div className="row">
      {
        fish && fish.map(oneFish => (
          <div id="product-tile" className="col-xs-4" key={ oneFish.id }>
            <Link className="thumbnail" to={`/products/${oneFish.id}`}>
              <img src={ oneFish.imageUrl } />
              <div className="caption">
                <h5>
                  <p id="product-tile-title">{ oneFish.title }</p>
                  <p>From { oneFish.region }</p>
                </h5>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  	)
}
