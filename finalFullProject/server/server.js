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
    // getTenant: getTenantResolver,
    // getAgent: getAgentResolver,

    // Property Service Resolvers
    getAllProperties: getAllPropertiesResolver,
    // getProperty: getPropertyResolver,
  },
  Mutation: {
    // User Service Resolvers
    // addTenant: addTenantResolver,
    // updateTenant: updateTenantResolver,
    // deleteTenant: deleteTenantResolver,
    // updateAgent: updateAgentResolver,
    // deleteAgent: deleteAgentResolver,

    // Property Service Resolvers
    // addProperty: addPropertyResolver,
    // updateProperty: updatePropertyResolver,
    // deleteProperty: deletePropertyResolver,
  }
};

//#region User Service Query Resolvers

//#endregion

//#region User Service Mutation Resolvers

//#endregion

//#region Property Service Query Resolvers
async function getAllPropertiesResolver(_, args) 
{
  try {
    // Find all properties in the properties collection
    const result = await db.collection('properties').find().toArray();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(`Error get All Properties: ${error.message}`);
  }
};
//#endregion

//#region Property Service Mutation Resolvers

//#endregion
//#endregion


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