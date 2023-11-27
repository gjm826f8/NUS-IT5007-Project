import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthData } from "./AuthWrapper.jsx";
import { addTenantMutation, getTenantQuery } from "./FetchCmd.js";

function TenantLogin() {
  const [mode, setMode] = useState("email"); // email, password, signup

  const initValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [checkEmail, setCheckEmail] = useState(false); // flag to check if user pressed continue button
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkRegister, setCheckRegister] = useState(false); // flag to check if user pressed register button
  const [password, setPassword] = useState(""); // password logged in the backend
  const [passwordMatch, setPasswordMatch] = useState(false); // flag to check if password matches confirmPassword

  const { auth, setAuth } = AuthData();

  const navigate = useNavigate();

  // handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
    } else if (loginMode === "signup") {
      // username, required, at least 4 characters, at most 10 characters
      if (!values.username) {
        errors.username = "Please enter your username";
      } else if (values.username.length < 4) {
        errors.username = "Username must be at least 4 characters";
      } else if (values.username.length > 10) {
        errors.username = "Username must be at most 10 characters";
      }
      // password, required, min 4 characters, max 20 characters
      if (!values.password) {
        errors.password = "Please enter your password";
      } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters";
      } else if (values.password.length > 20) {
        errors.password = "Password must be at most 20 characters";
      }
      // password confirmation, required, must match password
      if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
    return errors;
  };

  // handle submit of email input form
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setErrors(validate(formValues, mode));
    setCheckEmail(true);
  };

  // if no error in email input form, proceed to graphql query to check if user exists
  useEffect(() => {
    if (!errors.hasOwnProperty("email") && checkEmail) {
      handleGetTenant();
      setCheckEmail(false);
    }
  }, [errors]);

  const handleGetTenant = async () => {
    // define the variables required for the query
    const variables = {
      email: formValues.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await getTenantQuery(variables);
      if (result.getTenant) {
        setMode("password");
        setAuth({
          ...auth,
          id: result.getTenant.id,
          name: result.getTenant.name,
          email: formValues.email,
          asTenant: true,
        });
        setPassword(result.getTenant.password);
      } else {
        setMode("signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit of password input form
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setErrors(validate(formValues, mode));
    setCheckPassword(true);
  };

  // if no error in password input form, proceed to match if password is correct
  useEffect(() => {
    if (!errors.hasOwnProperty("password") && checkPassword) {
      // match formValues.password with password
      if (formValues.password === password) {
        setAuth({ ...auth, isAuthenticated: true });
        console.log("password correct");
        setPasswordMatch(true);
      } else {
        setErrors({ password: "Incorrect password" });
      }
    }
  }, [errors]);

  // handle submit of register input form
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setErrors(validate(formValues, mode));
    setCheckRegister(true);
  };

  // if no error in registration input form, proceed to graphql query to add new tenant
  useEffect(() => {
    if (
      !errors.hasOwnProperty("password") &&
      !errors.hasOwnProperty("confirmPassword") &&
      !errors.hasOwnProperty("username") &&
      checkRegister
    ) {
      handleAddTenant();
      console.log("add tenant");
      setCheckRegister(false);
      setFormValues(initValues);
      navigate("/");
    }
  }, [errors]);

  const handleAddTenant = async () => {
    // define the variables required for the query
    const variables = {
      name: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    // send the request to the GraphQL API
    try {
      const result = await addTenantMutation(variables);
      if (result) {
        setAuth({
          ...auth,
          id: result.addTenant.id,
          name: result.addTenant.name,
          email: formValues.email,
          isAuthenticated: true,
          asTenant: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCheckPassword(false);
    if (passwordMatch) {
      setFormValues(initValues);
      navigate("/");
    }
  }, [passwordMatch]);

  return (
    <div>
      {mode === "email" && (
        <div className="loginContainer">
          <div className="loginHeader">Welcome</div>
          <div className="loginExplanation">
            Log in or sign up as a{" "}
            <span className="font-sans font-semibold">Tenant</span> to get full
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
              onClick={() => {
                setMode("email");
                setAuth({
                  ...auth,
                  id: "",
                  name: "",
                  email: "",
                  isAuthenticated: false,
                  asTenant: false,
                });
              }}
            />
            <div className="loginHeader">Log In</div>
            <MdArrowBack className="invisible" />
          </div>
          <div className="loginExplanation">
            Hello{" "}
            <span className="font-sans font-semibold">{formValues.email}</span>,
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
      {mode === "signup" && (
        <div className="loginContainer">
          <div className="flex items-center justify-between">
            <MdArrowBack
              className="float-left"
              onClick={() => setMode("email")}
            />
            <div className="loginHeader">Sign Up</div>
            <MdArrowBack className="invisible" />
          </div>
          <div className="loginExplanation">
            Looks like you don't have an account with that email address, sign
            up to get full access to our service.
          </div>
          <form onSubmit={handleSubmitRegister} className="loginForm">
            <input
              className="inputBox"
              type="text"
              name="username"
              placeholder="Please create your username"
              value={formValues.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="errorMessage">{errors.username}</div>
            )}
            <input
              className="inputBox"
              type="password"
              name="password"
              placeholder="Please create your password"
              value={formValues.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="errorMessage">{errors.password}</div>
            )}
            <input
              className="inputBox"
              type="password"
              name="confirmPassword"
              placeholder="Please enter your password again"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="errorMessage">{errors.confirmPassword}</div>
            )}
            <button
              className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
              type="submit"
            >
              Register and Log In
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TenantLogin;
