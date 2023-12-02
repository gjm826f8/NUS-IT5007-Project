import React from "react";
import { Link } from "react-router-dom";
import { NavUserService } from '/src/components';

function NavigationBar() {
  return (
    <div className="bg-gray-50 flex justify-between items-center px-10 py-5 border-b-2 border-gray-100">
      <div>
        <Link to="/" className="underline">Home</Link>
        <label> | </label>
        <Link to="/properties">Properties</Link>
        <label> | </label>
        <Link to="/map">Map Based Search</Link>
      </div>
      <NavUserService />
    </div>
  );
}

export default NavigationBar;
