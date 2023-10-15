import { createContext, useContext, useState } from "react";

// import fake data
import fakeData from "../fakeData";

// create the auth context
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = ({ children }) => {
    // use state to store the user data
    const [userdata, setUser] = useState({email: "", isAuthenticated: false, asTenant: false})

    // check if the user is a tenant
    const tenantCheckUser = (userEmail) => {

        // Make a call to the mongoDB API to check the email
        const allUsers = [...fakeData.tenants];
        const user = allUsers.find(
            (user) => user.email === userEmail
        );
        setUser({...userdata, asTenant: true})
        return user? true : false
    }

    // check if the user is an agent
    const agentCheckUser = (userEmail) => {

        // Make a call to the mongoDB API to check the email
        const allUsers = [...fakeData.agents];
        const user = allUsers.find(
            (user) => user.email === userEmail
        );
        setUser({...userdata, asTenant: false})
        return user? true : false
    }

    // login function for tenant
    const tenantLogin = (userEmail, password) => {

        // Make a call to the mongoDB API to check the email
        return new Promise((resolve, reject) => {
            const allUsers = [...fakeData.tenants];
            const user = allUsers.find(
                (user) => user.email === userEmail && user.password === password
            );
            if (user) {
                setUser({ ...userdata, email: userEmail, isAuthenticated: true })
                resolve("success")
            } else {
                reject("Invalid password");
            }
        })
    }

    // login function for agent
    const agentLogin = (userEmail, password) => {

        // Make a call to the mongoDB API to check the email

        return new Promise((resolve, reject) => {
            const allUsers = [...fakeData.agents];
            const user = allUsers.find(
                (user) => user.email === userEmail && user.password === password
            );
            if (user) {
                setUser({ ...userdata, email: userEmail, isAuthenticated: true })
                resolve("success")
            } else {
                reject("Invalid password");
            }
        })
    }

    // register function for tenant
    const tenantRegister = (userEmail, password) => {

        // Make a call to the mongoDB API to add user
        console.log("Registered successfully");
        setUser({...userdata, email: userEmail, asTenant: true, isAuthenticated: true})
    }

    // logout function
    const logout = () => {
        setUser({ ...userdata, isAuthenticated: false })
    }


    return (
        // pass the user data to the context
        <AuthContext.Provider value={{ userdata, tenantRegister, tenantCheckUser, agentCheckUser, tenantLogin, agentLogin, logout }}>
            {children}
        </AuthContext.Provider>
    )

}