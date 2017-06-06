var Promise = require('bluebird');
var db = require('./server/db');
var { cart, user, order, product, review } = db

var data = {
	User: [
	    {email: "Mars@venus.jupiter", address1: '123 fake st', address2: 'd8', city:'Chicago', state:'NM', zipcode:'11111', isAdmin: 'false'},
	    {email: "Space@venus.jupiter", address1: '123 Fake Stt', address2: '', city:'Loudon', state:'NH', zipcode:'10250', isAdmin: 'false'},
	    {email: "Dogpound@venus.jupiter", address1: '45 Main Ct', address2: 'z12', city:'Austin', state:'TX', zipcode:'13063', isAdmin: 'true'},
	    {email: "Hello@venus.jupiter", address1: '60 Star Cir', address2: '', city:'Orlando', state:'MD', zipcode:'21122', isAdmin: 'false'},
	    {email: "Gmail@venus.jupiter", address1: '75 Chalice Dr', address2: 'y15', city:'Baja', state:'NM', zipcode:'30468', isAdmin: 'false'},
	    {email: "Yahoo@venus.jupiter", address1: '102 One Hundred Two St', address2: '8', city:'Mars', state:'NJ', zipcode:'10563', isAdmin: 'false'},
  	],
  	Product: [
	    {title: "One Fish", description: 'lorem ipsum', region:'North America', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:27.50},
	    {title: "Two Fish", description: 'lorem ipsum', region:'South America', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:3.99},
	    {title: "Red Fish", description: 'lorem ipsum', region:'Asia', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:4000.99},
	    {title: "Blue Fish", description: 'lorem ipsum', region:'Europe', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:.10},
	    {title: "Orange Fish", description: 'lorem ipsum', region:'Africa', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:.90},
	    {title: "Shark", description: 'lorem ipsum', region:'Australia', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:100.00},
   ],
 	Cart: [
	    {userId: 1, productId: 2, quantity: 5},
	    {userId: 2, productId: 1, quantity: 3},
	    {userId: 4, productId: 3, quantity: 2}, 
	    {userId: 5, productId: 2, quantity: 2},
	    {userId: 3, productId: 1, quantity: 10}, 
	    {userId: 2, productId: 2, quantity: 1},

  	],

   Order: [
	    {status: 'Created', datePlaced:'2017-01-01' , userId: 1},
	    {status: 'Processing', datePlaced:'2016-02-28', userId:2},
	    {status: 'Cancelled', datePlaced:'2017-03-01', userId:3},
	    {status: 'Completed', datePlaced:'2017-05-02', userId:4},
	    {status: 'Complete', datePlaced:'2017-01-03', userId:5}

   ],

   Review: [
	    {rating: 1, title: 'Worst Fish', content: 'I hate this fish', userId: 5, productId: 1},
	    {rating: 2, title: 'Not a great fish', content: 'I dont like this fish very much', userId: 1, productId: 3},
	    {rating: 3, title: 'Mixed Feelings', content: 'This fish is alright but not great', userId: 2 , productId: 5},
	    {rating: 4, title: 'Very Dangerous', content: 'My fault for buying a shark', userId: 5, productId: 6},
	    {rating: 5, title: 'Wonderful fish', content: 'I love this fish', userId: 2, productId:1},
	    {rating: 1, title: 'Never received fish', content: 'I dont understand how the reviews work', userId: 1, productId: 4},

   ],
   Product_Order: [
		{orderId: 1, productId: 1, quantity: 1, price: 10.00},
		{orderId: 2, productId: 1, quantity: 2, price: 57.50},
		{orderId: 3, productId: 2, quantity: 1, price: 0.10},
		{orderId: 4, productId: 2, quantity: 1, price: 0.10},
		{orderId: 4, productId: 1, quantity: 1, price: 0.10},

   ]
};


db.sync({force:true})

.then(function () {
  console.log("Dropped old data, now inserting data");
  const creatingUsers = Promise.map(data.Users, function (user) {
    return user.create(user);
  });
  const creatingSchools= Promise.map(data.Schools, function (school) {
    return Schools.create(school);
  })
  return Promise.all([creatingStudents, creatingSchools]);
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