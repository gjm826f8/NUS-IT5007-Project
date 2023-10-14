import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from '../Components/Search.js';
import Display from '../Components/Display.js'
import Navi from '../Components/Navi.js'

const landing_page = () => {
    return (  
        <div>
            <Navi />
            <Search />
            <Display />
        </div>
    )
}

export default landing_page