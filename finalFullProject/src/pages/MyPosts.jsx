import React, { useEffect, useState } from 'react'
import { AuthData } from '/src/components/'
import graphQLFetch from '/src/graphql_cmd.js'

// to be replaced - listing components
import { TenantPropertyComparison } from '/src/components/'

function MyPosts() {
  const { auth, setAuth } = AuthData()
  const [userPosts, setUserPosts] = useState([])
  
  // fetch agent data on load
  useEffect(() => {
    handleGetAgent()
  }, [])

  // fetch property data on change in auth
  useEffect(() => {
    const postList = auth.userData.properties
    handleGetProperty(postList)
  }, [auth])

  const handleGetAgent = async () => {
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
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await graphQLFetch(getAgentQuery, variables);
      if (result.getAgent) {
        setAuth({
          ...auth,
          userData: result.getAgent,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  };

  // backend call to get property data
  const handleGetProperty = async (pList) => {
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
    const variables = {
      idList: pList
    };
    // send the request
    try {
      const result = await graphQLFetch(getPropertyQuery, variables);
      if (result) {
        setUserPosts(result.getProperty)
      }
    } catch (error) {
      console.log(error)
    };
  };

  return (
    <div>
      {/* --- to be replaced - listing components */}
      <TenantPropertyComparison propertyData={userPosts} />
    </div>
  )
}

export default MyPosts
