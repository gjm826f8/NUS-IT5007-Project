import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
    const [auth, setAuth] = useState(
        {
            email: "andrewjordan@example.org",
            isAuthenticated: true,
            asTenant: false,
            userData: {
                id: 1, // Unique ID for the user
                name: "Andrew Jordan",
                email: "andrewjordan@example.org",
                password: "andrew",
                properties: [1, 6]
            },
        }
    );

    // const [auth, setAuth] = useState(
    //     {
    //         email: "",
    //         isAuthenticated: false,
    //         asTenant: false,
    //         userData: {},
    //     }
    // );

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};