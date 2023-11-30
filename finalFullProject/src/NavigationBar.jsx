import React from "react";
import { Link } from "react-router-dom";
import { NavUserService } from '/src/components';

function NavigationBar() {
  return (
    <div className="flex justify-between items-center px-10 py-5 ">
      <div>
        <Link to="/" className="underline">Home</Link>
        <label> | </label>
        <Link to="/properties">Properties</Link>
        <label> | </label>
        <Link to="/login">Login</Link>
        <label> | </label>
        <Link to="/myposts">My Posts</Link>
        <label> | </label>
        <Link to="/addproperty">Add Property</Link>
        <label> | </label>
        <Link to="/favorites">Favorites</Link>
        <label> | </label>
        <Link to="/history">History</Link>
        <label> | </label>
        <Link to="/profile">Profile</Link>
      </div>
      <NavUserService />
    </div>
  );
}

export default NavigationBar;
