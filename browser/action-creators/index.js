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
export const FLASH_MESSAGE = 'FLASH_MESSAGE'
export const REDUCE_CART = 'REDUCE_CART'
export const SUBMIT_ORDER = 'SUBMIT_ORDER'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const RECEIVE_PRODUCT_ORDERS = 'RECEIVE_PRODUCT_ORDERS'

/* ACTION CREATORS */
export const receiveProductOrders = productOrders =>({
  type: RECEIVE_PRODUCT_ORDERS,
  productOrders
})

export const submitOrder = order => ({
  type: SUBMIT_ORDER,
  order
})

export const reduceCart = cart => ({
  type: REDUCE_CART,
  cart
})

export const receiveCart = cart =>({
  type: RECEIVE_CART,
  cart
})

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

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

export const receiveOrder = order => ({
  type: RECEIVE_ORDER,
  order
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

export const flash = message =>({
  type:FLASH_MESSAGE,
  message
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

export const getProducts = () => {
  return dispatch => {
    return axios.get(`/api/products`)
      .then(response => {
        dispatch(receiveProducts(response.data));
      });
  };
};

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
      dispatch(getUserById(`${userId}`))
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
    axios.post(`/api/reviews`, bodyObj)
    .then(newReview => {
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

export const updateProduct = (bodyObj, fishId) => {
  return dispatch => {
    axios.put(`/api/products/${fishId}`, bodyObj)
    .then(updatedProduct => {
      dispatch(receiveProduct(updatedProduct.data))
    }).then(() => {
      return axios.get(`/api/products`)
    }).then(allProducts => {
      dispatch(receiveProducts(allProducts.data))
    }).catch(console.log)
  }
}

export const callUpdateOrders = (orderId, bodyObj) => {
  return dispatch => {
    axios.put(`/api/orders/${orderId}`, bodyObj)
    .then(updatedOrder => {
      dispatch(receiveOrder(updatedOrder.data))
    }).then(() => {
      return axios.get(`/api/orders`)
    }).then(allOrders => {
      dispatch(receiveOrders(allOrders.data))
    }).catch(console.log)
  }
}



export const removeProduct = (fishId) => {
  return dispatch => {
    axios.delete(`/api/products/${fishId}`)
    .then(deletedFish => {
      dispatch(deleteProduct(deletedFish.data))
    }).then(() => {
      return axios.get(`/api/products`)
    }).then(allProducts => {
      dispatch(receiveProducts(allProducts.data))
    }).catch(console.log)
  }
}

export const addNewProduct = (bodyObj) => {
  return dispatch => {
    axios.post(`/api/products`, bodyObj)
    .then(newFish => {
      dispatch(addProduct(newFish.data))
    }).then(() => {
      return axios.get(`/api/products`)
    }).then(allProducts => {
      dispatch(receiveProducts(allProducts.data))
    }).catch(console.log)
  }
}

export const getProductOrders = () => {
  return dispatch =>{
      axios.get('/api/orders/productorders')
  .then(productOrders =>{

    dispatch(receiveProductOrders(productOrders.data))
  }) 
  }
  }





//sets state flashMessage to provided message, then flips back to empty string after 1 second
export const flashMessage = (message) => {
    return dispatch =>{
      dispatch(flash(message))
      setTimeout(function() {
        dispatch(flash(''));
    }, 1000);

    }
    
  }

