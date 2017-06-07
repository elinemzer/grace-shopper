import React from 'react';
import { Link } from 'react-router';

export default function AllProducts (props) {
	
  const review = props.review;
	
  return (
  	<div>
      <div className="row">
      {
          <div className="col-xs-12" key={ review.id }>
              
              <div className="review">
                <h5>
                  <p className ="userName">{review.user.email}</p>
                  <p className = "reviewTitle">{ review.title }</p>
                  <p className = "reviewRating">{ review.rating } *</p>
                  <p className = "reviewContent">{ review.content }</p>
                </h5>
              </div>
          </div>
        
      }
      </div>
    </div>
  	)
}