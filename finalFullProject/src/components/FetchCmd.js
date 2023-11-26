import graphQLFetch from "/src/graphql_cmd.js";

//#region User Service Query
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
}

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
        `
  // define the variables required for the query
  const variables = args;
  try {
    const result = await graphQLFetch(deletePropertyMutation, variables);
    return result;
  } catch (error) {
    console.log(error);
  }
}
//#endregion

export { deletePropertyMutation, getAgentQuery, getPropertyQuery, updatePropertyMutation };

