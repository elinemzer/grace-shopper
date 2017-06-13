import React, {Component} from 'react';
import store from '../store';
import Products from '../components/AllProducts';
import {connect} from 'react-redux';


const mapStateToProps = function(state){
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products)
