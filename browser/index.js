import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router'
import store from './store';
import { loginUser, receiveProducts, receiveUsers, getUsersOrders, receiveOrders, getUserById, getProductById, getOrderById, receiveReviews } from './action-creators'
import scss from '../index.scss';
import axios from 'axios'


import AppContainer from './containers/AppContainer'

import Landing from './components/Landing'
// import AppContainer from './containers/AppContainer'

// import AdminOrdersContainer from './containers/AdminOrdersContainer'
import CartContainer from './containers/CartContainer'
// import CheckoutContainer from './containers/CheckoutContainer'
import LoginContainer from './containers/LoginContainer'
// import OrderContainer from './containers/OrderContainer'
// import OrdersContainer from './containers/OrdersContainer'
import ProductContainer from './containers/ProductContainer'
import ProductsContainer from './containers/ProductsContainer'
import UserContainer from './containers/UserContainer'
import UsersContainer from './containers/UsersContainer'


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
    store.dispatch(loginUser(loggedInUser))
  })
}

const onUserEnter = function (nextRouterState) {
  console.log("entering!")
  const userId = nextRouterState.params.userId;
  store.dispatch(getUserById(userId));
  // store.dispatch(getUsersOrders(userId));
}

const onProductEnter = function (nextRouterState) {
  const productId = nextRouterState.params.productId;
  store.dispatch(getProductById(productId));
}

const onOrderEnter = function (nextRouterState) {
  const orderId = nextRouterState.params.orderId;
  store.dispatch(getOrderById(orderId));
}



ReactDOM.render(
  <Provider store={store}>
  	<Router history = {hashHistory}>
    <Route path='/landing' component = {Landing} />
  	<Route path='/' component = {AppContainer} onEnter={onAppEnter}>
        <IndexRoute path='/products' component={ProductsContainer} />
        <Route path='/products' component={ProductsContainer} />
        <Route path='/products/:productId' component= {ProductContainer} onEnter={onProductEnter}/>
        <Route path='/admin' component={UsersContainer} />
        <Route path='/users/:userId' component={UserContainer} onEnter={onUserEnter} />
        <Route path='/cart' component={CartContainer} />
        <Route path='/login' component={LoginContainer} />
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
