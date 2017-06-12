import {expect} from 'chai';

const createStore = require('redux').createStore;
import mainReducer from '../browser/reducers/';

describe('Main reducer', () => {

    let testStore;
    beforeEach('Create testing store', () => {
        testStore = createStore(mainReducer);
    });

    it('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal({
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
        });
    });

    describe('REDUCE_CART', () => {

        it('overwrites the cart with a new cart', () => {
            testStore.dispatch({ type: 'RECEIVE_CART', cart: [{foo: 'foo'}] });
            testStore.dispatch({ type: 'REDUCE_CART', cart: [{foo: 'bar'}] });
            const newState = testStore.getState();
            expect(newState.cart).to.be.deep.equal([{foo: 'bar'}]);
        });

    });

    describe('RECEIVE_CART', () => {

        it('combines a cart object with the existing cart', () => {
            testStore.dispatch({ type: 'RECEIVE_CART', cart: [{foo:'foo'}]});
            testStore.dispatch({ type: 'RECEIVE_CART', cart: [{bar:'bar'}]});
            const newState = testStore.getState();
            expect(newState.cart).to.be.deep.equal([{foo: 'foo'}, {bar:'bar'}]);

        });

    });

});