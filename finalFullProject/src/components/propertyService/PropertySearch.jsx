import React, { useEffect, useState } from 'react';
import { Space, Input, Button, Table, columns, Select, InputNumber} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
  const [price, setPrice] = useState(99999);

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
      console.log(properties);
    } else {
      // Otherwise, search properties by address
      await handleGetPropertiesByAddress(searchValue);
      console.log(properties);
    }
  };

  useEffect(() => {
    handleGetAllProperties();
  }, []);

  const onChangeType = async(value) => {
    if (searchValue.trim() === '') {
      // If the search value is empty, show all properties
      try {
        const result = await getAllPropertiesQuery();
        if (value) {
          const typeProperties = result.getAllProperties.filter(item => item.type === value);
          setProperties(typeProperties);
        }else{
          setProperties(result.getAllProperties);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await getPropertiesByAddressQuery(value);
        if (value) {
          const typeProperties = result.getAllPropertiesByAddress.filter(item => item.type === value);
          setProperties(typeProperties);
        }else{
          setProperties(result.getPropertiesByAddress);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(value);
    // await onSearch();
    // if(value) {
    //   let propertiesType = properties.filter(item => item.type === value)
    //   setProperties(propertiesType);
    // }
  }

  const onChangeRoom = async(value) => {
    if (searchValue.trim() === '') {
      // If the search value is empty, show all properties
      try {
        let result = await getAllPropertiesQuery();
        if (value) {
          let roomProperties = result.getAllProperties.filter(item => item.bedrooms == value);
          setProperties(roomProperties);
        }else{
          setProperties(result.getAllProperties);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let result = await getPropertiesByAddressQuery(value);
        if (value) {
          let roomProperties = result.getAllPropertiesByAddress.filter(item => item.bedrooms == value);
          setProperties(roomProperties);
        }else{
          setProperties(result.getPropertiesByAddress);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(value);
    // await onSearch();
    // console.log(properties);
    // if(value) {
    //   let propertiesRoom = properties.filter(item => item.bedrooms == value)
    //   console.log('-----',propertiesRoom)
    //   setProperties(propertiesRoom);
    // }
  }
  const onChangePrice = async() => {
    if (searchValue.trim() === '') {
      // If the search value is empty, show all properties
      try {
        const result = await getAllPropertiesQuery();
        if (price) {
          const priceProperties = result.getAllProperties.filter(item => +item.price <= +price);
          setProperties(priceProperties);
        }else{
          setProperties(result.getAllProperties);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let result = await getPropertiesByAddressQuery(value);
        if (price) {
          let priceProperties = result.getAllPropertiesByAddress.filter(item => +item.price <= +price);
          setProperties(priceProperties);
        }else{
          setProperties(result.getPropertiesByAddress);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(price)
    // await onSearch();
    // if(price) {
    //   let propertiesPrice = properties.filter(item => +item.price <= +price)
    //   setProperties(propertiesPrice);
    // }
  }

  return (
    <div>
      <Space direction="horizontal" align="center">
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
            marginLeft: 120,
          }}
        />
        <Select
            showSearch
            placeholder="Type"
            onChange={onChangeType}
            options={[
              {
                value: 'HDB',
                label: 'HDB',
              },
              {
                value: 'Condo',
                label: 'Condo',
              },
              {
                value: '',
                label: 'Any',
              },
            ]}
            style={{ width: 100,marginTop: 30,
              marginLeft: 30,}} 
        />
        <Select
            showSearch
            placeholder="Room"
            onChange={onChangeRoom}
            options={[
              {
                value: '5',
                label: '5',
              },
              {
                value: '4',
                label: '4',
              },
              {
                value: '3',
                label: '3',
              },
              {
                value: '2',
                label: '2',
              },
              {
                value: '1',
                label: '1',
              },
              {
                value: '0',
                label: '0',
              },
              {
                value: '',
                label: 'Any',
              },
            ]}
            style={{ width: 100,marginTop: 30,
              marginLeft: 30}} 
        />
        <InputNumber min={1} max={99999} onChange={(value) => setPrice(value)} placeholder='Set Max Price' 
          style={{ width: 130,marginTop: 30,
            marginLeft: 30,}} 
        />
        <Button
          icon={<SearchOutlined />}
          onClick={() => {
            onChangePrice();
          }}
          style={{ marginTop: 30}} 
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

      <Table columns={column} dataSource={properties} style={{marginTop: '20px', marginLeft:'30px',marginRight:'20px'}}/>
    
    </div>
  );
};

export default PropertySearch;


