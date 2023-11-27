import graphQLFetch from "/src/graphql_cmd.js";

//#region User Service Query
const getTenantQuery = async (args) => {
  // define the GraphQL query to check if tenant exists
  const getTenantQuery = `
  query GetTenantQuery($email: String!) {
    getTenant(email: $email) {
      id
      name
      email
      password
      favorites
      history
    }
  }
`;
// define the variables required for the query
const variables = args;
// send the request to the GraphQL API
try {
  const result = await graphQLFetch(getTenantQuery, variables);
  return result;
} catch (error) {
  console.log(error);
}
};

const getAgentQuery = async (args) => {
  // define the GraphQL query to check if agent exists
  const getAgentQuery = `
      query GetAgentQuery($email: String!) {
        getAgent(email: $email) {
          id
          name
          email
          password
          properties
        }
      }
    `;
  // define the variables required for the query
  const variables = args;
  // send the request to the GraphQL API
  try {
    const result = await graphQLFetch(getAgentQuery, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
};
//#endregion

//#region User Service Mutation
const addTenantMutation = async (args) => {
  // define the GraphQL mutation to add new tenant
  const addTenantMutation = `
  mutation AddTenantMutation ($name: String!, $email: String!, $password: String!) {
    addTenant (name: $name, email: $email, password: $password) {
      id
      name
      email
      password
      favorites
      history
    }
  }
  `;
  // define the variables required for the query
  const variables = args;
  // send the request to the GraphQL API
  try {
    const result = await graphQLFetch(addTenantMutation, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateTenantMutation = async (args) => {
  // define the GraphQL query to update tenant
  const updateTenantMutation = `
  mutation UpdateTenantMutation(
      $id: ID!
      $name: String
      $email: String
      $password: String
      $favorites: [ID]
      $history: [ID]
  ) {
      updateTenant(
      id: $id
      name: $name
      email: $email
      password: $password
      favorites: $favorites
      history: $history
      ) {
      id
      }
  }
  `;
  // define the variables required for the query
  const variables = args;
  // send the request to the GraphQL API
  try {
    const result = await graphQLFetch(updateTenantMutation, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteTenantMutation = async (args) => {
  // define the GraphQL query to add property
  const deleteTenantMutation = `
      mutation DeleteTenantMutation ($id: ID!) {
        deleteTenant (id:$id) {
          id
        }
      }
        `
  // define the variables required for the query
  const variables = args;
  try {
    const result = await graphQLFetch(deleteTenantMutation, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateAgentMutation = async (args) => {
  const updateAgentMutation = `
  mutation UpdateAgentMutation(
    $id: ID!
    $name: String
    $email: String
    $password: String
    $properties: [ID]
  	$propertyId:ID
  ) {
    updateAgent(
      id: $id
      name: $name
      email: $email
      password: $password
      properties: $properties
      propertyId: $propertyId
    ) {
      id
    }
  }
`
  // define the variables required for the query
  const variables = args;
  // send the request to the GraphQL API
  try {
    const result = await graphQLFetch(updateAgentMutation, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
};
//#endregion

//#region Property Service Query
const getPropertyQuery = async (args) => {
  const getPropertyQuery = `
      query GetPropertyQuery ($idList: [ID]) {
        getProperty (idList: $idList) {
          id
          price
          type
          bathrooms
          bedrooms
          area
          display_address
          street_address
          manager_id
          postal_code
        }
      }
    `;
  // define the variables required for the query
  const variables = args;
  // send the request
  try {
    const result = await graphQLFetch(getPropertyQuery, variables);
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error)
  };
};
//#endregion

//#region Property Service Mutation
const addPropertyMutation = async (args) => {
  const addPropertyMutation = `
    mutation AddProperty(
      $price: Int!
      $type: String!
      $bathrooms: Int!
      $bedrooms: Int!
      $area: Int!
      $display_address: String!
      $street_address: String!
      $manager_id: ID!
      $postal_code: String!
    ) {
      addProperty(
        price: $price
        type: $type
        bathrooms: $bathrooms
        bedrooms: $bedrooms
        area: $area
        display_address: $display_address
        street_address: $street_address
        manager_id: $manager_id
        postal_code: $postal_code
      ) {
        price
        type
        bathrooms
        bedrooms
        area
        display_address
        street_address
        manager_id
        postal_code
      }
    }    
    `;
  // define the variables required for the query
  const variables = args;
  try {
    const result = await graphQLFetch(addPropertyMutation, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updatePropertyMutation = async (args) => {
  // define the GraphQL query to add property
  const updatePropertyMutation = `
    mutation UpdatePropertyMutation(
        $id: ID!
        $price: Int
        $type: String
        $bathrooms: Int
        $bedrooms: Int
        $area: Int
        $display_address: String
        $street_address: String
        $manager_id: ID
        $postal_code: String
      ) {
        updateProperty(
          id: $id
          price: $price
          type: $type
          bathrooms: $bathrooms
          bedrooms: $bedrooms
          area: $area
          display_address: $display_address
          street_address: $street_address
          manager_id: $manager_id
          postal_code: $postal_code
        ) {
          id
        }
      }
    `;
  // define the variables required for the query
  const variables = args;
  try {
    const result = await graphQLFetch(updatePropertyMutation, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deletePropertyMutation = async (args) => {
  // define the GraphQL query to add property
  const deletePropertyMutation = `
    mutation DeletePropertyMutation(
        $id: ID!
      ) {
        deleteProperty(
          id: $id
        ) {
          id
        }
      }
        `
  // define the variables required for the query
  const variables = args;
  try {
    const result = await graphQLFetch(deletePropertyMutation, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
};
//#endregion

export {
  addPropertyMutation,
  addTenantMutation,
  deletePropertyMutation, 
  deleteTenantMutation, 
  getAgentQuery,
  getPropertyQuery,
  getTenantQuery,
  updateAgentMutation,
  updatePropertyMutation,
  updateTenantMutation
};

