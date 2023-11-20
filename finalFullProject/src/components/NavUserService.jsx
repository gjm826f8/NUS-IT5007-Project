import React from 'react'
import { Link } from 'react-router-dom'

const AccountButton = () => {
    return (
        <Link to='/login'>Log In</Link>
    )
}

function NavUserService() {
  return (
    <div>
      <div className="text-3xl font-bold underline">User Service Nav</div>
      <AccountButton />
    </div>
  )
}

export default NavUserService
