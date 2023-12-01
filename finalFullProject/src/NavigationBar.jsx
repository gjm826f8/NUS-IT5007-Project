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
      </div>
      <NavUserService />
    </div>
  );
}

export default NavigationBar;
