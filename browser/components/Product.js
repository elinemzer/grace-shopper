import React from 'react';
import { Link } from 'react-router';
import Review from './Review'

export default function AllProducts (props) {
	
  const fish = props.product;
	const reviews = props.reviews;

  return (
  	<div>
      <h3>{fish.title}</h3>
      <div className="row">
      
          <div className="col-xs-6" key={ fish.id }>
              <button className='btn-danger'> X </button>
              <button className='btn-primary'>
                <span className="glyphicon glyphicon-shopping-cart"></span> 
              </button>
              <img src={ fish.imageUrl } />



          </div>
          <div className="caption col-xs-6">
            <h5>
              <p className ="price">${ fish.price }</p>
              <p className ="region">From { fish.region }</p>
              <p className = "description">Field Notes: {fish.description}</p>
            </h5>
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