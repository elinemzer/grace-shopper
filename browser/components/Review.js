import React from 'react';
import { Link } from 'react-router';

export default function Review (props) {
  
  const review = props.review;
  let stars = [];
  for (let i = 0; i < review.rating; i++) {
    stars.push(<span className="ratingStar glyphicon glyphicon-star" aria-hidden="true"></span>)
  }

  return (
    <div>
      <div className="row">
      {
          <div key={ review.id }>
              <div className="review">
                <ul className="list-group">
                  <span>{review.title}</span> <span>{stars}</span>
                  <li className="list-group-item">by {review.User.firstName} {review.User.lastName}</li>
                  <li className="list-group-item">{ review.content }</li>
                </ul>
              </div>
          </div>
      }
      </div>
    </div>
    )
}