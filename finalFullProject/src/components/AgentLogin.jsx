import React, { useEffect, useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthData } from './AuthWrapper.jsx';
import graphQLFetch from '/src/graphql_cmd.js';

function AgentLogin() {
    const [mode, setMode] = useState("email"); // email, password

    const initValues = {
      email: "",
      password: "",
    };
    const [formValues, setFormValues] = useState(initValues);
    const [errors, setErrors] = useState({});
    const [checkEmail, setCheckEmail] = useState(false); // flag to check if user pressed continue button
    const [checkPassword, setCheckPassword] = useState(false);
  
    const { auth, setAuth } = AuthData();
  
    const navigate = useNavigate();
  
    // handle change in input fields
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    // handle submit of email input form
    const handleSubmitEmail = async (e) => {
      e.preventDefault();
      setErrors(validate(formValues, mode));
      setCheckEmail(true);
    };
  
    // handle submit of password input form
    const handleSubmitPassword = async (e) => {
      e.preventDefault();
      setErrors(validate(formValues, mode));
      setCheckPassword(true);
    };
  
    // validation of input fields
    const validate = (values, loginMode) => {
      const errors = {};
      if (loginMode === "email") {
        // email, required, valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
          errors.email = "Please enter your email address";
        } else if (!emailRegex.test(values.email)) {
          errors.email = "Please enter a valid email address";
        }
      } else if (loginMode === "password") {
        // password, required
        if (!values.password) {
          errors.password = "Please enter your password";
        }
      }
      return errors;
    };
  
    // if no error in email input form, proceed to graphql query to check if user exists
    useEffect(() => {
      if (!errors.hasOwnProperty("email") && checkEmail) {
        handleGetAgent();
        setCheckEmail(false);
      }
    }, [errors]);
  
    // if no error in password input form, proceed to match if password is correct
    useEffect(() => {
      if (!errors.hasOwnProperty("password") && checkPassword) {
        // match formValues.password with auth.userData.password
        if (formValues.password === auth.userData.password) {
          setAuth({ ...auth, isAuthenticated: true });
          console.log("password correct");
        } else {
          setErrors({ password: "Incorrect password" });
        }
        setCheckPassword(false);
        setFormValues(initValues);
        navigate("/");
      }
    }, [errors]);
  
    const handleGetAgent = async () => {
      // define the GraphQL query to check if agent exists
      const getAgentQuery = `
        query GetAgentQuery($email: String!) {
          getAgent(email: $email) {
            name
            email
            password
            properties
          }
        }
      `;
      // define the variables required for the query
      const variables = {
        email: formValues.email,
      };
      // send the request to the GraphQL API
      try {
        const result = await graphQLFetch(getAgentQuery, variables);
        if (result.getAgent) {
          setMode("password");
          setAuth({
            ...auth,
            email: formValues.email,
            asTenant: false,
            userData: result.getAgent,
          });
        } else {
          setErrors({
            email:
              "Agent does not exist. If you want to register as new agent, please contact our staff for help.",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    // test
    useEffect(() => {
      console.log(auth);
    }, [auth]);
  
    return (
      <div>
        {mode === "email" && (
          <div className="loginContainer">
            <div className="loginHeader">Welcome</div>
            <div className="loginExplanation">
              Log in or sign up as an
              <span className="font-sans font-semibold"> Agent</span> to get full
              access to our service.
            </div>
            <form onSubmit={handleSubmitEmail} className="loginForm">
              <input
                className="inputBox"
                type="text"
                name="email"
                placeholder="Please enter your email address"
                value={formValues.email}
                onChange={handleChange}
              />
              {errors.email && <div className="errorMessage">{errors.email}</div>}
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
                type="submit"
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {mode === "password" && (
          <div className="loginContainer">
            <div className="flex items-center justify-between">
              <MdArrowBack
                className="float-left"
                onClick={() => setMode("email")}
              />
              <div className="loginHeader">Log In</div>
              <MdArrowBack className="invisible" />
            </div>
            <div className="loginExplanation">
              Hello
              <span className="font-sans font-semibold"> {formValues.email}</span>,
              please input your password to log in.
            </div>
            <form onSubmit={handleSubmitPassword} className="loginForm">
              <input
                className="inputBox"
                type="password"
                name="password"
                placeholder="Please enter your password"
                value={formValues.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="errorMessage">{errors.password}</div>
              )}
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
                type="submit"
              >
                Log In
              </button>
            </form>
          </div>
        )}
      </div>
    );
}

export default AgentLogin
