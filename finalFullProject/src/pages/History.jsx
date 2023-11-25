import React, { useEffect, useState } from 'react';
import { AuthData } from '/src/components/';
import graphQLFetch from '/src/graphql_cmd.js';

// to be replaced - listing components
import { TenantPropertyComparison } from '/src/components';


function History() {
  const { auth } = AuthData()
  const [userHistory, setUserHistory] = useState([])

  // fetch tenant data on load
  useEffect(() => {
    handleGetTenant()
  }, [])

  // fetch property data on auth change
  useEffect(() => {
    const historyList = auth.userData.favorites
    handleGetProperty(historyList)
  }, [auth])

  const handleGetTenant = async () => {
    // define the GraphQL query to check if tenant exists
    const getTenantQuery = `
        query GetTenantQuery($email: String!) {
          getTenant(email: $email) {
            name
            email
            password
            favorites
            history
          }
        }
      `;
    // define the variables required for the query
    const variables = {
      email: formValues.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await graphQLFetch(getTenantQuery, variables);
      if (result.getTenant) {
        setAuth({
          ...auth,
          userData: result.getTenant,
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
