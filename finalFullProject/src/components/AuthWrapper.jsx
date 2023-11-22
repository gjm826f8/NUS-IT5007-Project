import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
    const [auth, setAuth] = useState(
        {
            email: "",
            isAuthenticated: false,
            asTenant: false,
            userData: {},
        }
    );

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};