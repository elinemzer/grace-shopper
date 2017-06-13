import {expect} from 'chai';
import {Users, Products} from '../server/models'
import db from '../server/db'

describe('User database model', () => {

	describe(('Required fields'), () => {
		before(() => {
			return db.sync({force: true});
		})

		it('only required fields are email and isAdmin fields', () => {
			let user = Users.create({email: 'hello@gmail.com', isAdmin: false});
			let fetchedUser = Users.findOne({
				where: {
					email: 'hello@gmail.com'
				}
			})
			expect(fetchedUser).to.not.equal(undefined)
		})
	})

	describe(('is associated to...'), () => {
		before(() => {
			return db.sync({force: true});
		})

		beforeEach(() => {
			Users.create({
				email: 'user1@gmail.com',
				firstName: 'Bob',
				lastName: 'Smith',
				isAdmin: false
			})
		})

		it(('Products'), () => {
			Users.findOne({
				where: {
					email: 'user1@gmail.com'
				}
			}).then(fetchedUser => {
				console.log(typeof(fetchedUser))
				console.log(fetchedUser)
				expect(true).to.equal(true)
			})
		})
	})
})