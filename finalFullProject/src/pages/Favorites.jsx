import React, { useEffect, useState } from 'react';
// import React, { useState } from "react";
import { Slider, TenantPropertyComparison } from "/src/components";
import { AuthData } from '/src/components/';
import graphQLFetch from '/src/graphql_cmd.js';

function Favorites() {
  const { auth, setAuth } = AuthData()
  const [userFavorites, setUserFavorites] = useState([])

  // fetch tenant data on load
  useEffect(() => {
    handleGetTenant()
  }, [])

  // fetch property data on auth change
  useEffect(() => {
    const favoritesList = auth.userData.favorites
    handleGetProperty(favoritesList)
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
      email: auth.email,
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
        setUserFavorites(result.getProperty)
      }
    } catch (error) {
      console.log(error)
    };
  }

  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <Slider enabled={enabled} setEnabled={setEnabled} />
      {enabled ? (
        <TenantPropertyComparison propertyData={userFavorites} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Favorites;
