const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const { parse } = require('path');

//#region DATABASE CONNECTION CODE
/******************************************* 
DATABASE CONNECTION CODE
********************************************/
//Note that the below variable is a global variable 
//that is initialized in the connectToDb function and used elsewhere.
let db;

//Function to connect to the database
async function connectToDb() {
    const url = 'mongodb://localhost/groupAssignment';
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
  }
//#endregion

//#region GraphQL Code
/******************************************* 
GraphQL CODE
********************************************/  
const resolvers = {
  Query: {
    // User Service Resolvers
    getTenant: getTenantResolver,
    getAgent: getAgentResolver,
    getAgentById: getAgentByIdResolver,

    // Property Service Resolvers
    getAllProperties: getAllPropertiesResolver,
    getProperty: getPropertyResolver,
  },
  Mutation: {
    // User Service Resolvers
    addTenant: addTenantResolver,
    updateTenant: updateTenantResolver,
    deleteTenant: deleteTenantResolver,
    updateAgent: updateAgentResolver,

    // Property Service Resolvers
    addProperty: addPropertyResolver,
    updateProperty: updatePropertyResolver,
    deleteProperty: deletePropertyResolver,
  }
};

async function getNextSequence(name) {
  // Description: get the value of key "current" in counters collection, and then increase it by 1
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

//#region User Service Query Resolvers
async function getTenantResolver(_, args) 
{
  // Description: get tenant by email
  try {
    const { email } = args;
    const result = await db.collection('tenants').findOne({ email });
    return result;
  } catch (error) {
    throw new Error(`Error get Tenant: ${error.message}`);
  }
}

async function getAgentResolver(_, args)
{
  // Description: get agent by email
  try {
    const { email } = args;
    const result = await db.collection('agents').findOne({ email });
    return result;
  } catch (error) {
    throw new Error(`Error get Agent: ${error.message}`);
  }
}

async function getAgentByIdResolver(_, args)
{
  // Description: get agent by id
  // Convert the id from a string to a number.
  args.id = parseInt(args.id);
  try {
    const { id } = args;
    const result = await db.collection('agents').findOne({ id });
    return result;
  } catch (error) {
    throw new Error(`Error get Agent: ${error.message}`);
  }

}
//#endregion

//#region User Service Mutation Resolvers
async function addTenantResolver(_, args) 
{
  // Description: add a new tenant
  try {
    const { name, email, password } = args;
    // Get the value of key "tenants" in counters collection
    const id = await getNextSequence('tenants');
    // Prepare a new tenant object
    const newTenant = {
      id, name, email, password, favorites: [], history: []
    };
    // Insert the new tenant object into the database
    const result = await db.collection('tenants').insertOne(newTenant);
    return result.ops[0];
  } catch (error) {
    throw new Error(`Error add Tenant: ${error.message}`);
  }
}

async function updateTenantResolver(_, args)
{
  // Description: update tenant according to the features of args
  try {
    // Convert all values that should be numbers from strings to numbers.
    args.id = parseInt(args.id); 
    // **args.favorites or args.history is the renewed list of property id
    if (args.favorites) {
      for (let i = 0; i < args.favorites.length; i++) {
        args.favorites[i] = parseInt(args.favorites[i]);        
      }
      // remove duplicates
      args.favorites = [...new Set(args.favorites)];
    }
    if (args.history) {
      for (let i = 0; i < args.history.length; i++) {
        args.history[i] = parseInt(args.history[i]);        
      }
      // remove duplicates
      args.history = [...new Set(args.history)];
    }
    
    const {id} = args;
    const result = await db.collection('tenants').updateOne(
      {id},
      {$set: args},
      {returnOriginal: false}
    );
  } catch (error) {
    throw new Error(`Error update Tenant: ${error.message}`);
  }
}

async function deleteTenantResolver(_, args) 
{
  // Description: delete tenant by id
  try {
    // Convert the id from a string to a number.
    args.id = parseInt(args.id); 
    const {id} = args;
    const result = await db.collection('tenants').deleteOne({id});
  } catch (error) {
    throw new Error(`Error delete Tenant: ${error.message}`);
  }
}

async function updateAgentResolver(_, args) 
{
  // Description: update agent according to the features of args
  try {
    // Convert all values that should be numbers from strings to numbers.
    args.id = parseInt(args.id);
    // When args has key propertyId, it means that the agent is deleting a property
    if (args.propertyId) {
      args.propertyId = parseInt(args.propertyId); 
      // Find the property list of the agent
      const result = await db.collection('agents').findOne({id: args.id});
      // Delete the property id from the property list
      const index = result.properties.indexOf(args.propertyId);
      if (index > -1) {
        result.properties.splice(index, 1);
      }
      args.properties = result.properties;
      // delete key propertyId from args
      delete args.propertyId;
    } 
    else if (args.properties) {
      // when propertyId is null and properties is not null, it means that the agent is adding a property
      // Convert all values that should be numbers from strings to numbers.
      for (let i = 0; i < args.properties.length; i++) {
        args.properties[i] = parseInt(args.properties[i]);        
      }
      // get the value of key "properties" in counters collection
      const newId = await db.collection('counters').findOne({_id: "properties"});
      // append the new property id to the end of the array
      args.properties.push(newId.current);
    }
    
    const {id} = args;
    const result = await db.collection('agents').updateOne(
      {id},
      {$set: args},
      {returnOriginal: false}
    );
  } catch (error) {
    throw new Error(`Error update Agent: ${error.message}`);
  }
}
//#endregion

//#region Property Service Query Resolvers
async function getAllPropertiesResolver(_, args) 
{
  // Description: get all properties
  try {
    const result = await db.collection('properties').find().toArray();
    return result;
  } catch (error) {
    throw new Error(`Error get All Properties: ${error.message}`);
  }
};

async function getPropertyResolver(_, args)
{
  // Description: get properties by idList
  try {
    const { idList } = args;
    // Convert all values that should be numbers from strings to numbers.
    for (let i = 0; i < idList.length; i++) {
      idList[i] = parseInt(idList[i]);
    }
    // find the properties whose id is in idList
    const result = await db.collection('properties').find({id: {$in: idList}}).toArray();
    return result;
  } catch (error) {
    throw new Error(`Error get Property: ${error.message}`);
  }
}
//#endregion

//#region Property Service Mutation Resolvers
async function addPropertyResolver(_, args)
{
  // Description: add a new property
  try {
    // Convert all values that should be numbers from strings to numbers.
    args.manager_id = parseInt(args.manager_id);
    const { 
      price, 
      type, 
      bedrooms, 
      bathrooms, 
      area, 
      display_address, 
      street_address, 
      manager_id,
      postal_code
    } = args;
    // Get the value of key "properties" in counters collection
    const id = await getNextSequence('properties');
    // Create a new property object
    const newProperty = {
      id, 
      price, 
      type, 
      bedrooms, 
      bathrooms, 
      area, 
      display_address, 
      street_address, 
      manager_id,
      postal_code
    };
    const result = await db.collection('properties').insertOne(newProperty);
    return result.ops[0];
  } catch (error) {
    throw new Error(`Error add Property: ${error.message}`);
  }
}

async function updatePropertyResolver(_, args)
{
  // Description: update property according to the features of args
  try {
    // Convert all values that should be numbers from strings to numbers.
    args.id = parseInt(args.id); 
    if (args.bathrooms) {
      args.bathrooms = parseInt(args.bathrooms);
    }
    if (args.bedrooms) {
      args.bedrooms = parseInt(args.bedrooms);
    }
    if (args.area) {
      args.area = parseInt(args.area);
    }
    if (args.price) {
      args.price = parseInt(args.price);
    }
    if (args.manager_id) {
      args.manager_id = parseInt(args.manager_id);
    }    
    const {id} = args;
    // Update the property who has id = args.id
    const result = await db.collection('properties').updateOne(
      {id},
      {$set: args},
      {returnOriginal: false}
    );
  } catch (error) {
    throw new Error(`Error update Property: ${error.message}`);
  }
}

async function deletePropertyResolver(_, args)
{
  // Description: delete property by id
  try {
    // Convert the id from a string to a number.
    args.id = parseInt(args.id); 
    const {id} = args;
    // delete the property who has id = args.id
    const result = await db.collection('properties').deleteOne({id});
  } catch (error) {
    throw new Error(`Error delete Property: ${error.message}`);
  }
}
//#endregion
//#endregion

//#region SERVER INITIALIZATION CODE
/******************************************* 
SERVER INITIALIZATION CODE
********************************************/
const app = express();

//Attaching a Static web server.
app.use(express.static('public')); 

//Creating and attaching a GraphQL API server.
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});
server.applyMiddleware({ app, path: '/graphql' });

//Starting the server that runs forever.
  (async function () {
    try {
      await connectToDb();
      app.listen(3000, function () {
        console.log('App started on port 3000');
      });
    } catch (err) {
      console.log('ERROR:', err);
    }
  })();
//#endregion