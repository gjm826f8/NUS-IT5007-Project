import React, { useState } from "react";
import { useForm } from "react-hook-form";

// import '<' icon
import { MdArrowBackIosNew } from "react-icons/md";

// import nevigate
import { useNavigate } from "react-router-dom";

// import context
import { AuthData } from "../auth/authWrapper";

// import stylesheet
import "./Login.css";

const Login = () => {
  // use react hook form to validate the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // use state to store the form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [mode, setMode] = useState("tenantWelcome"); // 5 modes
                                      // tenantWelcome, agentWelcome, tenantLogin, agentLogin, register

  // get the functions from the auth context
  const { tenantRegister, tenantLogin, agentLogin, tenantCheckUser, agentCheckUser } = AuthData();

  // get the navigate function
  const navigate = useNavigate();

  // define the input change functions
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmInput = (event) => {
    setPasswordConfirm(event.target.value);
  };

  // define the functions under each mode
  const verifyTenant = async() => {
    const user = tenantCheckUser(email)
    setMode(user ? "tenantLogin" : "register");
  };

  const verifyAgent = () => {
    const user = agentCheckUser(email);
    if (user) {
      setMode("agentLogin")
    } else {
      alert("Agent not registered, please contact our staff for registration.")
    }
  };

  const handleTenantLogin = async() => {
    try {
      await tenantLogin(email, password)
      navigate("/")
      } catch (error) {
        alert(error)
      }
  };

  const handleAgentLogin = async() => {
    try {
      await agentLogin(email, password)
      navigate("/")
    } catch (error) {
      alert(error)
    }
  };

  const handleRegister = () => {
    tenantRegister(email, password);
    navigate("/");
  };

  // define the submit function
  const onSubmit = () => {
    if (mode === "tenantWelcome") {
      verifyTenant();
    } else if (mode === 'agentWelcome') {
      verifyAgent();
    } else if (mode === "tenantLogin") {
      handleTenantLogin();
    } else if (mode === "agentLogin") {
      handleAgentLogin()
    } else if (mode === "register") {
      handleRegister();
    }
  };

  // define the step back function
  const stepBackToEmail = () => {
    setMode("tenantWelcome");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      {/* under tenant welcome mode */}
      {mode === "tenantWelcome" && (
        <div className="loginContainer">
          <h1 className="loginHeader">Welcome</h1>
          <p className="loginExplanation">
            Log in or sign up to get the most out of your XXX experience.
          </p>
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="inputBox"
              placeholder="Email Address"
              type="email"
              {...register("email", {
                onChange: handleEmailInput,
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            <p className="errorMessage">{errors.email?.message}</p>
            <button className="btn" type="submit">Continue</button>
          </form>
          <p className="clickableContent" onClick={() => {setMode("agentWelcome")}}>Log In as an Agent</p>
        </div>
      )}

      {/* under agent welcome mode */}
      {mode === "agentWelcome" && (
        <div className="loginContainer">
          <h1 className="loginHeader">Welcome</h1>
          <p className="loginExplanation">
            Log in or sign up to get the most out of your XXX experience.
          </p>
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="inputBox"
              placeholder="Email Address"
              type="email"
              {...register("email", {
                onChange: handleEmailInput,
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            <p className="errorMessage">{errors.email?.message}</p>
            <button className="btn" type="submit">Continue</button>
          </form>
          <p className="clickableContent" onClick={() => {setMode("tenantWelcome")}}>Log In as a Tenant</p>
        </div>
      )}

      {/* under both login modes */}
      {(mode === "tenantLogin" || mode === "agentLogin") && (
        <div className="loginContainer">
          <div className="flex items-center justify-between">
            {/* back to the email input stage function */}
            <MdArrowBackIosNew className="float-left" onClick={stepBackToEmail}/>
            <h1 className="loginHeader">Log In</h1>
            <MdArrowBackIosNew className="float-left invisible" />
          </div>
          <p className="loginExplanation">
            Hello <span className="font-sans font-semibold">{email}</span>, please input your password to log in.
          </p>
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)} >
            <input
              className="inputBox"
              placeholder="Password"
              type="password"
              {...register("password", {
                onChange: handlePasswordInput,
                required: "Password is required",
              })}
            />
            <p className="errorMessage">{errors.password?.message}</p>
            <button className="btn" type="submit">Log In</button>
          </form>
        </div>
      )}

      {/* under register mode */}
      {mode === "register" && (
        <div className="loginContainer">
          <div className="flex items-center justify-between">
            {/* back to the email input stage function */}
            <MdArrowBackIosNew className="float-left" onClick={stepBackToEmail}/>
            <h1 className="loginHeader">Set Your Password</h1>
            <MdArrowBackIosNew className="float-left invisible" />
          </div>
          <p className="loginExplanation">
            Looks like you don't have an account with that email address, sign up to get full access to our service.
          </p>
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="inputBox"
              placeholder="Create Your Password"
              type="password"
              {...register("password", {
                onChange: handlePasswordInput,
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be more than 4 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Password cannot exceed 10 characters"
                }
              })}
            />
            <p className="errorMessage">{errors.password?.message}</p>
            <input
              className="inputBox"
              placeholder="Confirm Your Password"
              type="password"
              {...register("passwordConfirm", {
                onChange: handlePasswordConfirmInput,
                required: "Password confirmation is required",
                minLength: {
                  value: 4,
                  message: "Password must be more than 4 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Password cannot exceed 10 characters"
                },
                validate: (val) => {
                  if (password !== val) {
                    return "Your passwords do no match";
                  }
                }
              })}
            />
            <p className="errorMessage">{errors.passwordConfirm?.message}</p>
            <button className="btn" type="submit">Register and Log In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
