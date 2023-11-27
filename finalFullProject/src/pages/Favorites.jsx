import React, { useEffect, useState } from 'react';
// import React, { useState } from "react";
import { Slider, TenantPropertyComparison, getPropertyQuery, getTenantQuery } from "/src/components";
import { AuthData } from '/src/components/';

function Favorites() {
  const { auth, setAuth } = AuthData()
  const [userFavorites, setUserFavorites] = useState([])

  // fetch tenant data on load
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
        handleGetProperty(result.getTenant.favorites)
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
