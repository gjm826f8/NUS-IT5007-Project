import React from "react";
import { Link, useNavigate } from "react-router-dom";

// import auth
import { AuthData } from "./AuthWrapper.jsx";

// import menu ui
import { Menu } from "@headlessui/react";

// import custom css
import "./styles/style.css";

const Dropdown = () => {
  const { auth, setAuth } = AuthData();

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      email: "",
      isAuthenticated: false,
      asTenant: false,
      userData: {},
    });
    navigate("/");
  };

  return (
    <Menu as="div" className="w-full max-w-[220px] cursor-pointer relative">
      <Menu.Button
        as="div"
        className="bg-gray-600 text-white font-bold hover:bg-gray-800 px-4 py-3 rounded-lg text-center"
      >
        {auth.userData.name}
      </Menu.Button>
      <Menu.Items className="px-2 py-2 text-[15px] space-y-2 shadow-md bg-white absolute w-full z-10 list-none rounded-b-lg">
        <div className="py-1 flex flex-col gap-2">
          {auth.asTenant ? (
            <div>
              <Menu.Item
                onClick={() => {
                  navigate("/favorites");
                }}
                as="li"
                className="dropdownItem"
              >
                My Favorites
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  navigate("/history");
                }}
                as="li"
                className="dropdownItem"
              >
                History
              </Menu.Item>
            </div>
          ) : (
            <div>
              <Menu.Item
                onClick={() => {
                  navigate("/addproperty");
                }}
                as="li"
                className="dropdownItem"
              >
                Add Property
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  navigate("/myposts");
                }}
                as="li"
                className="dropdownItem"
              >
                My Posts
              </Menu.Item>
            </div>
          )}
          <hr className="border-gray-400" />
          <Menu.Item onClick={() => {navigate("/profile")}} as="li" className="dropdownItem">
            My Profile
          </Menu.Item>
          <Menu.Item onClick={handleLogout} as="li" className="dropdownItem">
            Logout
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

function NavUserService() {
  const { auth } = AuthData();
  return (
    <div>
      {auth.isAuthenticated ? (
        <Dropdown />
      ) : (
        <div className="w-full max-w-[220px] cursor-pointer relative">
          <div className="bg-gray-600 text-white font-bold hover:bg-gray-800 px-4 py-3 rounded-lg text-center">
            <Link to="/login">Log in / Sign up</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavUserService;
