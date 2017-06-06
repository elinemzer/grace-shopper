import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router'
import store from './store';
// import scss from '../index.scss';
// import db from '../server/models';


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
// import ProductsContainer from './containers/ProductsContainer'
// import UserContainer from './containers/UserContainer'
// import UsersContainer from './containers/UsersContainer'

//comment
ReactDOM.render(
  <Provider store={store}>
  	<Router history = {browserHistory}>
  		<Route path='/' component = {AppContainer}>
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
