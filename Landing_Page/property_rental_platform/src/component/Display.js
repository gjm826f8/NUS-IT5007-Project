import React from 'react';
import { Image } from 'antd';
import { Row, Col } from 'antd';
import { Descriptions } from 'antd';

const Pics1 = () => (
  <Image
    width={200}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    style={{
        width: 350,
        marginTop: 100,
        marginRight: 100,
        marginLeft: 30
      }}
  />
);
const Pics2 = () => (
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      style={{
        width: 350,
        marginTop: 100,
        marginRight: 200,
        marginLeft: 130
      }}
    />
);
const Pics3 = () => (
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      style={{
        width: 350,
        marginTop: 100,
        marginRight: 300,
        marginLeft: 230
      }}
    />
);

const items1 = [
  {
    key: '1',
    label: 'Publisher',
    children: 'Ms Zhou',
  },
  {
    key: '2',
    label: 'Tele',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Price',
    children: '4000 SGD',
  },
  {
    key: '4',
    label: 'Remark',
    children: 'empty',
  },
  {
    key: '5',
    label: 'Address',
    children: 'Singapore 13772',
  },
];

const items2 = [
    {
      key: '1',
      label: 'Publisher',
      children: 'Ms Zhou',
    },
    {
      key: '2',
      label: 'Tele',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Price',
      children: '4000 SGD',
    },
    {
      key: '4',
      label: 'Remark',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Address',
      children: 'Singapore 13772',
    },
  ];

 const items3 = [
    {
      key: '1',
      label: 'Publisher',
      children: 'Ms Zhou',
    },
    {
      key: '2',
      label: 'Tele',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Price',
      children: '4000 SGD',
    },
    {
      key: '4',
      label: 'Remark',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Address',
      children: 'Singapore 13772',
    },
  ];

const Des1= () => 
<Descriptions 
    title="Climenti Ave 2, 3-Bedroom HDB" 
    items={items1} 
    style={{
        width: 420,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20
      }}
    />;

const Des2= () => 
<Descriptions 
    title="Climenti Ave 2, 3-Bedroom HDB" 
    items={items2} 
    style={{
        width: 420,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 120
      }}
    />;


const Des3= () => 
<Descriptions 
    title="Climenti Ave 2, 3-Bedroom HDB" 
    items={items2} 
    style={{
        width: 420,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 220
        }}
    />;

const CombinedApp = () => (
    <Row gutter={16}>
       <Col span={6}>
         <Pics1 />
         <Des1 />
       </Col>
       <Col span={6}>
         <Pics2 />
         <Des2 />
       </Col>
       <Col span={6}>
         <Pics3 />
         <Des3 />
       </Col>
     </Row>
     );  
export default CombinedApp;

