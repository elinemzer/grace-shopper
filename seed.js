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
	    {email: "Mars@venus.jupiter", password: "123", firstName: 'Eli', lastName: 'Nemzer', address1: '123 fake st', address2: 'd8', city:'Chicago', state:'NM', zipcode:'11111', isAdmin: 'false'},
	    {email: "Space@venus.jupiter", password: "123", firstName: 'Danielle', lastName: 'Westerman', address1: '123 Fake Stt', address2: '', city:'Loudon', state:'NH', zipcode:'10250', isAdmin: 'false'},
	    {email: "Dogpound@venus.jupiter", password: "123", firstName: 'Emily', lastName: 'Acres', address1: '45 Main Ct', address2: 'z12', city:'Austin', state:'TX', zipcode:'13063', isAdmin: 'true'},
	    {email: "Hello@venus.jupiter", password: "123", firstName: 'Jeremy', lastName: 'Wicks', address1: '60 Star Cir', address2: '', city:'Orlando', state:'MD', zipcode:'21122', isAdmin: 'false'},
	    {email: "Gmail@venus.jupiter", password: "123", firstName: 'Hot-Geoff', lastName: 'Bass', address1: '75 Chalice Dr', address2: 'y15', city:'Baja', state:'NM', zipcode:'30468', isAdmin: 'false'},
	    {email: "Yahoo@venus.jupiter", password: "123", firstName: 'Dan', lastName: 'TheMan', address1: '102 One Hundred Two St', address2: '8', city:'Mars', state:'NJ', zipcode:'10563', isAdmin: 'false'},
  	],
  	products: [
	    {title: "Symphysodon Discus", description: 'ASymphysodon, colloquially known as discus, is a genus of cichlids native to the Amazon river basin in South America. Due to their distinctive shape and bright colors, discus are popular as freshwater aquarium fish, and their aquaculture in several countries in Asia is a major industry. They are sometimes referred to as pompadour fish.', region:'North America', imageUrl:'files/img/sdiscus.jpg', price:27.50},
	    {title: "Lionfish", description: 'Pterois fish in the Atlantic range from 5 to 45 cm (2.0 to 17.7 in) in length, weighing from 0.025 to 1.3 kg (0.055 to 2.866 lb). They are well known for their ornate beauty, venomous spines, and unique tentacles. Juvenile lionfish have a unique tentacle located above their eye sockets that varies in phenotype between species. The evolution of this tentacle is suggested to serve to continually attract new prey; studies also suggest it plays a role in sexual selection.', region:'South America', imageUrl:'files/img/lionfish.jpg', price:3.99},
	    {title: "Yellow Tang", description: 'The yellow tang (Zebrasoma flavescens) is a saltwater fish species of the family Acanthuridae. Adult fish can grow to 20 centimetres (7.9 in) in length, and 1–2 centimetres (0.39–0.79 in) in thickness. Adult males tend to be larger than females. Yellow tang are bright yellow in color. At night, the yellow coloring fades slightly, and a prominent brownish patch develops in the middle with a horizontal white band. They rapidly resume their bright yellow color during daylight.', region:'Asia', imageUrl:'files/img/zebra.jpg', price:4000.99},
	    {title: "Yellow Thorny Seahorse", description: 'The spiny seahorse is a small fish that can reach a maximum length of 15–17 cm. The body is slender, elongated and completely covered with thorns. These are sharp with dark tips, and uniformly sized on the prehensile tail. The trunk has long thorns which continue until the coronet, which has 4-5. The head is also provided with numerous spines especially on the forehead, the base of the cheeks, the nose and above the eyes. The snout is very long and tapered. Body coloration is highly variable to match surroundings and goes from grey to cream, and from bright yellow, to green or red and even brownish. It can be plain or with different pattern on the side or/and on the backside. The snout is generally striped with one or more thin white lines.', region:'Europe', imageUrl:'files/img/seahorse.jpg', price:.10},
	    {title: "Blue Discus", description: 'Blue Symphysodon species have a laterally compressed body shape. In contrast to Pterophyllum, however, extended finnage is absent giving Symphysodon a more rounded shape. It is this body shape from which their common name, "discus", is derived. The sides of the fish are frequently patterned in shades of green, red, brown, and blue. Some of the more brightly marked variants are the result of selective breeding by aquarists and do not exist in the wild. Discus typically reach up to 12.3–15.2 cm (4.8–6.0 in) in length, but captives have been claimed to reach 23 cm (9 in). Adults generally weigh 150–250 g (5.3–8.8 oz).', region:'Africa', imageUrl:'files/img/discus.jpg', price:.90},
	    {title: "Emporer Angelfish", description: 'The emperor angelfish (Pomacanthus imperator) is a species of marine angelfish. It is a reef-associated fish, native to the Indian and Pacific Oceans, from the Red Sea to Hawaii and the Austral Islands. It ranges from coastal East Africa and the Red Sea in the west, to the Tuamotu Islands and Line Islands. Some populations have been observed as far as southern Japan to the Great Barrier Reef in Australia, New Caledonia, and the Austral Islands. Rare sightings have been recorded in the Hawaiian Islands, Puerto Rico, and Florida. These appearances are most likely due to aquarium release. From 2010 there have been reports that the species is colonizing the southeast Mediterranean, most likely as an invader via the Suez Canal. This species is generally associated with stable populations and faces no major threats of extinction. It is a favorite among photographers, artists, and aquarists because of its unique, brilliant pattern of coloration.', region:'Australia', imageUrl:'files/img/angel.jpg', price:100.00},
   ],
 	carts: [
	    {UserId: 1, ProductId: 2, quantity: 5},
	    {UserId: 2, ProductId: 1, quantity: 3},
	    {UserId: 4, ProductId: 3, quantity: 2},
	    {UserId: 5, ProductId: 2, quantity: 2},
	    {UserId: 3, ProductId: 1, quantity: 10},
	    {UserId: 2, ProductId: 2, quantity: 1},

  	],

   orders: [
	    {status: 'Created', datePlaced:'2017-01-01' , UserId: 1},
	    {status: 'Processing', datePlaced:'2016-02-28', UserId:2},
	    {status: 'Cancelled', datePlaced:'2017-03-01', UserId:3},
	    {status: 'Completed', datePlaced:'2017-05-02', UserId:4},
	    {status: 'Completed', datePlaced:'2017-01-03', UserId:5}

   ],

   reviews: [
	    {rating: '1', title: 'Worst Fish', content: 'I hate this fish', UserId: 5, ProductId: 1},
	    {rating: '2', title: 'Not a great fish', content: 'I dont like this fish very much', UserId: 1, ProductId: 3},
	    {rating: '3', title: 'Mixed Feelings', content: 'This fish is alright but not great', UserId: 2 , ProductId: 5},
	    {rating: '4', title: 'Very Dangerous', content: 'My fault for buying a shark', UserId: 5, ProductId: 6},
	    {rating: '5', title: 'Wonderful fish', content: 'I love this fish', UserId: 2, ProductId:1},
	    {rating: '1', title: 'Never received fish', content: 'I dont understand how the reviews work', UserId: 1, ProductId: 4},

   ],
   product_order: [
		{OrderId: 1, ProductId: 1, quantity: 1, price: 10.00},
		{OrderId: 2, ProductId: 1, quantity: 2, price: 57.50},
		{OrderId: 3, ProductId: 2, quantity: 1, price: 0.10},
		{OrderId: 4, ProductId: 2, quantity: 1, price: 0.10},
		{OrderId: 4, ProductId: 1, quantity: 1, price: 0.10},

   ]
};

  Orders.belongsToMany(Products, {through: 'Product_order'});
  Products.belongsToMany(Orders, {through: 'Product_order'});


	Products.belongsToMany(Users, {through: 'Cart'});
	Users.belongsToMany(Products, {through: 'Cart'});

	Users.hasMany(Reviews);
	Products.hasMany(Reviews);
	Reviews.belongsTo(Users);


	Users.hasMany(Orders);
	Orders.belongsTo(Users);



db.sync({force:true})
.then(function() {
  console.log("Dropped old data, now inserting data");
  const creatingUsers = Promise.map(data.users, function (user) {
    return Users.create(user);
  });
  return Promise.all(creatingUsers)
})
.then(function () {
  const creatingProducts = Promise.map(data.products, function (item) {
    return Products.create(item);
  })
  const creatingCarts = Promise.map(data.carts, function (item) {
    return Carts.create(item);
  })
  const creatingOrders = Promise.map(data.orders, function (item) {
    return Orders.create(item);
  })
  const creatingReviews = Promise.map(data.reviews, function (item) {
    return Reviews.create(item);
  })
  const creatingProduct_Orders = Promise.map(data.product_order, function (item) {
    return Product_Orders.create(item);
  })
    return Promise.all([creatingProducts, creatingOrders, creatingCarts, creatingReviews, creatingProduct_Orders
    ]);
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
