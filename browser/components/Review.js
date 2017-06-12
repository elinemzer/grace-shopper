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
              <div className="review-tile">
                  <h4>{review.title}</h4>
                  <h5>{stars}</h5>
                  <h5>by {review.User.firstName} {review.User.lastName}</h5>
                  <li className="list-group-item review-content">{ review.content }</li>
              </div>
          </div>
      }
      </div>
    </div>
    )
}
