import React from 'react';
import { Link } from 'react-router';

export default function OrderStats (props) {

  let productCounts = props.products.map( product =>{
    return {
      id: product.id,
      title: product.title,
      count: 0
    }
  })
  props.productOrders &&
  props.productOrders.forEach(productOrder =>{
    productCounts.forEach( productObj => {
      if(productOrder.ProductId === productObj.id)
        productObj.count += productOrder.quantity
      
    })
  })

  console.log(productCounts)
  return (
    <div className="container-fluid default-container">
    <div className="row">
      <div className="panel panel-default col-md-6">

      <h4 className="yellow"> Product Order Totals </h4>
      <hr />
        <svg width="100vw" height="65vh" >
        {
          productCounts.map( (product, index ) => {
            return <rect fill="#e03c3c" y={(index+2)*20} width={product.count*100} height="5" />
          })
        }
        {
          productCounts.map( (product, index) =>{
            return <text fill="black" y={((index+2)*20)-.6} > {`${product.title} (${product.count})`}</text>
          })
        }

        </svg>
        </div>
      </div>
  </div>

  )
}
