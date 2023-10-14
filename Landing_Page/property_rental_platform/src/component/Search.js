import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space, Row, Col } from 'antd';
import { Select } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const App = () => (
  <Space direction="vertical">
    <Search
      placeholder="input MRT Station"
      allowClear
      enterButton="Search by MRT"
      size="large"
      onSearch={onSearch}
      style={{
        width: 400,
        marginTop: 30,
        marginRight: 100,
        marginLeft: 30,
      }}
    />
  </Space>
);

const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch1 = (value) => {
    console.log('search:', value);
  };
  
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const App1 = () => (
    <Select
      showSearch
      placeholder="Select Type"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      style={{
        width: 170,
        marginTop: 35,
      }}
      options={[
        {
          value: 'HDB',
          label: 'HDB',
        },
        {
          value: 'Condo',
          label: 'Condo',
        },
      ]}
    />
  );

  const App2 = () => (
    <Select
      showSearch
      placeholder="Select Price Range"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      style={{
        width: 170,
        marginTop: 35,
      }}
      options={[
        {
          value: '0-1000',
          label: '0-1000',
        },
        {
          value: '1000-2000',
          label: '1000-2000',
        },
        {
          value: '2000-3000',
          label: '2000-3000',
        },
      ]}
    />
  );

  const App3 = () => (
    <Select
      showSearch
      placeholder="Select Bedroom"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      style={{
        width: 170,
        marginTop: 35,
      }}
      options={[
        {
          value: 'One Bed',
          label: 'One Bed',
        },
        {
          value: 'Two Bed',
          label: 'Two Bed',
        },
        {
          value: 'Three Bed',
          label: 'Three Bed',
        },
      ]}
    />
  );

const CombinedApp = () => (
 <Row gutter={16}>
    <Col span={9}>
      <App />
    </Col>
    <Col span={3}>
      <App1 />
    </Col>
    <Col span={3}>
      <App2 />
    </Col>
    <Col span={3}>
      <App3 />
    </Col>
  </Row>
  );  
export default CombinedApp;