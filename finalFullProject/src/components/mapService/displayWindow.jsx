/**
 * React Component for House Infomation Window on Map
 * 2023-12-01
 * Liao Yueh-Fan
 */

import React, { useMemo, useState, useEffect } from 'react';
import { AuthData } from "../AuthWrapper.jsx";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BiDetail } from "react-icons/bi";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { IoShareSocialOutline } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import { Button, Divider, Flex, Radio, Dropdown, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getTenantQuery, updateTenantMutation } from "../FetchCmd.js";
import { FacebookShareButton } from 'react-share';
import "../styles/style.css";
const img_src = "https://www.investopedia.com/thmb/kZp7lYi4-3kV3w9EqVHoFjX3f3U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/buying-your-first-investment-property-top-10-tips.asp-ADD-Color-074cf6b2f8434f4fbc8d94edeb361cd6.jpg";
const sample_text = "This is a sample text. The house have 3 bedrooms and 2 bathrooms. \
                    You are allowed to cook in the kitchen but please do not eat in your bedroom. \
                    Smoking is not allowed in the house. \
                    Please call me on the weekday from 9am to 10 pm! \
                    If you have any questions, please feel free to contact me.";

const DisplayWindow = ({ houseList, showInfoWindowId, setShowInfoWindowId, setShowOnMapId, houseListFiltered, setHouseListFiltered }) => {
  const { auth } = AuthData();
  const [favoritesList, setFavoritesList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortType, setSortType] = useState("default");
  var isTenant = auth.isAuthenticated && auth.asTenant;

  // get tenant information if logged in as tenant
  useEffect(() => {
    if (isTenant) {
      handleGetTenant();
    }
  }, []);

  const handleGetTenant = async () => {
    // define the variables required for the query
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await getTenantQuery(variables);
      if (result.getTenant) {
        setFavoritesList(result.getTenant.favorites);
        setHistoryList(result.getTenant.history);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // filter houseList depending on filterType
  useEffect(() => { getHouseListFiltered() },
    [houseList, favoritesList, historyList, filterType]);

  const getHouseListFiltered = () => {
    if (filterType == "all") {
      setHouseListFiltered(houseList);
    } else if (filterType == "favorite") {
      setHouseListFiltered(houseList.filter((house) => favoritesList.includes(house.id)));
    } else if (filterType == "history") {
      setHouseListFiltered(houseList.filter((house) => historyList.includes(house.id)));
    }
  };

  // sort houseListFiltered depending on sortType
  useEffect(() => { getHouseListSorted() },
    [houseListFiltered, sortType]);

  const getHouseListSorted = () => {
    if (sortType == "price_asc") {
      setHouseListFiltered(houseListFiltered.sort((a, b) => a.price - b.price));
    } else if (sortType == "price_desc") {
      setHouseListFiltered(houseListFiltered.sort((a, b) => b.price - a.price));
    } else if (sortType == "size_asc") {
      setHouseListFiltered(houseListFiltered.sort((a, b) => a.area - b.area));
    } else if (sortType == "size_desc") {
      setHouseListFiltered(houseListFiltered.sort((a, b) => b.area - a.area));
    }
  }

  // handle like
  const handleLike = (id) => async () => {
    if (!isTenant) {
      alert("Please login as tenant first!");
      return;
    }
    // add id to favoritesList
    const favoriteIds = favoritesList;
    favoriteIds.push(id);
    // add id to historyList, remove duplicates if any
    const historyIds = historyList;
    historyIds.push(id);
    const historyIdsSet = new Set(historyIds);
    const historyIdsNoDup = [...historyIdsSet];
    // define the variables required for the query
    const variables = {
      id: auth.id,
      favorites: favoriteIds,
      history: historyIdsNoDup,
    };
    // send the request to the GraphQL API
    try {
      const result = await updateTenantMutation(variables);
      if (result) {
        handleGetTenant();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle dislike
  const handleDislike = (id) => async () => {
    // remove id from favoritesList
    const favoriteIds = favoritesList;
    const index = favoriteIds.indexOf(id);
    if (index > -1) {
      favoriteIds.splice(index, 1);
    }
    // add id to historyList, remove duplicates if any
    const historyIds = historyList;
    historyIds.push(id);
    const historyIdsSet = new Set(historyIds);
    const historyIdsNoDup = [...historyIdsSet];
    // define the variables required for the query
    const variables = {
      id: auth.id,
      favorites: favoriteIds,
      history: historyIdsNoDup,
    };
    // send the request to the GraphQL API
    try {
      const result = await updateTenantMutation(variables);
      if (result) {
        handleGetTenant();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle viewed and add to history
  const handleView = (id) => async () => {
    setShowInfoWindowId(id);
    // if not logged in as tenant, do nothing
    if (!isTenant) {
      return;
    }
    // add id to historyList, remove duplicates if any
    const historyIds = historyList;
    historyIds.push(id);
    console.log("historyIds: ", historyIds, " id: ", id);
    const historyIdsSet = new Set(historyIds);
    const historyIdsNoDup = [...historyIdsSet];
    // define the variables required for the query
    const variables = {
      id: auth.id,
      favorites: favoritesList,
      history: historyIdsNoDup,
    };
    // send the request to the GraphQL API
    try {
      const result = await updateTenantMutation(variables);
      if (result) {
        handleGetTenant();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    console.log("DisplayWindow id: ", showInfoWindowId),
    <div className="displayWindow">
      <div className='functionBtn'>
        <FilterBtn filterType={filterType} setFilterType={setFilterType} isTenant={isTenant} setShowInfoWindowId={setShowInfoWindowId} />
        <SortBtn setSortType={setSortType}/>
      </div>
      {showInfoWindowId == 0 && <HouseBriefInfo houseList={houseListFiltered} setShowInfoWindowId={setShowInfoWindowId}
        setShowOnMapId={setShowOnMapId} favoritesList={favoritesList} historyList={historyList}
        handleView={handleView} handleLike={handleLike} handleDislike={handleDislike} />}
      {showInfoWindowId != 0 && <HouseDetailInfo houseList={houseListFiltered} showInfoWindowId={showInfoWindowId}
        setShowInfoWindowId={setShowInfoWindowId} favoritesList={favoritesList} handleLike={handleLike} handleDislike={handleDislike}
        setShowOnMapId={setShowOnMapId} />}
    </div>
  );
}

const FilterBtn = ({ filterType, setFilterType, isTenant, setShowInfoWindowId }) => {
  return (
    <div className="filterBtn">
      {isTenant && (
        <Radio.Group value={filterType} onChange={(e) => { setFilterType(e.target.value); setShowInfoWindowId(0) }}>
          <Radio.Button value="all">All Properties</Radio.Button>
          <Radio.Button value="favorite" >Favorite Properties</Radio.Button>
          <Radio.Button value="history">Viewed History</Radio.Button>
        </Radio.Group>
      )
      }
      {!isTenant && (
        <Radio.Group value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <Radio.Button value="all">All Properties</Radio.Button>
          <Radio.Button value="favorite" disabled>Favorite</Radio.Button>
          <Radio.Button value="history" disabled>History</Radio.Button>
        </Radio.Group>
      )
      }
    </div>
  );
}

const SortBtn = ({ setSortType }) => {
  const onClick = ({ key }) => {
    setSortType(key);
  };
  const items = [
    {
      label: 'Monthly Rent (Ascending)',
      key: 'price_asc',
    },
    {
      label: 'Monthly Rent (Descending)',
      key: 'price_desc',
    },
    {
      label: 'Area/Size (Ascending)',
      key: 'size_asc',
    },
    {
      label: 'Area/Size (Descending)',
      key: 'size_desc',
    },
  ];
  return (
    <Dropdown
    menu={{
      items,
      onClick,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Sorting By
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
    );
}

const HouseBriefInfo = ({ houseList, setShowInfoWindowId, setShowOnMapId, favoritesList, historyList, handleView, handleLike, handleDislike }) => {
  const handleClick = (id) => {
    setShowInfoWindowId(id);
    // handleView(id);
    console.log("handleClick id: ", id);
  }
  return (
    <div className="houseBriefInfo">
      {houseList.map((house, index) => (
        <div className="houseBriefInfoItem"
          key={index}>
          <table>
            <tr>
              <td rowspan="6" className="houseBriefImg" >
                <img src={img_src} alt="house" />
              </td>
              <th className="houseInfoTitle" colspan="3">{house.display_address} / {house.street_address}</th>
            </tr>
            <tr className="houseInfoDetail">
              <td>House Type</td>
              <td>{house.type}</td>
              <td className="houseBriefButton">
                <BiDetail className="w-6 h-6 cursor-pointer"
                  title="click to view details"
                  onClick={handleView(house.id)}></BiDetail>
              </td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Monthly Rent</td>
              <td>{house.price} SGD</td>
              <td className="houseBriefButton">
                <LiaMapMarkerAltSolid className="w-6 h-6 cursor-pointer"
                  title="click to show on map"
                  onClick={setShowOnMapId(house.id)}></LiaMapMarkerAltSolid>
              </td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Bedrooms</td>
              <td>{house.bedrooms} rooms</td>
              <td className="houseBriefButton">
                {favoritesList.includes(
                  house.id
                ) ? (
                  <FcLike className="w-6 h-6 cursor-pointer"
                    title="click to remove from favorites"
                    onClick={handleDislike(house.id)} />
                ) : (
                  <FcLikePlaceholder className="w-6 h-6 cursor-pointer"
                    title="click to add to favorites"
                    onClick={handleLike(house.id)} />
                )}
              </td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Bathrooms</td>
              <td>{house.bathrooms} rooms</td>
              <td className="houseBriefButton">
                <FacebookShareButton
                  url={'https://www.facebook.com/'}
                  quote={'Facebook Post'}
                  hashtag="#SingaporeHouseRental"
                >
                  <IoShareSocialOutline className="w-6 h-6 cursor-pointer"
                    title="click to share house information"></IoShareSocialOutline>
                </FacebookShareButton>
              </td>
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

const HouseDetailInfo = ({ houseList, showInfoWindowId, setShowInfoWindowId, favoritesList, handleLike, handleDislike, setShowOnMapId }) => {
  const handleBack = () => {
    return () => {
      setShowInfoWindowId(0);
      setShowOnMapId(0);
    };
  }

  return (
    <div className="houseDetailInfo">
      {houseList.map((house, index) => (house.id == showInfoWindowId && (
        <div className="houseDetailInfoItem"
          key={index}
        >
          <table>
            <tr>
              <td rowspan="1" className="houseDetailImgBig" >
                <img src={img_src} alt="house" />
              </td>
              <td className="houseDetailImgSmall">
                <img src={img_src} alt="house" />
                <img src={img_src} alt="house" />
              </td>
              <td className="houseDetailImgSmall">
                <img src={img_src} alt="house" />
                <img src={img_src} alt="house" />
              </td>
            </tr>
            <tr>
              <th className="houseInfoTitle" colspan="3">{house.display_address} / {house.street_address}</th>
            </tr>
            <tr className="houseInfoDetail">
              <td>House Type</td>
              <td>{house.type}</td>
              <td className="houseDetailButton" align="right">
                {favoritesList.includes(
                  house.id
                ) ? (
                  <FcLike className="w-6 h-6 cursor-pointer"
                    title="click to remove from favorites"
                    onClick={handleDislike(house.id)} />
                ) : (
                  <FcLikePlaceholder className="w-6 h-6 cursor-pointer"
                    title="click to add to favorites"
                    onClick={handleLike(house.id)} />
                )}
              </td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Monthly Rent</td>
              <td>{house.price} SGD</td>
              <td className="houseDetailButton" align="right">
                <FacebookShareButton
                  url={'https://www.facebook.com/'}
                  quote={'Facebook Post'}
                  hashtag="#SingaporeHouseRental"
                >
                  <IoShareSocialOutline className="w-6 h-6 cursor-pointer"
                    title="click to share house information"></IoShareSocialOutline>
                </FacebookShareButton>
              </td>
            </tr>
            <tr className="houseInfoDetail">
              <td>Bedrooms</td>
              <td>{house.bedrooms} rooms</td>
              <td className="houseDetailButton" align="right">
                <TbArrowBackUp className="w-6 h-6 cursor-pointer"
                  title="click to go back"
                  onClick={handleBack()}></TbArrowBackUp>
              </td>
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
            <br></br>
          </table>

          <HouseDetailInfoParagraph num={1} text={sample_text} />
          <br></br>
          <HouseDetailInfoParagraph num={2} text={sample_text} />
          <br></br>
          <HouseDetailInfoParagraph num={3} text={sample_text} />
        </div>
      )))}
    </div>
  );
}

const HouseDetailInfoParagraph = ({ num, text }) => {
  return (
    <table className="houseDetailInfoParagraph">
      <tr>
        <th className="houseInfoDParagraph">Detail Title {num} </th>
      </tr>
      <tr>
        <hr></hr>
      </tr>
      <tr className="houseInfoDetail">
        <td >{text}</td>
      </tr>
      <tr>
        <hr></hr>
      </tr>
    </table>
  );
}

export default DisplayWindow;