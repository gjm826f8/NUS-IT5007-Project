import React, { useEffect, useState } from 'react';
import { AuthData, getPropertyQuery, getTenantQuery } from '/src/components/';

// to be replaced - listing components
import { TenantPropertyComparison } from '/src/components';


function History() {
  const { auth, setAuth } = AuthData()
  const [userHistory, setUserHistory] = useState([])

  // fetch tenant data on load
  useEffect(() => {
    handleGetTenant()
  }, [])

  // // fetch property data on auth change
  // useEffect(() => {
  //   const historyList = auth.userData.favorites
  //   handleGetProperty(historyList)
  // }, [auth])

  const handleGetTenant = async () => {
    // define the variables required for the query
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await getTenantQuery(variables);
      if (result.getTenant) {
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
