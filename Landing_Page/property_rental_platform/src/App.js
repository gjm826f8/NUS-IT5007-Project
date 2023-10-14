import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    label: 'Whole Unit',
    key: 'mail',
    style:{
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
    }
  },
  {
    label: 'Rooms',
    key: 'rooms',
    style:{
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
    }
  },
  {
    label: 'Map-Based Search',
    key: 'search',
    style:{
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
    }
  },
  {
    label: 'Post Property',
    key: 'post',
    style:{
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
    }
  },
  {
    label: 'Login',
    key: 'login',
    style:{
      marginTop: 10,
      marginRight: 10,
      marginLeft: 800,
    }
  },
];
const App = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default App;
