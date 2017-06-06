import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router'
import store from './store';
import { receiveProducts, receiveUsers, receiveOrders, getUserById, getProductById, getOrderById } from './action-creators'
import scss from '../index.scss';
import axios from 'axios'


import AppContainer from './containers/AppContainer'

import Landing from './components/Landing'
// import AppContainer from './containers/AppContainer'

// import AdminOrdersContainer from './containers/AdminOrdersContainer'
// import CartContainer from './containers/CartContainer'
// import CheckoutContainer from './containers/CheckoutContainer'
// import LoginContainer from './containers/LoginContainer'
// import OrderContainer from './containers/OrderContainer'
// import OrdersContainer from './containers/OrdersContainer'
// import ProductContainer from './containers/ProductContainer'
import ProductsContainer from './containers/ProductsContainer'
// import UserContainer from './containers/UserContainer'
// import UsersContainer from './containers/UsersContainer'


const onAppEnter = function () {
  Promise.all([
    axios.get('api/users'),
    axios.get('api/products'),
    axios.get('api/orders')
  ])
  .then(responses => responses.map(r => r.data))
  .then(([users, products, orders]) => {
    store.dispatch(receiveUsers(users));
    store.dispatch(receiveProducts(products));
    store.dispatch(receiveOrders(orders));
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



ReactDOM.render(
  <Provider store={store}>
  	<Router history = {browserHistory}>
    <Route path='/landing' component = {Landing} />
  	<Route path='/' component = {AppContainer} onEnter={onAppEnter}>
        <IndexRoute path='/products' component={ProductsContainer} />
        <Route path='/products' component={ProductsContainer} />
  	</Route>
	  </Router>
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
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
