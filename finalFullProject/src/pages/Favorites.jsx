import React, { useEffect, useState } from 'react';
// import React, { useState } from "react";
import { Slider, TenantPropertyComparison } from "/src/components";
import { AuthData } from '/src/components/';
import graphQLFetch from '/src/graphql_cmd.js';

function Favorites() {
  const { auth } = AuthData()
  const favoritesList = auth.userData.favorites
  const [userFavorites, setUserFavorites] = useState([])

  // fetch property data on load
  useEffect(() => {
    handleGetProperty(favoritesList)
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
