/**
 * React Component for Google Map
 * 2023-11-29
 * Liao Yueh-Fan
 */

import React, { useMemo, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import "../styles/style.css";

const normal_icon_url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
const like_icon_url = "http://maps.google.com/mapfiles/ms/icons/pink-dot.png";
const click_icon_url = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";

const Map = ({houseList, setShowInfoWindowId, showOnMapId}) => {
  // Google Map Marker: mouse over and mouse out state
  const [showInfoPropId, setShowInfoPropId] = useState(0);
  // Google Map Marker: selected house state
  const [selectedId, setSelectedId] = useState(0);
  // Google Map Marker: when click on a marker change color
  // Google Map Center: Singapore or selected house
  const [center, setCenter] = useState({ lat: 1.3648480445323086, lng: 103.81261318608769 });
  // Google Map Zoom: default 12 or selected 15
  const [zoom, setZoom] = useState(12);

  // Google Map API Key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBrHnN-mtF_XkCy80h7MI2c25mQ6W9qBo8", // GOOGLE_MAP_API_KEY,
  });
  // Google Map Center and Zoom decide by showOnMapId state
  useEffect(() => {
    if (showOnMapId != 0) {
      setSelectedId(showOnMapId);
      for (var i = 0; i < houseList.length; i++) {
        if (houseList[i].id == showOnMapId) {
          setCenter({ lat: houseList[i].lat, lng: houseList[i].lng });
          break;
        }
      }
      setZoom(15);
    }
  }, [showOnMapId]);

  return (
    <div className="map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={zoom}
        >
          {
            houseList.map((house) => (
              <Marker
                key={house.id}
                position={{ lat: house.lat, lng: house.lng }}
                onClick={() => {
                  setSelectedId(house.id);
                  setShowInfoWindowId(house.id);
                  setCenter({ lat: house.lat, lng: house.lng });
                  setZoom(15);
                }}
                onMouseOver={() => setShowInfoPropId(house.id)} 
                onMouseOut={() => setShowInfoPropId(0)}
                icon={house.id == selectedId ? click_icon_url : normal_icon_url}
              >
                {showInfoPropId == house.id && (
                    <InfoWindow>
                        <div>
                          <h4>{house.display_address}/{house.street_address}</h4><br/>
                          House Type: {house.type}<br/>
                          Bedroom Number: {house.bedrooms}<br/>
                          Bathroom Number: {house.bathrooms}<br/>
                          Monthly Rent: {house.price}<br/>
                        </div>
                    </InfoWindow>
                )}
              </Marker>
            ))
          }
        </GoogleMap>
      )}
    </div>
  );
}

export default Map;
