import React from 'react';
import { Link } from 'react-router';

export default function AllProducts (props) {
	
  const fish = props.product;
	
  return (
  	<div>
      <h3>The Fish You Clicked</h3>
      <div className="row">
      {
          <div className="col-xs-4" key={ fish.id }>
              <button className='btn-danger'> X </button>
              <button className='btn-primary'>
                <span className="glyphicon glyphicon-shopping-cart"></span> 
              </button>
              <img src={ fish.imageUrl } />

              <div className="caption">
                <h5>
                  <p>{ fish.title }</p>
                  <p>${ fish.price }</p>
                  <p>From { fish.region }</p>
                  <p>Field Notes: {fish.description}</p>
                </h5>
              </div>
          </div>
        
      }
      </div>
    </div>
  	)
}