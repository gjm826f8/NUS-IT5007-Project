import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountBtn from './AccountBtn';

const items = [
  {
    label: 'Whole Unit',
    key: 'whole unit',
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
  // {
  //   label: 'Login',
  //   key: 'login',
  //   style:{
  //     marginTop: 10,
  //     marginRight: 10,
  //     marginLeft: 800,
  //   }
  // },
];
const Navi = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('whole unit');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);

    // 根据 e.key 或其他条件来决定导航到不同的路由
    switch (e.key) {
      case 'whole unit':
        navigate('/');
        break;
      case 'rooms':
        navigate('/');
        break;
      case 'search':
        navigate('/');
        break;
      case 'post':
        navigate('/');
        break;
      // case 'login':
      //   navigate('/login');
      //   break;
      default:
        break;
    }
  };

  return (
    <div className='py-6 mb-12'>
      <div className='container mx-auto flex items-center justify-between'>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}>
          {items.map((item) => (
            <Menu.Item key={item.key} style={item.style}>
              <Link to={`/${item.key}`}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <AccountBtn />
      </div>
    </div>
  );
};

export default Navi;

// const Navi = () => {
//   const [current, setCurrent] = useState('mail');
//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };
//   return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
// };
// export default Navi;