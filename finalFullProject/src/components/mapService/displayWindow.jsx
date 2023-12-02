/**
 * React Component for House Infomation Window on Map
 * 2023-12-01
 * Liao Yueh-Fan
 */

import React, { useMemo, useState, useEffect } from 'react';
import "../styles/style.css";
const img_src = "https://www.investopedia.com/thmb/kZp7lYi4-3kV3w9EqVHoFjX3f3U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/buying-your-first-investment-property-top-10-tips.asp-ADD-Color-074cf6b2f8434f4fbc8d94edeb361cd6.jpg";

const DisplayWindow = ({ houseList, showInfoWindowId, setShowInfoWindowId, setShowOnMapId }) => {
  return (
    console.log(showInfoWindowId),
    <div className="displayWindow">
      {showInfoWindowId == 0 && <HouseBriefInfo houseList={houseList} setShowInfoWindowId={setShowInfoWindowId} setShowOnMapId={setShowOnMapId} />}
      {showInfoWindowId != 0 && <HouseDetailInfo houseList={houseList} showInfoWindowId={showInfoWindowId} />}
    </div>
  );
}

const HouseBriefInfo = ({ houseList, setShowInfoWindowId, setShowOnMapId }) => {

  const handleDblClick = (id) => {
    setShowInfoWindowId(id);
  }

  return (
    <div className="houseBriefInfo">
      {houseList.map((house, index) => (
        <div className="houseBriefInfoItem"
          key={index}
          ondblclick={() => handleDblClick(house.id)}
          onmouseover={() => setShowOnMapId(house.id)}
          onMouseOut={() => setShowOnMapId(0)}>
          <table>
            <tr>
              <td rowspan="6" className="houseBriefImg" >
                <img src={img_src} alt="house" />
              </td>
              <th className="houseInfoTitle" colspan="2">{house.display_address}/{house.street_address}</th>
            </tr>
            <tr className="houseInfoDetail">
              <td>House Type</td>
              <td>{house.type}</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Monthly Rent</td>
              <td>{house.price} SGD</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Bedrooms</td>
              <td>{house.bedrooms} rooms</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Bathrooms</td>
              <td>{house.bathrooms} rooms</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Size</td>
              <td>{house.area} square feets</td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
}

const HouseDetailInfo = ({ houseList, showInfoWindowId }) => {

  return (
    <div className="houseDetailInfo">
      {houseList.map((house, index) => (house.id == showInfoWindowId && (
        <div className="houseDetailInfoItem"
          key={index}
        >
          <table>
            <tr>
              <td rowSpan={1} className="houseDetailImgBig" >
                <img src={img_src} alt="house"/>
              </td>
              <td className="houseDetailImgSmall">
                <img src={img_src} alt="house"/>
                <img src={img_src} alt="house"/>
              </td>
            </tr>
            <tr>
              <th className="houseInfoTitle" colspan="2">{house.display_address}/{house.street_address}</th>
            </tr>
            <tr className="houseInfoDetail">
              <td>House Type</td>
              <td>{house.type}</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Monthly Rent</td>
              <td>{house.price} SGD</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Bedrooms</td>
              <td>{house.bedrooms} rooms</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Bathrooms</td>
              <td>{house.bathrooms} rooms</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Size</td>
              <td>{house.area} square feets</td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Postal Code</td>
              <td>{house.postal_code}</td>
            </tr>
          </table>
        </div>
      )))}
    </div>
  );
}

export default DisplayWindow;