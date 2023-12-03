import React from 'react';

const Header = () => {

  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Modern+Antiqua');
        `}
      </style>
      <div style={{ fontFamily: 'Modern Antiqua, cursive', fontSize: '30px', textAlign: 'center' }}>
        <p>Welcome! Let's Find You a Sweet Home</p>
      </div>
    </div>
  );
};

export default Header;
