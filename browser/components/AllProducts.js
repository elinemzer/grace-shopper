import React from 'react';
import { Link } from 'react-router';

export default function AllProducts (props) {
	const fish = props.products;
	
  return (
  	<div>
      <h3>Pick a tropical fish</h3>
      <div className="row">
      {
        fish && fish.map(oneFish => (
          <div className="col-xs-4" key={ oneFish.id }>
            <Link className="thumbnail" to={`/albums/${oneFish.id}`}>
              <img src={ oneFish.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ oneFish.title }</span>
                  <span>{ oneFish.description }</span>
                  <span>From { oneFish.region }</span>
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