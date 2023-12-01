import React, { useEffect, useState } from 'react';
import { Space, Input, Button, Table, columns} from 'antd';
import { getAllPropertiesQuery, getPropertiesByAddressQuery } from '/src/components/';

const { Search } = Input;

const column = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Street Address',
    dataIndex: 'street_address',
    key: 'street_address',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Bedrooms',
    dataIndex: 'bedrooms',
    key: 'bedrooms',
    render: (text) => <a>{text}</a>,
  },
]

const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleGetAllProperties = async () => {
    try {
      const result = await getAllPropertiesQuery();
      if (result) {
        setProperties(result.getAllProperties);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetPropertiesByAddress = async (value) => {
    try {
      const result = await getPropertiesByAddressQuery(value);
      if (result) {
        console.log('result', result)
        setProperties(result.getPropertiesByAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async () => {
    if (searchValue.trim() === '') {
      // If the search value is empty, show all properties
      await handleGetAllProperties();
    } else {
      // Otherwise, search properties by address
      await handleGetPropertiesByAddress(searchValue);
    }
  };

  useEffect(() => {
    handleGetAllProperties();
  }, []);

  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder="Input address to search for"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            width: 400,
            marginTop: 30,
            marginRight: 100,
            marginLeft: 30,
          }}
        />
        <style>
          {`
            .ant-input-search-button {
              background-color: #1677ff;
            }

            .ant-input-search-button:focus {
              background-color: #1677ff;
            }
          `}
        </style>
      </Space>

      <Table columns={column} dataSource={properties} style={{marginTop: '20px', marginLeft:'20px',marginRight:'20px'}}/>
    
    </div>
  );
};

export default PropertySearch;


