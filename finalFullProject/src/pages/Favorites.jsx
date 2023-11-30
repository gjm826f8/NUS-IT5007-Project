// Purpose: Favorites page for the tenant user, shows the tenant's favorites properties

import React, { useEffect, useState } from 'react';
import { PropertyTable, Slider, getPropertyQuery, getTenantQuery } from "/src/components";
import { AuthData } from '/src/components/';

function Favorites() {
  const { auth } = AuthData()
  const [userFavorites, setUserFavorites] = useState([]) // property data of the user's favorites initialization

  // fetch tenant favorites list on load, and then fetch the property data
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
        // after getting the tenant's favorites list, get the property data
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
        // set the property data
        setUserFavorites(result.getProperty)
      }
    } catch (error) {
      console.log(error)
    };
  }

  const [enabled, setEnabled] = useState(false); // slider control

  // on slider change, fetch the tenant favorites list and new property data again
  useEffect(() => {
    handleGetTenant();
  }, [enabled]);

  return (
    <div>
      <Slider enabled={enabled} setEnabled={setEnabled} />
      {enabled ? (
        <PropertyTable propertyData={userFavorites} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Favorites;
