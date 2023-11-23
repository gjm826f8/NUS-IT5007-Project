import React, { useEffect, useState } from 'react';
import { AuthData } from '/src/components/';
import graphQLFetch from '/src/graphql_cmd.js';

// to be replaced - listing components
import { TenantPropertyComparison } from '/src/components';


function History() {
  const { auth } = AuthData()
  const historyList = auth.userData.history
  const [userHistory, setUserHistory] = useState([])

  // fetch property data on load
  useEffect(() => {
    handleGetProperty(historyList)
  }, [])

  // backend call to get property data
  const handleGetProperty = async (pList) => {
    const getPropertyQuery = `
      query GetPropertyQuery ($idList: [ID]) {
        getProperty (idList: $idList) {
          id
          listing_id
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
        setUserHistory(result.getProperty)
      }
    } catch (error) {
      console.log(error)
    };
  };

  return (
    <div>
      {/* --- to be replaced - listing components */}
      <TenantPropertyComparison propertyData={userHistory} />
    </div>
  )
}

export default History
