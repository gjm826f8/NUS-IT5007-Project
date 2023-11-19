import React, { Fragment } from 'react';

// import nevigate
import { useNavigate } from "react-router-dom";

// import auth status
import { AuthData } from '../auth/authWrapper';

// import menu ui
import { Menu, Transition } from '@headlessui/react';

// import stylesheet
import './AccountDropdown.css';

export const Dropdown = () => {
  // get the user data from the auth context
  const { userdata, logout } = AuthData();
  // get the navigate function
  const navigate = useNavigate();

  // logout function
  const doLogout = async() => {
    await logout();
    navigate('/');
  }

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button
        as='div'
        className='bg-gray-600 text-white font-bold hover:bg-gray-800 transition px-4 py-3 rounded-lg text-center'>
        {userdata.email}
      </Menu.Button>
      {/* From @headlessui demo */}
      <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
      >
        {/* dropdown menu */}
        {userdata.asTenant ? (<Menu.Items className='dropdownMenu'>
          <div className="py-1 flex flex-col gap-2">
            <Menu.Item onClick={() => {navigate('/favorites')}} as='li' className='dropdownItem'>
              My Favorites
            </Menu.Item>
            <Menu.Item onClick={() => {navigate('/history')}} as='li' className='dropdownItem'>
              History
            </Menu.Item>
          </div>
          <hr />
          <Menu.Item onClick={doLogout} as='li' className='dropdownItem'>
            Log Out
          </Menu.Item>
        </Menu.Items>):(
          <Menu.Items className='dropdownMenu'>
          <div className="py-1 flex flex-col gap-2">
            <Menu.Item onClick={() => {navigate('/allposts')}} as='li' className='dropdownItem'>
              View All Posts
            </Menu.Item>
            <Menu.Item onClick={() => {navigate('/new')}} as='li' className='dropdownItem'>
              Post New
            </Menu.Item>
          </div>
          <hr />
          <Menu.Item onClick={doLogout} as='li' className='dropdownItem'>
            Log Out
          </Menu.Item>
        </Menu.Items>
        )}
      </Transition>
    </Menu>
  )
}
