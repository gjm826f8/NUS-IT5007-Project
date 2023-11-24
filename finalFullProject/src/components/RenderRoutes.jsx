import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthData } from "./AuthWrapper.jsx";
import { AddProperty, Favorites, History, LandingPage, Login, MyPosts } from "/src/pages/";

function RenderRoutes() {
    const { auth } = AuthData();
  return (
    <div>
        {
            !auth.isAuthenticated && (
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            )
        }
        {
            auth.isAuthenticated && auth.asTenant && (
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/history" element={<History />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            )
        }
        {
            auth.isAuthenticated && !auth.asTenant && (
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/addproperty" element={<AddProperty />} />
                    <Route path="/myposts" element={<MyPosts />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            )
        }
    </div>
  )
}

export default RenderRoutes
