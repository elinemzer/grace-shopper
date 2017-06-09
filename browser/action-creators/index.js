import axios from "axios";

/* CONSTANTS - ACTION TYPES */
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_ORDERS = "RECEIVE_ORDERS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS"
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT"
export const RECEIVE_CART = "RECEIVE_CART"
export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS"
export const RECEIVE_REVIEW = "RECEIVE_REVIEW"
export const LOGIN_USER = "LOGIN_USER"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const LOGOUT_USER = 'LOGOUT_USER'
export const ADD_REVIEW = 'ADD_REVIEW'
export const DELETE_USER = 'DELETE_USER'

/* ACTION CREATORS */
export const logoutUser = user =>({
  type: LOGOUT_USER,
  user: {}
})

export const loginUser = user => ({
  type: LOGIN_USER,
  user
})

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

export const receiveOrders = orders => ({
  type: RECEIVE_ORDERS,
  orders
})

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products
})

export const deleteUser = user => ({
  type: DELETE_USER,
  user
})

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const receiveProduct = product => ({
  type: RECEIVE_PRODUCT,
  product
})

export const receiveOrder = order => ({
  type: RECEIVE_ORDER,
  order
})

export const receiveCart = cart => ({
  type: RECEIVE_CART,
  cart
})


export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
})

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
})

export const addReview = review => ({
  type: ADD_REVIEW,
  review
})


/* ASYNC THUNK ACTION CREATORS */
export const getUserById = userId => {
  return dispatch => {
    axios.get(`/api/users/${userId}`)
    .then(response => {
      dispatch(receiveUser(response.data));
    });
  }
}

export const getProductById = productId => {
  return dispatch => {
    axios.get(`/api/products/${productId}`)
    .then(response => {
      dispatch(receiveProduct(response.data));
    });
  }
}

export const getOrderById = orderId => {
  return dispatch => {
    axios.get(`/api/order/${orderId}`)
    .then(response => {
      dispatch(receiveOrder(response.data));
    });
  }
}


export const updateUser = (userId, bodyObj) => {
  return dispatch => {
    axios.put(`/api/users/${userId}`, bodyObj)
    .then(updatedUser => {
      dispatch(receiveUser(updatedUser.data))
    }).then( () => {
      return axios.get(`/api/users`)
    }).then(foundUsers => {
      dispatch(receiveUsers(foundUsers.data))
    })
    .catch(console.log)
  }
}

export const addNewReview = (bodyObj) => {
  return dispatch => {
    console.log('making axios request...', bodyObj)
    axios.post(`/api/reviews`, bodyObj)
    .then(newReview => {
      console.log("new review: ", newReview)
      dispatch(addReview(newReview.data))
    }).then(() => {
      return axios.get(`/api/products/${bodyObj.ProductId}`)
    }).then(prodWithNewReview => {
      dispatch(receiveProduct(prodWithNewReview.data))
    }).catch(console.log)
  }
}

export const removeUser = userId => {
  return dispatch => {
    axios.delete(`/api/users/${userId}`)
    .then(userDeleted => {
      dispatch(deleteUser(userDeleted.data))
    }).then( () => {
      return axios.get(`/api/users`)
    }).then(foundUsers => {
      dispatch(receiveUsers(foundUsers.data))
    })
    .catch(console.log)
  }
}

// export const getUsersOrders = userId => {
//   return dispatch => {
//     axios.get(`/api/orders/users/${userId}`)
//     .then(ordersForUser => {
//       dispatch(receiveOrders(ordersForUser.data))
//     })
//   }
// }
