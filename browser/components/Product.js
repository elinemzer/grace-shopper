import React from 'react';
import { Link } from 'react-router';
import Review from './Review'

export default class AllProducts extends React.Component  {
  constructor(props) {
    super(props);
    this.state={
      editForm: false
    }
    this.newReview = this.newReview.bind(this);
    this.reviewContentChange = this.reviewContentChange.bind(this);
  }

  newReview() {

  }

  reviewContentChange() {

  }

  render() {
    const fish = this.props.product;
    const reviews = this.props.reviews;
    console.log("fish reviews: ", reviews)
    return (
      <div className="default-container">
        <div className="row">
  
            <div className="col-xs-5" key={ fish.id }>
                <img id="single-product-img" src={ fish.imageUrl } />
  
            </div>
            <div className="caption col-xs-6">
              <h2 id="product-title" className="fancy-type">{fish.title}</h2>
              <h5>
                <h4 className ="region fancy-type">{ fish.region }</h4>
                <p className="description"><span id="field-notes">Field Notes:</span> {fish.description}</p>
                <p className ="price fancy-type yellow">${ fish.price }</p>
              </h5>
              <button className='btn btn-primary' id="product-add">
                  <span className="glyphicon glyphicon-shopping-cart"></span>
              </button>
              <button className='btn btn-danger' id='product-delete'> x </button>
            </div>
  
        </div>
  
        <div className="row">
          <div className="panel panel-default col-md-6">
              <div className="panel-body" style={{color: '#1c3151' }}>
  
                <div className="reviews">
                  <h2 className="fancy-type">User Reviews</h2>
                  { 
                    (reviews != undefined && reviews.length) ?
                    reviews.map((review) =>{
                      return <Review key={review.id} review={review} />
                    })
                    : <h4>No users have reviewed this product yet!</h4>
                  }
                  {
                    (!this.state.editForm) ? <button type="button" className="btn btn-primary" onClick={() => this.setState({'editForm': 'true'})}>Leave a Review</button>
                    : <div className='form-group'>
                      <form onSubmit={this.newReview}>
                        <input type="text" className="form-control" placeholder="Review Title" />
                        <textarea height='100' width='100' className='form-control' onChange={this.reviewContentChange}></textarea>
                      </form>
                      </div>
                  }
                  
                </div>
  
              </div>
            </div>
        </div>
  
      </div>
      )
  }
}
