// import React, { Component } from 'react';
// import Navbar from '../components/Navbar';
// import AllProducts from '../components/AllProducts';
// import { connect } from 'react-redux';
// import { searchProducts } from '../action-creators';
//
// const mapStateToProps = (state) => {
//   return {
//     products: state.products.products
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     searchProducts ({ inputValue }) {
//       dispatch(searchProducts(inputValue));
//     }
//   };
// };
//
// class FilterableProducts extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { inputValue: '' };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChange(evt) {
//     const inputValue = evt.target.value;
//     this.setState({ inputValue });
//   }
//
//   handleSubmit (evt) {
//   evt.preventDefault();
//   if (this.state.inputValue){
//     this.props.searchProducts(this.state)
//   }
// }
//
//   render() {
//
//     return (
//       <div>
//         <Navbar handleChange={this.handleChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
//       </div>
//     )
//   }
// }
//
//   export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
