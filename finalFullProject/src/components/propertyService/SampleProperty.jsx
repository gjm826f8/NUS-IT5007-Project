import React from 'react';
import { Image } from 'antd';
import { Row, Col } from 'antd';
import { Descriptions } from 'antd';

const Pics1 = () => (
  <Image
    width={300}
    src="images/property01.jpeg"
    style={{
        width: 400,
        marginTop: 30,
        marginRight: 50,
        marginLeft: 30
      }}
  />
);
const Pics2 = () => (
    <Image
      width={300}
      src="images/property02.jpeg"
      style={{
        width: 400,
        marginTop: 30,
        marginRight: 100,
        marginLeft: 130
      }}
    />
);
const Pics3 = () => (
    <Image
      width={300}
      src="images/property03.jpeg"
      style={{
        width: 400,
        marginTop: 30,
        marginRight: 150,
        marginLeft: 230
      }}
    />
);

const items1 = [
  {
    key: '1',
    label: 'Agent',
    children: 'Ms Zhou',
  },
  {
    key: '2',
    label: 'Price',
    children: '4000 SGD',
  },
  {
    key: '3',
    label: 'Remark',
    children: 'For family',
  },
  {
    key: '4',
    label: 'Address',
    children: 'Singapore 13772',
  },
];

const items2 = [
    {
      key: '1',
      label: 'Agent',
      children: 'Mr Steven',
    },
    {
      key: '2',
      label: 'Price',
      children: '3500 SGD',
    },
    {
      key: '3',
      label: 'Remark',
      children: 'For students',
    },
    {
      key: '4',
      label: 'Address',
      children: 'Singapore 13772',
    },
  ];

 const items3 = [
    {
      key: '1',
      label: 'Agent',
      children: 'Ms Lily',
    },
    {
      key: '2',
      label: 'Price',
      children: '4200 SGD',
    },
    {
      key: '3',
      label: 'Remark',
      children: 'For working professionals',
    },
    {
      key: '4',
      label: 'Address',
      children: 'Singapore 13772',
    },
  ];

const Des1= () => 
<Descriptions 
    title="Climenti Ave, 3-Bedroom HDB" 
    column={{ xs: 1, sm: 1, md: 1, lg: 1 }}
    items={items1} 
    style={{
        width: 400,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 30
      }}
      labelStyle={{ textAlign: 'left' }}
      contentStyle={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}
    />;

const Des2= () => 
<Descriptions 
    title="Nanyang Ave, 2-Bedroom HDB" 
    column={{ xs: 1, sm: 1, md: 1, lg: 1 }}
    items={items2} 
    style={{
        width: 400,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 130
      }}
      labelStyle={{ textAlign: 'left' }}
      contentStyle={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}
    />;


const Des3= () => 
<Descriptions 
    title="Stirling Ave, 2-Bedroom Conco" 
    column={{ xs: 1, sm: 1, md: 1, lg: 1 }}
    items={items3} 
    style={{
        width: 400,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 230
        }}
        labelStyle={{ textAlign: 'left' }}
        contentStyle={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}
    />;

const SampleProperty = () => (
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
export default SampleProperty;