import React, {Component} from 'react';
import store from '../store';
import Products from '../components/AllProducts';
import {connect} from 'react-redux';


const mapStateToProps = function(state){
  //console.log(state);
  //console.log(state.req.params)
  // state.products.filter((product) => {
    // if(product.region == req.)
  // })
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products)
