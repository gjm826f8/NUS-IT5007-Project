import React from 'react'

// import link
import { Link } from 'react-router-dom'

// import auth status
import { AuthData } from '../auth/authWrapper'

// import component
import { Dropdown } from './AccountDropdown'

const AccountBtn = () => {
  const { userdata } = AuthData();
  return (
      <div>
        {/* only authenticated users can see the content */}
        {userdata.isAuthenticated&& (
          <Dropdown />
        )}
        {/* otherwise, they can just see login btn */}
        {!userdata.isAuthenticated && (
          <Link
            className='bg-gray-600 text-white font-bold hover:bg-gray-800 transition px-4 py-3 rounded-lg '
            to='/login'>Log In</Link>
        )}
      </div>
  )
}

export default AccountBtn
