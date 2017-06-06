import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_PRODUCT, RECEIVE_PRODUCTS, RECEIVE_ORDER, RECEIVE_ORDERS } from "../action-creators";

import { receiveUser, receiveUsers, receiveProduct, receiveProducts, receiveOrder, receiveOrders, receiveCart } from "../action-creators";

const initialState = {
  users: [],
  products: [],
  orders: [],
  selectedUser: {},
  selectedProduct: {},
  selectOrder: {},
  cart: []
}
export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

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

    default:
      return state;

  }

  return newState;

}
