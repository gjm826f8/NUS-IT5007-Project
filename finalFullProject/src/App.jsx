import React from "react";

// import auth and routes components
import NavigationBar from "./NavigationBar.jsx";
import { AuthWrapper, RenderRoutes } from "/src/components/";

// import pages

function App() {
  return (
    <div>
      <AuthWrapper>
        <NavigationBar />
        <RenderRoutes />
      </AuthWrapper>
    </div>
  );
}

export default App;
