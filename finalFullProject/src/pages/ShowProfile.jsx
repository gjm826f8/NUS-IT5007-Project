import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthData } from "/src/components/";
import graphQLFetch from "/src/graphql_cmd.js";

function ShowProfile() {
  const initData = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const { auth, setAuth } = AuthData();
  const [readOnly, setReadOnly] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formValues, setFormValues] = useState(initData);
  const [errors, setErrors] = useState({});
  const [checkUpdate, setCheckUpdate] = useState(false);

  // fetch user data on load
  useEffect(() => {
    console.log(auth)
    handleGetUser();
    // setFormValues({ ...initData, ...fakeData });
  }, []);

  const handleGetUser = async () => {
    if (auth.asTenant) {
        handleGetTenant();
    } else {
        handleGetAgent();
    }
  }

  const handleGetTenant = async () => {
    // define the GraphQL query to check if tenant exists
    const getTenantQuery = `
        query GetTenantQuery($email: String!) {
          getTenant(email: $email) {
            name
            email
            password
          }
        }
      `;
    // define the variables required for the query
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await graphQLFetch(getTenantQuery, variables);
      if (result.getTenant) {
        console.log(result.getTenant);
        setFormValues({...formValues, name: result.getTenant.name, email: result.getTenant.email, password: result.getTenant.password, passwordConfirm: ''})
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(formValues));
    setCheckUpdate(true);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name required";
    } else if (values.name.length < 4) {
        errors.name = "Name needs to be 4 characters or more";
    } else if (values.name.length > 20) {
        errors.name = "Name needs to be 20 characters or less";
    }
    if (!values.email) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password needs to be 4 characters or more";
    } else if (values.password.length > 20) {
      errors.password = "Password needs to be 20 characters or less";
    }
    if (!values.passwordConfirm) {
      errors.passwordConfirm = "Password is required";
    } else if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = "Passwords do not match";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleGetAgent = async () => {
    // define the GraphQL query to check if agent exists
    const getAgentQuery = `
      query GetAgentQuery($email: String!) {
        getAgent(email: $email) {
          name
          email
          password
        }
      }
    `;
    // define the variables required for the query
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await graphQLFetch(getAgentQuery, variables);
      if (result.getAgent) {
        console.log('getagent result', result.getAgent);
        setFormValues( {...formValues, name: result.getAgent.name, email: result.getAgent.email, password: result.getAgent.password, passwordConfirm: ''});
      }
    } catch (error) {
      console.log(error);
    }
  };

//   // test
//   useEffect(() => {
//     console.log(formValues);
//   }, [formValues]);

  // if no error and checkUpdate is true, then update the user
    useEffect(() => {
        if (Object.keys(errors).length === 0 && checkUpdate) {
            if (auth.asTenant) {
                handleUpdateTenant();
            } else {
                handleUpdateAgent();
            }
        }
    }, [errors]);

    const handleUpdateTenant = async () => {
        // define the GraphQL query to update tenant
        const updateTenantMutation = `
            mutation UpdateTenantMutation(
                $id: ID!
                $name: String
                $email: String
                $password: String
                $favorites: [ID]
                $history: [ID]
            ) {
                updateTenant(
                id: $id
                name: $name
                email: $email
                password: $password
                favorites: $favorites
                history: $history
                ) {
                id
                }
            }
        `
        // define the variables required for the query
        const variables = {
            id: auth.userData.id,
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
        }
        // send the request to the GraphQL API
        try {
            const result = await graphQLFetch(updateTenantMutation, variables);
            if (result) {
                console.log("tenant updated");
                setReadOnly(true);
                setAuth({...auth, email: formValues.email, userData: {...auth.userData, name: formValues.name, password: formValues.password, email: formValues.email}})
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateAgent = async () => {
        // define the GraphQL query to update agent
        const updateAgentQuery = `
          mutation UpdateAgentMutation(
            $id: ID!
            $name: String
            $email: String
            $password: String
            $properties: [ID]
          ) {
            updateAgent(
              id: $id
              name: $name
              email: $email
              password: $password
              properties: $properties
            ) {
              id
            }
          }
        `
        // define the variables required for the query
        const variables = {
          id: auth.userData.id,
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
        }
        // send the request to the GraphQL API
        try {
          const result = await graphQLFetch(updateAgentQuery, variables);
          if (result) {
            console.log("agent updated");
            setReadOnly(true);
            setAuth({...auth, email: formValues.email, userData: {...auth.userData, name: formValues.name, password: formValues.password, email: formValues.email}})
          }
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center gap-2">
      <div className="loginContainer">
        <div className="loginHeader">Profile</div>
        <form onSubmit={handleSubmit} className="loginForm">
          <label className="text-left">Name</label>
          <input
            className="inputBox"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            readOnly={readOnly}
          />
          {errors.name && <div className="errorMessage">{errors.name}</div>}
          <label className="text-left">Email</label>
          <input
            className="inputBox"
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            readOnly={readOnly}
          />
            {errors.email && <div className="errorMessage">{errors.email}</div>}
          <label className="text-left">Password</label>
          {/* add show password configure */}
          <div className="flex justify-between items-center">
            <input
              className={`inputBox ${readOnly ? "w-full" : "w-5/6"}`}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleChange}
              readOnly={readOnly}
            />
            {!readOnly && showPassword && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowPassword(false);
                }}
              >
                <FaEye className="text-gray-400 hover:text-slate-600" />
              </div>
            )}
            {!readOnly && !showPassword && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowPassword(true);
                }}
              >
                <FaEyeSlash className="text-gray-400 hover:text-slate-600" />
              </div>
            )}
          </div>
          {errors.password && <div className="errorMessage">{errors.password}</div>}
          {!readOnly && <label className="text-left">Confirm Password</label>}
          {!readOnly && (
            <div>
            <div className="flex justify-between items-center">
              <input
                className={`inputBox w-5/6`}
                type={showPasswordConfirm ? "text" : "password"}
                name="passwordConfirm"
                value={formValues.passwordConfirm}
                onChange={handleChange}
              />
              {!readOnly && showPasswordConfirm && (
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPasswordConfirm(false)}
                >
                  <FaEye className="text-gray-400 hover:text-slate-600" />
                </div>
              )}
              {!readOnly && !showPasswordConfirm && (
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPasswordConfirm(true)}
                >
                  <FaEyeSlash className="text-gray-400 hover:text-slate-600" />
                </div>
              )}
            </div>
            {errors.passwordConfirm && <div className="errorMessage">{errors.passwordConfirm}</div>}
            </div>
          )}
          {readOnly ? (
            <div
              className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
              onClick={() => setReadOnly(false)}
            >
              Edit
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              <div
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
                onClick={() => {setReadOnly(true); auth.asTenant ? handleGetTenant() : handleGetAgent()}}
              >
                Cancel
              </div>
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ShowProfile;
