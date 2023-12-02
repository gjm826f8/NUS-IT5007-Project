import React from "react";

// import auth and routes components
import NavigationBar from "./NavigationBar.jsx";
import { AuthWrapper, RenderRoutes } from "/src/components/";

// import pages

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <AuthWrapper>
        <NavigationBar />
        <RenderRoutes />
      </AuthWrapper>
    </div>
  );
}

export default App;
