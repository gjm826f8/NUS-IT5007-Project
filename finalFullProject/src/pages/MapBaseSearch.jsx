/**
 * Web Page for Map Base Search
 * 2023-11-29
 * Liao Yueh-Fan
 */

import React, { useState, useEffect } from "react";
import Map from "../components/mapService/map.jsx";
import DisplayWindow from "../components/mapService/displayWindow.jsx";
import { getAllPropertiesQuery } from "../components/FetchCmd.js";

export default function MapBaseSearch() {
  // const [showOnMapId, setShowOnMapId] = useState(0);
  // Google Map Marker: selected house state
  const [selectedId, setSelectedId] = useState(0);
  // House Info Window State
  const [showInfoWindowId, setShowInfoWindowId] = useState(0);
  // House List Filtered State
  const [houseListFiltered, setHouseListFiltered] = useState([]);
  // House List State
  const [houseList, setHouseList] = useState([]);
  // get house list from database
  useEffect(() => {
      handleGetAllProperty();
  }, []);

  const handleGetAllProperty = async () => {
    // send the request to the GraphQL API
    try {
      const result = await getAllPropertiesQuery();
      if (result.getAllProperties) {
        setHouseList(result.getAllProperties);
        console.log(houseList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <navBar /> */}
      {/* <searchBar /> */}
      <DisplayWindow houseList={houseList} showInfoWindowId={showInfoWindowId} setShowInfoWindowId={setShowInfoWindowId} 
         setSelectedId={setSelectedId} houseListFiltered={houseListFiltered} setHouseListFiltered={setHouseListFiltered}/>
      <Map houseList={houseListFiltered} setShowInfoWindowId={setShowInfoWindowId} selectedId={selectedId} setSelectedId={setSelectedId}/>
    </div>
  );
}