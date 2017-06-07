var Promise = require('bluebird');
var db = require('./server/db');
// var { cart, user, order, product, review } = db
var Users = require('./server/models/users');
var Carts = require('./server/models/cart');
var Orders = require('./server/models/orders');
var Products = require('./server/models/products');
var Reviews = require('./server/models/reviews');
var Product_Orders = require('./server/models/product_order')

var data = {
	users: [
	    {email: "Mars@venus.jupiter", firstName: 'Eli', lastName: 'Nemzer', address1: '123 fake st', address2: 'd8', city:'Chicago', state:'NM', zipcode:'11111', isAdmin: 'false'},
	    {email: "Space@venus.jupiter", firstName: 'Danielle', lastName: 'Westerman', address1: '123 Fake Stt', address2: '', city:'Loudon', state:'NH', zipcode:'10250', isAdmin: 'false'},
	    {email: "Dogpound@venus.jupiter", firstName: 'Emily', lastName: 'Acres', address1: '45 Main Ct', address2: 'z12', city:'Austin', state:'TX', zipcode:'13063', isAdmin: 'true'},
	    {email: "Hello@venus.jupiter", firstName: 'Jeremy', lastName: 'Wicks', address1: '60 Star Cir', address2: '', city:'Orlando', state:'MD', zipcode:'21122', isAdmin: 'false'},
	    {email: "Gmail@venus.jupiter", firstName: 'Hot-Geoff', lastName: 'Bass', address1: '75 Chalice Dr', address2: 'y15', city:'Baja', state:'NM', zipcode:'30468', isAdmin: 'false'},
	    {email: "Yahoo@venus.jupiter", firstName: 'Dan', lastName: 'TheMan', address1: '102 One Hundred Two St', address2: '8', city:'Mars', state:'NJ', zipcode:'10563', isAdmin: 'false'},
  	],
  	products: [
	    {title: "One Fish", description: 'lorem ipsum', region:'North America', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:27.50},
	    {title: "Two Fish", description: 'lorem ipsum', region:'South America', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:3.99},
	    {title: "Red Fish", description: 'lorem ipsum', region:'Asia', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:4000.99},
	    {title: "Blue Fish", description: 'lorem ipsum', region:'Europe', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:.10},
	    {title: "Orange Fish", description: 'lorem ipsum', region:'Africa', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:.90},
	    {title: "Shark", description: 'lorem ipsum', region:'Australia', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:100.00},
   ],
 	carts: [
	    {userId: 1, productId: 2, quantity: 5},
	    {userId: 2, productId: 1, quantity: 3},
	    {userId: 4, productId: 3, quantity: 2}, 
	    {userId: 5, productId: 2, quantity: 2},
	    {userId: 3, productId: 1, quantity: 10}, 
	    {userId: 2, productId: 2, quantity: 1},

  	],

   orders: [
	    {status: 'Created', datePlaced:'2017-01-01' , userId: 1},
	    {status: 'Processing', datePlaced:'2016-02-28', userId:2},
	    {status: 'Cancelled', datePlaced:'2017-03-01', userId:3},
	    {status: 'Completed', datePlaced:'2017-05-02', userId:4},
	    {status: 'Completed', datePlaced:'2017-01-03', userId:5}

   ],

   reviews: [
	    {rating: '1', title: 'Worst Fish', content: 'I hate this fish', userId: 5, productId: 1},
	    {rating: '2', title: 'Not a great fish', content: 'I dont like this fish very much', userId: 1, productId: 3},
	    {rating: '3', title: 'Mixed Feelings', content: 'This fish is alright but not great', userId: 2 , productId: 5},
	    {rating: '4', title: 'Very Dangerous', content: 'My fault for buying a shark', userId: 5, productId: 6},
	    {rating: '5', title: 'Wonderful fish', content: 'I love this fish', userId: 2, productId:1},
	    {rating: '1', title: 'Never received fish', content: 'I dont understand how the reviews work', userId: 1, productId: 4},

   ],
   product_order: [
		{orderId: 1, productId: 1, quantity: 1, price: 10.00},
		{orderId: 2, productId: 1, quantity: 2, price: 57.50},
		{orderId: 3, productId: 2, quantity: 1, price: 0.10},
		{orderId: 4, productId: 2, quantity: 1, price: 0.10},
		{orderId: 4, productId: 1, quantity: 1, price: 0.10},

   ]
};

    Orders.belongsToMany(Products, {through: 'product_order'});
    Products.belongsToMany(Orders, {through: 'product_order'});


	Products.belongsToMany(Users, {through: 'cart'});
	Users.belongsToMany(Products, {through: 'cart'});

	Users.hasMany(Reviews);
	Users.hasMany(Orders);

	Products.hasMany(Reviews);


db.sync({force:true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  const creatingUsers = Promise.map(data.users, function (user) {
    return Users.create(user);
  });
  const creatingProducts= Promise.map(data.products, function (item) {
    return Products.create(item);
  })
  const creatingCarts= Promise.map(data.carts, function (item) {
    return Carts.create(item);
  })
  const creatingOrders= Promise.map(data.orders, function (item) {
    return Orders.create(item);
  })
  const creatingReviews= Promise.map(data.reviews, function (item) {
    return Reviews.create(item);
  })
  const creatingProduct_Orders= Promise.map(data.product_order, function (item) {
    return Product_Orders.create(item);
  })


  return Promise.all([creatingUsers, creatingProducts,
  						creatingCarts, creatingOrders,
  						creatingReviews, creatingProduct_Orders]);
})
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});