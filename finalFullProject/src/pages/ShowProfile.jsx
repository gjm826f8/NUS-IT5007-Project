// Purpose: Provide a page for the user to view and edit their profile.

import React, { useEffect, useState } from "react";
// import icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import auth, graphql queries and components
import { AuthData, DeleteTenant, getAgentQuery, getTenantQuery, updateAgentMutation, updateTenantMutation } from "/src/components/";

function ShowProfile() {
  const initData = {
    name: "",
    password: "",
    passwordConfirm: "",
  }; // initial values for the input fields

  const { auth, setAuth } = AuthData();
  const [readOnly, setReadOnly] = useState(true); // if input fields are read only
  const [showPassword, setShowPassword] = useState(false); // if password input field is shown
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // if password confirm input field is shown
  const [formValues, setFormValues] = useState(initData); // formValues initialization
  const [errors, setErrors] = useState({}); // errors initialization, for input value validation
  const [checkUpdate, setCheckUpdate] = useState(false); // check if update button is clicked
  const [modalVisible, setModalVisible] = useState(false); // modal visibility control - delete function
  const [checkDelete, setCheckDelete] = useState(false); // check if delete button is clicked

  // fetch user data on load
  useEffect(() => {
    handleGetUser();
  }, []);

  // get user data according to the user type
  const handleGetUser = async () => {
    if (auth.asTenant) {
        handleGetTenant();
    } else {
        handleGetAgent();
    }
  }

  // fetch tenant data
  const handleGetTenant = async () => {
    // define the variables required for the query
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await getTenantQuery(variables);
      if (result.getTenant) {
        setFormValues({...formValues, name: result.getTenant.name, password: result.getTenant.password, passwordConfirm: ''})
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

  // input value validation
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name required";
    } else if (values.name.length < 4) {
        errors.name = "Name needs to be 4 characters or more";
    } else if (values.name.length > 20) {
        errors.name = "Name needs to be 20 characters or less";
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

  // fetch agent data
  const handleGetAgent = async () => {
    // define the variables required for the query
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await getAgentQuery(variables);
      if (result.getAgent) {
        setFormValues( {...formValues, name: result.getAgent.name, password: result.getAgent.password, passwordConfirm: ''});
      }
    } catch (error) {
      console.log(error);
    }
  };

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

    // update tenant data
    const handleUpdateTenant = async () => {
        // define the variables required for the query
        const variables = {
            id: auth.id,
            name: formValues.name,
            password: formValues.password,
        }
        // send the request to the GraphQL API
        try {
            const result = await updateTenantMutation(variables);
            if (result) {
                console.log("tenant updated");
                setReadOnly(true);
                setAuth({...auth, name: formValues.name})
            }
        } catch (error) {
            console.log(error);
        }
    }

    // update agent data
    const handleUpdateAgent = async () => {
        // define the variables required for the query
        const variables = {
          id: auth.id,
          name: formValues.name,
          password: formValues.password,
        }
        // send the request to the GraphQL API
        try {
          const result = await updateAgentMutation(variables);
          if (result) {
            console.log("agent updated");
            setReadOnly(true);
            setAuth({...auth, name: formValues.name})
          }
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div>
    <div className="flex flex-col items-center justify-center gap-2 py-10">
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
            <div className="flex justify-between gap-4">
              <div
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full cursor-pointer"
                onClick={() => setReadOnly(false)}
              >
                Edit
              </div>
              {auth.asTenant && <div 
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full cursor-pointer"
                onClick={() => {setCheckDelete(true); setModalVisible(true)}}
              >
                Delete Account
              </div>}
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              <div
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full cursor-pointer"
                onClick={() => {setReadOnly(true); auth.asTenant ? handleGetTenant() : handleGetAgent()}}
              >
                Cancel
              </div>
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full cursor-pointer"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
    {checkDelete && 
    <DeleteTenant modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
    </div>
  );
}

export default ShowProfile;
