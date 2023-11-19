import React from 'react'

// import link
import { Link } from 'react-router-dom'

// import logo
import fakeLogo from './Assets/logoipsum-218.svg'

// import component
import AccountBtn from './AccountBtn'

// import menu ui

const Header = () => {
  return (
    <header className='py-6 mb-12 border-b'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link to='/'>
          <img src={fakeLogo} alt='' />
        </Link>
        <AccountBtn />
      </div>
    </header>
  )
}

export default Header
