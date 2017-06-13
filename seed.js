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
      {id: "1001", email:'admin@aquascaping.com', password: "123", firstName: 'GUEST', lastName: 'USER', address1: '123 fake st', address2: 'd8', city:'Chicago', state:'NM', zipcode:'11111', isAdmin: 'false'},
      {email: "Mars@venus.jupiter", password: "123", firstName: 'Eli', lastName: 'Nemzer', address1: '123 fake st', address2: 'd8', city:'Chicago', state:'NM', zipcode:'11111', isAdmin: 'false'},
	    {email: "Space@venus.jupiter", password: "123", firstName: 'Danielle', lastName: 'Westerman', address1: '123 Fake Stt', address2: '', city:'Loudon', state:'NH', zipcode:'10250', isAdmin: 'false'},
	    {email: "Dogpound@venus.jupiter", password: "123", firstName: 'Emily', lastName: 'Acres', address1: '45 Main Ct', address2: 'z12', city:'Austin', state:'TX', zipcode:'13063', isAdmin: 'true'},
	    {email: "Hello@venus.jupiter", password: "123", firstName: 'Jeremy', lastName: 'Wicks', address1: '60 Star Cir', address2: '', city:'Orlando', state:'MD', zipcode:'21122', isAdmin: 'false'},
	    {email: "Gmail@venus.jupiter", password: "123", firstName: 'Hot-Geoff', lastName: 'Bass', address1: '75 Chalice Dr', address2: 'y15', city:'Baja', state:'NM', zipcode:'30468', isAdmin: 'false'},
	    {email: "Yahoo@venus.jupiter", password: "123", firstName: 'Dan', lastName: 'TheMan', address1: '102 One Hundred Two St', address2: '8', city:'Mars', state:'NJ', zipcode:'10563', isAdmin: 'false'},
      {email: "sunshine@gmail.com", password: "123", firstName: 'Sarah', lastName: 'Gerard', address1: '548 31st Ave', address2: 'Apt. 2', city:'New York', state:'NY', zipcode:'10014', isAdmin: 'false'},
      {email: "loneranger@gmail.com", password: "123", firstName: 'Sherman', lastName: 'Alexie', address1: '44 West 18th Street', address2: 'Apt. 1B', city:'Brooklyn', state:'NY', zipcode:'11215', isAdmin: 'false'},
      {email: "alltheclocks@gmail.com", password: "123", firstName: 'Xan', lastName: 'Brooks', address1: '102 the Kremlin', address2: '', city:'Moscow', state:'RU', zipcode:'50005', isAdmin: 'false'},
      {email: "electricsheep@gmail.com", password: "123", firstName: 'Philip K.', lastName: 'Dick', address1: '621 East Space Station Dr.', address2: '', city:'Tempe', state:'AZ', zipcode:'76005', isAdmin: 'false'},
      {email: "annhilation@gmail.com", password: "123", firstName: 'Jeff', lastName: 'Vandermeer', address1: '100 Missing Place', address2: '', city:'Area X', state:'NV', zipcode:'43807', isAdmin: 'false'},
      {email: "joyluck@gmail.com", password: "123", firstName: 'Amy', lastName: 'Tan', address1: '55 West 8th', address2: 'Unit 7E', city:'San Francisco', state:'CA', zipcode:'99603', isAdmin: 'false'},
  	],
  	products: [
	    {title: "Symphysodon Discus", description: 'ASymphysodon, colloquially known as discus, is a genus of cichlids native to the Amazon river basin in South America. Due to their distinctive shape and bright colors, discus are popular as freshwater aquarium fish, and their aquaculture in several countries in Asia is a major industry. They are sometimes referred to as pompadour fish.', region:'North America', imageUrl:'files/img/sdiscus.jpg', price:27.50},
	    {title: "Lionfish", description: 'Pterois fish in the Atlantic range from 5 to 45 cm (2.0 to 17.7 in) in length, weighing from 0.025 to 1.3 kg (0.055 to 2.866 lb). They are well known for their ornate beauty, venomous spines, and unique tentacles. Juvenile lionfish have a unique tentacle located above their eye sockets that varies in phenotype between species. The evolution of this tentacle is suggested to serve to continually attract new prey; studies also suggest it plays a role in sexual selection.', region:'South America', imageUrl:'files/img/lionfish.jpg', price:30.99},
	    {title: "Yellow Tang", description: 'The yellow tang (Zebrasoma flavescens) is a saltwater fish species of the family Acanthuridae. Adult fish can grow to 20 centimetres (7.9 in) in length, and 1–2 centimetres (0.39–0.79 in) in thickness. Adult males tend to be larger than females. Yellow tang are bright yellow in color. At night, the yellow coloring fades slightly, and a prominent brownish patch develops in the middle with a horizontal white band. They rapidly resume their bright yellow color during daylight.', region:'Asia', imageUrl:'files/img/zebra.jpg', price:40.99},
	    {title: "Yellow Thorny Seahorse", description: 'The spiny seahorse is a small fish that can reach a maximum length of 15–17 cm. The body is slender, elongated and completely covered with thorns. These are sharp with dark tips, and uniformly sized on the prehensile tail. The trunk has long thorns which continue until the coronet, which has 4-5. The head is also provided with numerous spines especially on the forehead, the base of the cheeks, the nose and above the eyes. The snout is very long and tapered. Body coloration is highly variable to match surroundings and goes from grey to cream, and from bright yellow, to green or red and even brownish. It can be plain or with different pattern on the side or/and on the backside. The snout is generally striped with one or more thin white lines.', region:'Europe', imageUrl:'files/img/seahorse.jpg', price:90.10},
	    {title: "Blue Discus", description: 'Blue Symphysodon species have a laterally compressed body shape. In contrast to Pterophyllum, however, extended finnage is absent giving Symphysodon a more rounded shape. It is this body shape from which their common name, "discus", is derived. The sides of the fish are frequently patterned in shades of green, red, brown, and blue. Some of the more brightly marked variants are the result of selective breeding by aquarists and do not exist in the wild. Discus typically reach up to 12.3–15.2 cm (4.8–6.0 in) in length, but captives have been claimed to reach 23 cm (9 in). Adults generally weigh 150–250 g (5.3–8.8 oz).', region:'Africa', imageUrl:'files/img/discus.jpg', price:35.90},
	    {title: "Emporer Angelfish", description: 'The emperor angelfish (Pomacanthus imperator) is a species of marine angelfish. It is a reef-associated fish, native to the Indian and Pacific Oceans, from the Red Sea to Hawaii and the Austral Islands. It ranges from coastal East Africa and the Red Sea in the west, to the Tuamotu Islands and Line Islands. Some populations have been observed as far as southern Japan to the Great Barrier Reef in Australia, New Caledonia, and the Austral Islands. Rare sightings have been recorded in the Hawaiian Islands, Puerto Rico, and Florida. These appearances are most likely due to aquarium release. From 2010 there have been reports that the species is colonizing the southeast Mediterranean, most likely as an invader via the Suez Canal. This species is generally associated with stable populations and faces no major threats of extinction. It is a favorite among photographers, artists, and aquarists because of its unique, brilliant pattern of coloration.', region:'Australia', imageUrl:'files/img/angel.jpg', price:100.00},
      {title: "Masked Butterflyfish", description: 'The masked butterflyfish, Chaetodon semilarvatus, is a species of butterflyfish (family Chaetodontidae). It is found in the Red Sea and the Gulf of Aden, at depths of between 3 and 20 m. The blue-cheeked butterflyfish belongs to the large subgenus Rabdophorus which might warrant recognition as a distinct genus. In this group, it seems closest to a group containing the Blackback butterflyfish (C. melannotus), the spot-naped butterflyfish (C. oxycephalus), or the peculiar black-wedged butterflyfish (C. falcula) and Pacific double-saddle butterflyfish or "false falcula", (C. ulietensis). Though the present species does not share their white body with black on the back and caudal peduncle and even lacks the typical eyestripe of Chaetodon, it has the same tell-tale blue vertical lines as these species', region:'Europe', imageUrl:'files/img/masked.jpg', price:105.50},
      {title: "Reef Butterflyfish", description: 'Butterflyfishes mostly range from 12 to 22 cm (4.7 to 8.7 in) in length. Generally diurnal and frequenting waters less than 18 m (59 ft) deep (though some species descend to 180 m (590 ft)), butterflyfishes stick to particular home ranges. These coralivores are especially territorial, forming pairs and staking claim to a specific coral head. Contrastingly, the zooplankton feeders form large conspecific groups. By night, butterflyfish hide in reef crevices and exhibit markedly different coloration.', region:'North America', imageUrl:'files/img/reefbfish.jpg', price:75.99},
      {title: "Green Cichlid", description: 'Cichlids are fish from the family Cichlidae in the order Perciformes. Cichlids are members of a suborder known as Labroidei, along with the wrasses (Labridae), damselfishes (Pomacentridae), and surfperches (Embiotocidae). This family is both large and diverse. At least 1,650 species have been scientifically described, making it one of the largest vertebrate families. New species are discovered annually, and many species remain undescribed. The actual number of species is therefore unknown, with estimates varying between 2,000 and 3,000. Cichlids are popular freshwater fish kept in the home aquarium.', region:'Africa', imageUrl:'files/img/cichlid.jpg', price:25.99},
      {title: "Rainbow Betta Fish", description: 'The betta was first discovered in Southeast Asia. Making its home in rice paddies, drainage ditches and the warm flood plains of the region, the betta became accustomed to frequent storm flooding and devastating droughts. The cyclic, drastic changes in its environment helped the fish to adapt - becoming a true labyrinth fish. A labyrinth fish has the unique ability to breathe oxygen directly from the air and also take in oxygen from its gills. As a result, bettas and other labyrinth fish can survive for short periods of time out of water and if needed, can inhale the air around them (provided they stay moist.) This also explains why a betta can sustain itself in stagnant, oxygen-deficient water. Although bettas can tolerate small spaces and poor water quality, they do best in small aquariums (at least two gallons) with regular water changes. The preferred water temperature for a betta is 76-82 degrees F.', region:'Asia', imageUrl:'files/img/betta.jpg', price:11.99},
      {title: "Red Emperor Fish", description: 'TA very handsome fish, the prime adults frequent the deeper waters and channels during the cooler months from May to September and can reach a credible 40+ pounds (20 kg). Glowing salmon pink to red, its pink fins tipped in bright crimson or red, and three distinctive darker red bands sweeping up its face, pectoral fin to back and down again to the anal area. In keeping with its magnificent appearance, its eating qualities are no less legendary. Reds will usually congregate in large schools of similar sized fish, and once anglers have been hooked up to several fish, the school can be kept in the vicinity by the fishing activity. More commonly caught at night, charter operators in the know have secret locations where these prized fish can be caught during daylight hours, jealously guarding there whereabouts.', region:'Australia', imageUrl:'files/img/red.jpg', price:52.50},
      {title: "Clown Triggerfish", description: "The clown triggerfish is a small sized fish which grows up to 50 cm. Its body has a stocky appearance, oval shape and compressed laterally. The head is large and represents approximately one third of the body length. The mouth is small, terminal and has strong teeth.The first dorsal fin is composed of three spines, one of which is longer and stronger. It is erectile and hidden in a dorsal furrow. This set of dorsal spines composed a trigger system which is a characteristic from the family Balistidae. The second dorsal fin is similar in shape and size to the anal fin which is symmetrically opposed to it. The pelvic fin is reduced to a ventral protrusion. The background coloration is black. Half of inferior part of the body is marked with big white spots which are more or less round. The area around the first dorsal fin is crossed by yellowish sinuosities which draw like a network reminding the leopard's patterns. There is a yellowish ring around the mouth, which is surrounded by another fin white ring. A white stripe ride the snout just under the eyes level. The second dorsal fin and the anal fin are white and underlined with a yellow line at their base. The caudal peduncle has a yellowish blotch on its top part and has three horizontal sets of spiny scales. The caudal fin is yellowish in its center and has black margin. Juveniles have a black background coloration spangled with small white spots, the extremity of the snout and the base of the first dorsal fin is yellowish.", region:'Australia', imageUrl:'files/img/trigger.jpg', price:39.95},
      {title: "Red Humphead Fish", description: "The humphead wrasse is the largest living member of the family Labridae. Males are typically larger than females and are capable of reaching lengths of up to 2 meters from tip to tail and weighing up to 180 kg, but the average length is generally a little less than 1 meter. Females rarely grow larger than one meter in length. This species of fish can be easily identified by its large size, thick lips, two black lines behind its eyes, and the hump that appears on the forehead of larger adults. The color of the humphead wrasse can vary between a dull blue-green to more vibrant shades of green and purplish-blue. This particular reef fish prefers to live singly but adults are occasionally observed moving in small groups.", region:'Asia', imageUrl:'files/img/hump.jpg', price:28.75},
      {title: "Yellow Boxfish", description: "The yellow boxfish (Ostracion cubicus) is a species of boxfish. It can be found in reefs throughout the Pacific Ocean and Indian Ocean as well as the south eastern Atlantic Ocean. It reaches a maximum length of 45 centimetres (18 in). As the name suggests, it is box-shaped. When juvenile, it is bright yellow in color. As it ages, the brightness fades and very old specimens will have blue-grey colouration with faded yellow. It feeds mainly on algae, but will also feed on sponges, crustaceans and molluscs. The fish's diet consists of marine algae, worms, crustaceans, molluscs, and small fish. When stressed or injured it releases poisonous proteins from its skin that may prove lethal to any fish in the surrounding waters. The bright yellow color and black spots are a form of warning coloration (Aposematism) to any potential predators. They are solitary animals. Breeding occurs during the spring, in small groups that consist of 1 male and 2 - 4 females.", region:'South America', imageUrl:'files/img/boxfish.jpg', price:100.00},
      {title: "Red Swordtail", description: "The Red Wag Swordtail demonstrates a classic color combination notable among the widely bred color varieties of the Xiphophorus helleri Swordtail. The bold color combination of red and black gives the Red Wag Swordtail a sophisticated appearance. The Swordtail is perhaps the quintessential community aquarium fish. The time-tested popularity of the Swordtail can be attributed to its ease of care, peaceful temperament, and wonderfully diverse fin and color varieties. The most common Swordtail varieties include: Red Velvet, Marigold, Black Nubian, Pineapple, and Neon Swordtail. The male Swordtail is especially prized for its namesake feature, the showy extension on the lower part of its tail resembling a sword. The Red Wag Swordtail requires an aquarium of at least 20 gallons that is well planted with plenty of room for swimming. Because of its peaceful nature, the Red Wag Swordtail is well suited for the community aquarium. However, the male Red Wag Swordtail can demonstrate territorial aggression towards other male Swordtails so care should be taken when housing more than one male. Also, the Red Wag Swordtail is an accomplished jumper, so be sure to provide a secure cover for the aquarium.", region:'North America', imageUrl:'files/img/swordtail.jpg', price:60.00},
      {title: "Cherry Shrimp", description: "Red cherry shrimp are easy to care for in the home freshwater aquarium and breed well. They will adapt to a wide range of water conditions, and will thrive in the same conditions as many common aquarium fish. Neutral to slightly alkaline pH, with zero ammonia and nitrite as well as low nitrate, gives best results. A cooling system is recommended in warm climates. A few cherry shrimp can be kept in a desktop aquarium of 4–8 litres (0.88–1.76 imp gal; 1.1–2.1 US gal) capacity, and a setup of 40 l (8.8 imp gal; 11 US gal) or more will allow for an active colony. A planted tank is most comfortable for the shrimp and the plants provide cover for adults and young. Plants also provide surfaces to graze on biofilm. The shrimp spends a great deal of its time sitting on aquatic plants, when available, and hiding in them for protection, especially after molting. They also eat the film of algae and microorganisms that forms on plant leaves without harming the leaves in the process. Java moss and Java fern are both excellent plants for the shrimp tank, as they thrive in the same conditions as the cherry shrimp and provide both the physical benefits of the plants to the shrimp and provide a human viewer with a pleasing visual contrast with the red bodies of the shrimp. Shrimplets spend much of their early life hiding among plants and feeding from microorganisms and tank algae. Java moss is common and inexpensive in most places, fast-growing, and provides excellent cover for the young.", region:'Asia', imageUrl:'files/img/shrimp.jpg', price:8.99},
      {title: "Bigfin Squid", description: "Bigfin reef squids are characterised by a large oval fin that extends throughout the margins of its mantle, giving them a superficial similarity to cuttlefish. They are small to medium-sized squids, averaging 3.8 to 33 centimetres (1.5 to 13.0 in) in length. They exhibit elaborate mating displays and usually spawn in May, but it can vary by location. The paralarvae resemble miniature adults and are remarkable for already having the capability to change body colouration upon hatching. Bigfin reef squids have the fastest recorded growth rates of any large marine invertebrate, reaching 600 g (1.3 lb) in only four months. They are a short-lived species, with a maximum recorded lifespan of 315 days. The diet of bigfin reef squids comprises mainly crustaceans and small fish. They are found in the temperate and tropical waters of the Pacific and Indian Oceans, and have recently been introduced into the Mediterranean as a Lessepsian migrant. They are commonly found near the shoreline, near rocks, and coral reefs.", region:'Europe', imageUrl:'files/img/squid.jpg', price:89.99},
      {title: "Sumatra Barb", description: "Puntigrus tetrazona, the tiger barb or Sumatra barb, is a species of tropical cyprinid fish. The natural geographic range reportedly extends throughout the Malay Peninsula, Sumatra and Borneo in Indonesia, with unsubstantiated sightings reported in Cambodia. Tiger barbs are also found in many other parts of Asia, and with little reliable collection data over long periods of time, definite conclusions about their natural geographic range versus established introductions are difficult. The tiger barb can grow to about 7-10 centimeters long (2.75 – 4 in) and 3-4 centimeters wide,(1.18 in), although they are often smaller when kept in captivity. Some can grow to around 13 centimeters as well. Native fish are silver to brownish yellow with four vertical black stripes and red fins and snout. The green tiger barb is the same size and has the same nature as the normal barb, but has a green body. The green tiger barb, often called the moss green tiger barb, can vary considerably in how green it looks; to some people it looks nearly black. Albino barbs are a light yellow with four barely visible stripes.", region:'Asia', imageUrl:'files/img/barb.jpg', price:18.50}
   ],
 	carts: [
	    {UserId: 1, ProductId: 2, quantity: 1},
	    {UserId: 2, ProductId: 1, quantity: 1},
	    {UserId: 4, ProductId: 3, quantity: 1},
	    {UserId: 5, ProductId: 2, quantity: 1},
	    {UserId: 3, ProductId: 1, quantity: 1},
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
	    {rating: '3', title: 'Worst Fish', content: 'I hate this fish', UserId: 5, ProductId: 1},
	    {rating: '3', title: 'Not a great fish', content: 'I dont like this fish very much', UserId: 1, ProductId: 3},
	    {rating: '4', title: 'Mixed Feelings', content: 'This fish is alright but not great', UserId: 2 , ProductId: 5},
	    {rating: '4', title: 'Very Dangerous', content: 'My fault for buying a shark', UserId: 4, ProductId: 6},
	    {rating: '5', title: 'Wonderful fish', content: 'I love this fish', UserId: 2, ProductId:1},
	    {rating: '1', title: 'Never received fish', content: 'I dont understand how the reviews work', UserId: 1, ProductId: 4},
      {rating: '4', title: 'Beautiful!', content: 'Quick delivery and a gorgeous animal!', UserId: 1, ProductId: 6},
      {rating: '5', title: 'Fast Shipping', content: 'My order arrived the next day with all the fish happy and safe!', UserId: 1, ProductId: 11},
      {rating: '5', title: 'Amazing', content: 'Beautiful fish, true to description', UserId: 3, ProductId: 14},
      {rating: '4', title: 'Amazing', content: 'Beautiful fish, true to description', UserId: 6, ProductId: 13},
      {rating: '4', title: 'Beautiful!', content: 'Quick delivery and a gorgeous animal!', UserId: 7, ProductId: 12},
      {rating: '5', title: 'Fast Shipping', content: 'My order arrived the next day with all the fish happy and safe!', UserId: 1, ProductId: 10},
      {rating: '4', title: 'Amazing', content: 'Beautiful fish, true to description', UserId: 8, ProductId: 9},
      {rating: '4', title: 'Beautiful!', content: 'Quick delivery and a gorgeous animal!', UserId: 9, ProductId: 8},
      {rating: '5', title: 'Beautiful!', content: 'Quick delivery and a gorgeous animal!', UserId: 10, ProductId: 7},
      {rating: '4', title: 'Amazing', content: 'Beautiful fish, true to description', UserId: 11, ProductId: 5},
      {rating: '5', title: 'Amazing', content: 'Beautiful fish, true to description', UserId: 12, ProductId: 4},
      {rating: '4', title: 'Amazing', content: 'Beautiful fish, true to description', UserId: 12, ProductId: 15},
      {rating: '5', title: 'Amazing', content: 'Beautiful shrimp, cleans the tank wonderfully!', UserId: 12, ProductId: 16},

   ],
   product_order: [
		{OrderId: 1, ProductId: 1, quantity: 1, price: 57.50},
    {OrderId: 1, ProductId: 6, quantity: 1, price: 100.00},
    {OrderId: 1, ProductId: 10, quantity: 2, price: 11.99},
		{OrderId: 2, ProductId: 1, quantity: 2, price: 57.50},
    {OrderId: 2, ProductId: 12, quantity: 1, price: 39.95},
		{OrderId: 3, ProductId: 4, quantity: 4, price: 90.10},
		{OrderId: 4, ProductId: 2, quantity: 1, price: 30.99},
		{OrderId: 4, ProductId: 1, quantity: 1, price: 27.50},

   ]
};

  Orders.belongsToMany(Products, {through: 'Product_order'});
  Products.belongsToMany(Orders, {through: 'Product_order'});


	Products.belongsToMany(Users, {through: Carts});
	Users.belongsToMany(Products, {through: Carts});
	Carts.belongsTo(Users);
	Carts.belongsTo(Products);

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
