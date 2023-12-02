// Purpose: History page for the tenant user, shows the tenant's viewing history
// Li Yueling
// First Create: 2023-11-20
// Function Complete: 2023-11-27

import React, { useEffect, useState } from 'react';
// impor auth and necessary graphql queries
import { AuthData, getPropertyQuery, getTenantQuery } from '/src/components/';

// to be replaced - listing components
import { PropertyTable } from '/src/components';


function History() {
  const { auth } = AuthData()
  const [userHistory, setUserHistory] = useState([]) // property data of the user's history initialization

  // fetch tenant's history list on load, and then fetch the property data
  useEffect(() => {
    handleGetTenant()
  }, [])

  const handleGetTenant = async () => {
    // define the variables required for the query
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await getTenantQuery(variables);
      if (result.getTenant) {
        // after getting the tenant's history list, get the property data
        handleGetProperty(result.getTenant.history)
      }
    } catch (error) {
      console.log(error);
    }
  };

  // backend call to get property data
  const handleGetProperty = async (pList) => {
    // define the variables required for the query
    const variables = {
      idList: pList
    };
    // send the request
    try {
      const result = await getPropertyQuery(variables);
      if (result) {
        // set the property data
        setUserHistory(result.getProperty)
      }
    } catch (error) {
      console.log(error)
    };
  };

  return (
    <div>
      {/* --- to be replaced - listing components */}
      <PropertyTable propertyData={userHistory} />
    </div>
  )
}

export default History
