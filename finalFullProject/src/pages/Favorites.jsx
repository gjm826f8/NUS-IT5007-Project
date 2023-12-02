// Purpose: Favorites page for the tenant user, shows the tenant's favorites properties
// Li Yueling
// First Create: 2023-11-20
// Function Complete: 2023-12-02

import React, { useEffect, useState } from 'react';
import { PropertyTable, Slider, getPropertyQuery, getTenantQuery } from "/src/components";
import { AuthData } from '/src/components/';
import DisplayWindow from "/src/components/mapService/displayWindow.jsx";
import Map from "/src/components/mapService/map.jsx";

function Favorites() {
  const { auth } = AuthData()
  const [userFavorites, setUserFavorites] = useState([]) // property data of the user's favorites initialization

  const [showOnMapId, setShowOnMapId] = useState(0);
  const [showInfoWindowId, setShowInfoWindowId] = useState(0);

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
        <div>
          {/* Liao's function */}
          <DisplayWindow houseList={userFavorites} showInfoWindowId={showInfoWindowId} setShowInfoWindowId={setShowInfoWindowId} setShowOnMapId={setShowOnMapId}/>
          <Map houseList={userFavorites} setShowInfoWindowId={setShowInfoWindowId} showOnMapId={showOnMapId}/>
        </div>
      )}
    </div>
  );
}

export default Favorites;
