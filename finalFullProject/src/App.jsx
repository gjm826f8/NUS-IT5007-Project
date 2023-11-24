import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";

import Test from "./Test.jsx";
// import auth
import { AuthWrapper, RenderRoutes } from "/src/components/";

// import pages

function App() {
  return (
    <div>
      <Test />
      <AuthWrapper>
        <RenderRoutes />
      </AuthWrapper>
    </div>
  );
}

export default App;
