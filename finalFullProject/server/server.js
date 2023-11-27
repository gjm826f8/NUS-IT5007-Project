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
    // deleteAgent: deleteAgentResolver,

    // Property Service Resolvers
    addProperty: addPropertyResolver,
    updateProperty: updatePropertyResolver,
    deleteProperty: deletePropertyResolver,
  }
};

async function getNextSequence(name) {
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
  try {
    // Find the tenant in the tenants collection
    const { email } = args;
    const result = await db.collection('tenants').findOne({ email });
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(`Error get Tenant: ${error.message}`);
  }
}

async function getAgentResolver(_, args)
{
  try {
    const { email } = args;
    const result = await db.collection('agents').findOne({ email });
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(`Error get Agent: ${error.message}`);
  }
}

//#endregion

//#region User Service Mutation Resolvers
async function addTenantResolver(_, args) 
{
  try {
    // Insert the tenant into the tenants collection
    const { name, email, password } = args;
    const id = await getNextSequence('tenants');
    // create a new tenant object
    const newTenant = {
      id, name, email, password, favorites: [], history: []
    };
    // insert the new tenant object into the database
    const result = await db.collection('tenants').insertOne(newTenant);
    // console.log(result);
    return result.ops[0];
  } catch (error) {
    throw new Error(`Error add Tenant: ${error.message}`);
  }
}

async function updateTenantResolver(_, args)
{
  try {
    // according to the features of args, update the tenant in the tenants collection
    args.id = parseInt(args.id);
    // **args.favorites or args.history is the renewed list of property id
    if (args.favorites) {
      for (let i = 0; i < args.favorites.length; i++) {
        args.favorites[i] = parseInt(args.favorites[i]);        
      }
    }
    if (args.history) {
      for (let i = 0; i < args.history.length; i++) {
        args.history[i] = parseInt(args.history[i]);        
      }
    }
    
    // console.log(args);
    const {id} = args;
    // console.log(args)
    const result = await db.collection('tenants').updateOne(
      {id},
      {$set: args},
      {returnOriginal: false}
    );
    // console.log(result);
  } catch (error) {
    throw new Error(`Error update Tenant: ${error.message}`);
  }
}

async function deleteTenantResolver(_, args) {
  try {
    args.id = parseInt(args.id);
    const {id} = args;
    const result = await db.collection('tenants').deleteOne({id});
    // console.log(result);
  } catch (error) {
    throw new Error(`Error delete Tenant: ${error.message}`);
  }
}

async function updateAgentResolver(_, args) {
  try {
    // according to the features of args, update the agent in the agents collection
    args.id = parseInt(args.id);
    if (args.propertyId) {
      args.propertyId = parseInt(args.propertyId);
      // find and delete propertyId from properties array
      const result = await db.collection('agents').findOne({id: args.id});
      const index = result.properties.indexOf(args.propertyId);
      if (index > -1) {
        result.properties.splice(index, 1);
      }
      args.properties = result.properties;
      // delete key propertyId from args
      delete args.propertyId;
      console.log(args)
    } else if (args.properties) {
      for (let i = 0; i < args.properties.length; i++) {
        args.properties[i] = parseInt(args.properties[i]);        
      }
      // get the value of key "properties" in counters collection
      const newId = await db.collection('counters').findOne({_id: "properties"});
      // append the new property id to the end of the array
      args.properties.push(newId.current);
    }
    
    // console.log(args);
    const {id} = args;
    const result = await db.collection('agents').updateOne(
      {id},
      {$set: args},
      {returnOriginal: false}
    );
    // console.log(result);
  } catch (error) {
    throw new Error(`Error update Agent: ${error.message}`);
  }
}
//#endregion

//#region Property Service Query Resolvers
async function getAllPropertiesResolver(_, args) 
{
  try {
    // Find all properties in the properties collection
    const result = await db.collection('properties').find().toArray();
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(`Error get All Properties: ${error.message}`);
  }
};

async function getPropertyResolver(_, args)
{
  try {
    const { idList } = args;
    // for ids in idList, change type from string to int
    for (let i = 0; i < idList.length; i++) {
      idList[i] = parseInt(idList[i]);
    }
    const result = await db.collection('properties').find({id: {$in: idList}}).toArray();
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(`Error get Property: ${error.message}`);
  }
}
//#endregion

//#region Property Service Mutation Resolvers
async function addPropertyResolver(_, args)
{
  try {
    // Insert the property into the properties collection
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
    // console.log(price, type, bedrooms, bathrooms, area, display_address, street_address, manager_id, postal_code)
    const id = await getNextSequence('properties');
    // create a new property object
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
    // insert the new property object into the database
    // console.log(newProperty)
    const result = await db.collection('properties').insertOne(newProperty);
    // console.log(result);
    return result.ops[0];
  } catch (error) {
    throw new Error(`Error add Property: ${error.message}`);
  }
}

async function updatePropertyResolver(_, args)
{
  try {
    // according to the features of args, update the tenant in the tenants collection
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
    // console.log(args);
    const {id} = args;
    // console.log(args)
    const result = await db.collection('properties').updateOne(
      {id},
      {$set: args},
      {returnOriginal: false}
    );
    // console.log(result);
  } catch (error) {
    throw new Error(`Error update Property: ${error.message}`);
  }
}

async function deletePropertyResolver(_, args)
{
  try {
    args.id = parseInt(args.id);
    const {id} = args;
    const result = await db.collection('properties').deleteOne({id});
    // console.log(result);
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