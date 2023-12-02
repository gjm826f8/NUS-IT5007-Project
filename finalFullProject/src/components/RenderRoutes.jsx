// Purpose: Renders the routes based on the user's authentication status and role. 
// To protect routes from unauthenticated users.

import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthData } from "./AuthWrapper.jsx";
import { AddProperty, Favorites, History, LandingPage, Login, MyPosts, Properties, ShowProfile } from "/src/pages/";
import MapBaseSearch from '/src/pages/MapBaseSearch.jsx';

function RenderRoutes() {
    const { auth } = AuthData();
  return (
    <div>
        {
            !auth.isAuthenticated && (
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/map" element={<MapBaseSearch />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            )
        }
        {
            auth.isAuthenticated && auth.asTenant && (
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path='/profile' element={<ShowProfile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/map" element={<MapBaseSearch />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            )
        }
        {
            auth.isAuthenticated && !auth.asTenant && (
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />2
                    <Route path="/properties" element={<Properties />} />
                    <Route path='/profile' element={<ShowProfile />} />
                    <Route path="/addproperty" element={<AddProperty />} />
                    <Route path="/myposts" element={<MyPosts />} />
                    <Route path="/map" element={<MapBaseSearch />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            )
        }
    </div>
  )
}

export default RenderRoutes
