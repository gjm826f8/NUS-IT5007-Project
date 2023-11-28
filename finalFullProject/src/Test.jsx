import React, { useState } from "react";
import { Link } from "react-router-dom";

function Test() {
  const [date, setDate] = useState(new Date().toString());
  return (
    <div>
      <div className="text-center">----------Test Field----------</div>
      <label>{date}</label>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
        onClick={() => {
          setDate(new Date().toString());
        }}
      >
        Click me
      </button>
      <br />
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
      <div className="text-center">----------End Test Field----------</div>
    </div>
  );
}

export default Test;
