import React from 'react';
import ReactDOM from 'react-dom';
// if (process.env.NODE_ENV === 'development') {
//   require('../secrets'); // this will mutate the process.env object with your secrets.
// }
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router'
import store from './store';
import {getProductOrders, getProducts, receiveCart, getCartByUser, loginUser, receiveProducts, receiveUsers, getUsersOrders, receiveOrders, getUserById, getProductById, getOrderById, receiveReviews } from './action-creators'
import scss from '../index.scss';
import axios from 'axios';

// if (process.env.NODE_ENV === 'development') {
//   require('../secrets'); // this will mutate the process.env object with your secrets.
// }


import AppContainer from './containers/AppContainer'
import Landing from './components/Landing'
import AdminHome from './components/AdminHome'
import CartContainer from './containers/CartContainer'
// import CheckoutContainer from './containers/CheckoutContainer'
import LoginContainer from './containers/LoginContainer'
import OrderContainer from './containers/OrderContainer'
import OrderStatsContainer from './containers/OrderStatsContainer'
import ProductContainer from './containers/ProductContainer'
import ProductsContainer from './containers/ProductsContainer'
import UserContainer from './containers/UserContainer'
import UsersContainer from './containers/UsersContainer'
import RegionContainer from './containers/RegionContainer'
import PasswordResetContainer from './containers/PasswordResetContainer'
import Home from './components/Home'
import ManageProductsContainer from './containers/ManageProductsContainer'
import ManageOrdersContainer from './containers/ManageOrdersContainer'


const onAppEnter = function () {
  Promise.all([
    axios.get('api/users'),
    axios.get('api/products'),
    axios.get('api/orders'),
    axios.get('api/reviews'),
    axios.get('/api/auth/me')
  ])
  .then(responses => responses.map(r => r.data))
  .then(([users, products, orders, reviews, loggedInUser]) => {
    store.dispatch(receiveUsers(users));
    store.dispatch(receiveProducts(products));
    store.dispatch(receiveOrders(orders));
    store.dispatch(receiveReviews(reviews));
    if (loggedInUser.email) store.dispatch(loginUser(loggedInUser))
    //user is not logged in, so we are only receiving a cart from the session cart
    else store.dispatch(receiveCart(loggedInUser))


  })
}

const onUserEnter = function (nextRouterState) {
  const userId = nextRouterState.params.userId;
  store.dispatch(getUserById(userId));
}

const onProductEnter = function (nextRouterState) {
  const productId = nextRouterState.params.productId;
  store.dispatch(getProductById(productId));
}

const onOrderEnter = function (nextRouterState) {
  const orderId = nextRouterState.params.orderId;
  store.dispatch(getOrderById(orderId));
}

const onStatsEnter = function() {
  console.log('entered stats')
 store.dispatch(getProductOrders())
}

// const onCartEnter = function (nextRouterState) {
//   const userId = nextRouterState.params.userId

//   store.dispatch(getCartByUser(userId));
// }



ReactDOM.render(
  <Provider store={store}>
  	<Router history = {hashHistory}>
    <Route path='/landing' component = {Landing} />
  	<Route path='/' component = {AppContainer} onEnter={onAppEnter}>
        <IndexRoute path='/home' component={Home} />
        <Route path="/home" component={Home} />
        <Route path='products/region/:region' component={RegionContainer} />
        <Route path='/products' component={ProductsContainer} onEnter={onAppEnter}/>
        <Route path='/products/:productId' component= {ProductContainer} onEnter={onProductEnter}/>
        <Route path='/admin' component={AdminHome} />
        <Route path='/admin/users' component={UsersContainer} />
        <Route path='/admin/products' component={ManageProductsContainer} />
        <Route path='/admin/orders' component={ManageOrdersContainer} />
        <Route path='/users/:userId' component={UserContainer} onEnter={onUserEnter} />
        <Route path='/cart' component={CartContainer} />
        <Route path='/login' component={LoginContainer} />
        <Route path='/order' component={OrderContainer} />
        <Route path='/passwordreset' component={PasswordResetContainer} />
        <Route path='/admin/orderstats' component={OrderStatsContainer} onEnter={onStatsEnter} />
  	</Route>
	  </Router>
  </Provider>,
  document.getElementById('app') // make sure thisa is the same as the id of the div in your index.html
);



//<Route path='/' component = {Landing} />
//<Route path='/home' component = {AppContainer} onEnter = {onAppEnter}>
// <Route path='/products' component={ProductsContainer} />
// <Route path='/produts/:productId' component= {ProductContainer} />
// <Route path='/cart' component={CartContainer} />
// <Route path='/login' component={LoginContainer} />
// <Route path='/checkout' component={CheckoutContainer} />
// <Route path='/orders' component={OrdersContainer} />
// <Route path='/orders/:orderId' component={OrderContainer} />
// <Route path='/users' component={UsersContainer} />
// <Route path='/users/:userId' component={UserContainer} />
// <Route path='/allorders' component={AdminOrdersContainer} />
