import React, { useEffect, useState } from 'react'
import { AuthData } from '/src/components/'
import graphQLFetch from '/src/graphql_cmd.js'

// to be replaced - listing components
import { TenantPropertyComparison } from '/src/components/'

function MyPosts() {
  const { auth } = AuthData()
  const postList = auth.userData.properties
  const [userPosts, setUserPosts] = useState([])
  
  // fetch property data on load
  useEffect(() => {
    handleGetProperty(postList)
  }, [])

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
