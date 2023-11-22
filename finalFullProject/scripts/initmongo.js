// initmongo.js

//To execute:
//$mongo groupAssignment initmongo.js
//Above command to be executed from the directory where initmongo.js is present

//Perform a cleanup of existing data.
db.dropDatabase();

// Create a collection for Counters
db.createCollection("counters");
db.counters.insert({ _id: 'tenants', current: 5 });
db.counters.insert({ _id: 'agents', current: 5 });
db.counters.insert({ _id: 'properties', current: 10 });

// Create collections for User Service
db.createCollection("tenants");
db.createCollection("agents");

// Insert 5 sample tenant with an "id" field
db.tenants.insert({
    id: 1, // Unique ID for the user
    name: "John Doe",
    email: "johndoe@example.com",
    password: "john",
    favorites: [1, 2, 3, 4, 5],
});

db.tenants.insert({
    id: 2, // Unique ID for the user
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: "jane",
    favorites: [1],
});

db.tenants.insert({
    id: 3, // Unique ID for the user
    name: "Bob Smith",
    email: "bobsmith@example.com",
    password: "bob",
    favorites: [2, 3],
});

db.tenants.insert({
    id: 4, // Unique ID for the user
    name: "Alice Smith",
    email: "alicesmith@example.com",
    password: "alice",
    favorites: [1, 2, 4],
});

db.tenants.insert({
    id: 5, // Unique ID for the user
    name: "Mark Johnson",
    email: "markjohnson@example.com",
    password: "mark",
    favorites: [],
});

// Insert 5 sample agent with an "id" field
db.agents.insert({
    id: 1, // Unique ID for the user
    name: "Andrew Jordan",
    email: "andrewjordan@example.org",
    password: "andrew",
    properties: [1, 6]
});

db.agents.insert({
    id: 2, // Unique ID for the user
    name: "Christie Ward",
    email: "christieward@example.org",
    password: "christie",
    properties: [2, 5]
});

db.agents.insert({
    id: 3, // Unique ID for the user
    name: "Michael Davila",
    email: "michaeldavila@example.org",
    password: "michael",
    properties: [3, 7, 8, 10]
});

db.agents.insert({
    id: 4, // Unique ID for the user
    name: "Sandra Smith",
    email: "sandrasmith@example.org",
    password: "sandra",
    properties: [4]
});

db.agents.insert({
    id: 5, // Unique ID for the user
    name: "Brian Walsh",
    email: "brianwalsh@example.org",
    password: "brian",
    properties: [9]
});

// Create a collection for Property Service
db.createCollection("properties");

// Insert 10 sample property with an "id" field
db.properties.insert({
    id: 1, // Unique ID for the property
    listing_id: 7170325,
    price: 2400,
    type: "Condo",
    bathrooms: 1,
    bedrooms: 1,
    area: 511,
    display_address: "145 Borinquen Place",
    street_address: "145 Borinquen Place",
    manager_id: 3,
    postal_code: "111211"
});

db.properties.insert({
    id: 2, // Unique ID for the property
    listing_id: 7092344,
    price: 3800,
    type: "HDB",
    bathrooms: 1,
    bedrooms: 2,
    area: 637,
    display_address: "East 44th",
    street_address: "230 East 44th",
    manager_id: 4,
    postal_code: "123456"
});

db.properties.insert({
    id: 3, // Unique ID for the property
    listing_id: 7158677,
    price: 3495,
    type: "Condo",
    bathrooms: 1,
    bedrooms: 2,
    area: 1694,
    display_address: "East 56th Street",
    street_address: "405 East 56th Street",
    manager_id: 2,
    postal_code: "635212"
});

db.properties.insert({
    id: 4, // Unique ID for the property
    listing_id: 7211212,
    price: 3000,
    type: "HDB",
    bathrooms: 1,
    bedrooms: 3,
    area: 1791,
    display_address: "Metropolitan Avenue",
    street_address: "792 Metropolitan Avenue",
    manager_id: 4,
    postal_code: "110941"
});

db.properties.insert({
    id: 5, // Unique ID for the property
    listing_id: 7225292,
    price: 2795,
    type: "HDB",
    bathrooms: 1,
    bedrooms: 0,
    area: 652,
    display_address: "East 34th Street",
    street_address: "340 East 34th Street",
    manager_id: 2,
    postal_code: "364513"
});

db.properties.insert({
    id: 6, // Unique ID for the property
    listing_id: 7226687,
    price: 7200,
    type: "Condo",
    bathrooms: 1,
    bedrooms: 3,
    area: 633,
    display_address: "East 16th Street",
    street_address: "145 East 16th Street",
    manager_id: 2,
    postal_code: "150087"
});

db.properties.insert({
    id: 7, // Unique ID for the property
    listing_id: 7126989,
    price: 6000,
    type: "Condo",
    bathrooms: 2,
    bedrooms: 3,
    area: 1100,
    display_address: "East 13th Street",
    street_address: "410 East 13th Street",
    manager_id: 3,
    postal_code: "646121"
});

db.properties.insert({
    id: 8, // Unique ID for the property
    listing_id: 7131094,
    price: 2435,
    type: "HDB",
    bathrooms: 0,
    bedrooms: 1,
    area: 1442,
    display_address: "E 19 Street",
    street_address: "346 E 19 Street",
    manager_id: 1,
    postal_code: "145351"
});

db.properties.insert({
    id: 9, // Unique ID for the property
    listing_id: 7224815,
    price: 6850,
    type: "Condo",
    bathrooms: 3,
    bedrooms: 3,
    area: 1452,
    display_address: "Hicks Street",
    street_address: "94 Hicks Street",
    manager_id: 1,
    postal_code: "152436"
});

db.properties.insert({
    id: 10, // Unique ID for the property
    listing_id: 7224815,
    price: 6850,
    type: "Condo",
    bathrooms: 3,
    bedrooms: 3,
    area: 1452,
    display_address: "Hicks Street",
    street_address: "94 Hicks Street",
    manager_id: 1,
    postal_code: "152436"
});
