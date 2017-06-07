import React from 'react';
import { Link } from 'react-router';
import Review from './Review'

export default function AllProducts (props) {

  const fish = props.product;
	const reviews = props.reviews;

  return (
  	<div className="default-container">
      <div className="row">

          <div className="col-xs-6" key={ fish.id }>
              <img src={ fish.imageUrl } />

          </div>
          <div className="caption col-xs-6">
            <h2 id="product-title" className="fancy-type">{fish.title}</h2>
            <h5>
              <h4 className ="region fancy-type">{ fish.region }</h4>
              <p className = "description">Field Notes: {fish.description}</p>
              <p className ="price fancy-type">${ fish.price }</p>
            </h5>
            <button className='btn btn-primary' id="product-add">
                <span className="glyphicon glyphicon-shopping-cart"></span>
            </button>
            <button className='btn btn-danger' id='product-remove'> X </button>
          </div>
          <div className="reviews col-xs-12">
                { reviews &&
                  reviews.map((review) =>{
                    return <Review key={review.id}review={review} />
                  })
                }
          </div>

      </div>

    </div>
  	)
}
