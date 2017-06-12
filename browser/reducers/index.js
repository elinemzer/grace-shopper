import {  SUBMIT_ORDER, REDUCE_CART, FLASH_MESSAGE, ADD_TO_CART, RECEIVE_CART, LOGOUT_USER, LOGIN_USER, RECEIVE_USER, RECEIVE_USERS, RECEIVE_PRODUCT, RECEIVE_PRODUCTS, RECEIVE_ORDER, RECEIVE_ORDERS, RECEIVE_REVIEWS, RECEIVE_REVIEW } from "../action-creators";

// import { receiveUser, receiveUsers, receiveProduct, receiveProducts, receiveOrder, receiveOrders, receiveCart, receiveReviews, receiveReview } from "../action-creators";

const initialState = {
  users: [],
  products: [],
  orders: [],
  selectedUser: {},
  selectedProduct: {},
  selectOrder: {},
  cart: [],
  reviews: [],
  selectedReview: {},
  loggedInUser: {},
  flashMessage: '',
  selectedOrder: {}
}

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case SUBMIT_ORDER:
      newState.cart = [];
      newState.selectedOrder = action.order;
      break;

    case LOGOUT_USER:
      newState.loggedInUser = action.user;
      newState.cart = [];
      break;

    case RECEIVE_USERS:
      newState.users = action.users;
      break;

    case RECEIVE_USER:
      newState.selectedUser = action.user;
      break;

    case RECEIVE_ORDERS:
      newState.orders = action.orders;
      break;

    case RECEIVE_ORDER:
      newState.selectedOrder = action.order;
      break;

    case RECEIVE_PRODUCTS:
      newState.products = action.products;
      break;

    case RECEIVE_PRODUCT:
      newState.selectedProduct = action.product;
      break;

    case RECEIVE_REVIEWS:
      newState.reviews = action.reviews;
      break;

    case RECEIVE_REVIEW:
      newState.selectedReview = action.review;
      break;


    case LOGIN_USER:
      newState.loggedInUser = action.user;
      newState.cart = action.user.Products.concat(state.cart);

      break;

    case RECEIVE_CART:
      //merges cart from session state with the stored cart of logging in user
      newState.cart = newState.cart.concat(action.cart);
      break;

    case REDUCE_CART:
      //overwrites session cart with new cart (for incrementing/decrementing/deleting)
      newState.cart = action.cart
      break;

    case ADD_TO_CART:
      newState.cart = newState.cart.push(action.cart);
      break;

    case FLASH_MESSAGE:
      newState.flashMessage = action.message;
      break;

    default:
      return state;

  }
  return newState;

}
