import React from 'react';
import { Link } from 'react-router';

export default function AllProducts (props) {
  const region = props.routeParams.region;
  let fish;
  let title;
  if (region) {
    // splitting title on the space for 'north america' and 'south america'
     if(region.indexOf('america') > 0){
      title = region.slice(0, 5) + ' ' + region.slice(5);
    } else {
      title = region;
    }
    fish = props.products.filter( fish => {
      return fish.region.split(' ').join('').toLowerCase() == region.toLowerCase();
    })
  } else {
    fish = props.products;
    title = 'Our current selection';
  }

  return (
  	<div className="container-fluid default-container">
      <h2 className="fancy-type" id="products-title">{ title }</h2>
      <div className="row">
      {
        fish && fish.map(oneFish => (
          <div id="product-tile" className="col-xs-12 col-sm-6 col-md-6 col-lg-4" key={ oneFish.id }>
            <Link className="thumbnail" to={`/products/${oneFish.id}`}>
              <img src={ oneFish.imageUrl } />
              <div className="caption">
                  <p id="product-tile-title">{ oneFish.title }</p>
                  <p id="product-tile-subtitle">({ oneFish.region })</p>
                  <p className="yellow" id="product-tile-price">${ oneFish.price }</p>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  	)
}
