import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Test from "./Test.jsx";
// import auth
import { AuthWrapper } from "/src/components/";

// import pages
import {
  LandingPage,
  Login,
  AddProperty,
  MyPosts,
  Favorites,
  History,
} from "/src/pages/";

function App() {
  return (
    <div>
      <Test />
      <AuthWrapper>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthWrapper>
    </div>
  );
}

export default App;
