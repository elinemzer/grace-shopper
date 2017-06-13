import {expect} from 'chai';

import {submitOrder, reduceCart, loginUser, flash} from '../browser/action-creators';

describe('Store actions', () => {

    describe('submitOrder', () => {

        it('returns properly formatted action', () => {

            const testOrder = {foo: 'foo'};

            expect(submitOrder(testOrder)).to.be.deep.equal({
                type: 'SUBMIT_ORDER',
                order: testOrder
            });

        });

    });

    describe('reduceCart', () => {

        it('returns properly formatted action', () => {

            const testCart = [{foo:'foo'}, {bar:'bar'}];

            expect(reduceCart(testCart)).to.be.deep.equal({
                type: 'REDUCE_CART',
                cart: testCart
            });

        });

    });

    describe('loginUser', () => {

        it('returns properly formatted action', () => {

            const testUser = {name: 'Foo'};

            expect(loginUser(testUser)).to.be.deep.equal({
                type: 'LOGIN_USER',
                user: testUser
            });

        });

    });

    describe('flash', () => {

        it('returns properly formatted action', () => {

            const testMessage = 'hello';

            expect(flash(testMessage)).to.be.deep.equal({
                type: 'FLASH_MESSAGE',
                message: testMessage
            });

        });

    });

});