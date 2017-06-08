import React from 'react';
import { Link } from 'react-router';

export default function AllProducts (props) {

  const fish = props.products;

  return (
  	<div className="container-fluid default-container">
      <h2 className="fancy-type" >Pick a tropical fish</h2>
      <div className="row">
      {
        fish && fish.map(oneFish => (
          <div id="product-tile" className="col-xs-4" key={ oneFish.id }>
            <Link className="thumbnail" to={`/products/${oneFish.id}`}>
              <img src={ oneFish.imageUrl } />
              <div className="caption">
                  <p id="product-tile-title">{ oneFish.title }</p>
                  <p>From { oneFish.region }</p>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  	)
}
