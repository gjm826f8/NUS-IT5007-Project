// Purpose: AddProperty page allows the agent to add a new property to the database
// Li Yueling
// First Create: 2023-11-20
// Function Complete: 2023-11-27

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import auth and necessary graphql queries/ mutations
import { AuthData, addPropertyMutation, getAgentQuery, updateAgentMutation } from '/src/components/';

function AddProperty() {
  const navigate = useNavigate();
  const { auth } = AuthData();
  const initValues = { // initial values for the input fields
    price: "",
    type: "",
    bathrooms: "",
    bedrooms: "",
    area: "",
    display_address: "",
    street_address: "",
    postal_code: "",
  };
  const [formValues, setFormValues] = useState(initValues); // formValues initialization
  const [errors, setErrors] = useState({}); // errors initialization, for input value validation
  const [checkSubmit, setCheckSubmit] = useState(false); // check if submit button is clicked

  // handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // handle submit of input form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(formValues)); // validate the input fields
    setCheckSubmit(true); // set checkSubmit to true, to trigger useEffect
  };

  // validation of input fields
  const validate = (values) => {
    const errors = {};
    // regex, number, positive or negative
    const numberRegex = /^[-+]?\d+(\.\d+)?$/;
    // regex, number, positive
    const posNumRegex = /^[+]?\d+(\.\d+)?$/;

    // price, required, number
    if (!values.price) {
      errors.price = "Price is required";
    } else if (!numberRegex.test(values.price)) {
      errors.price = "Price must be a number";
    } else if (!posNumRegex.test(values.price)) {
      errors.price = "Price must be a positive number";
    }
    // type, required, HDB/Condo
    if (!values.type) {
      errors.type = "Type is required";
    } else if (values.type !== "HDB" && values.type !== "Condo") {
      errors.type = "Type must be HDB or Condo";
    }
    // bedrooms, required, number
    if (!values.bedrooms) {
      errors.bedrooms = "Bedrooms is required";
    } else if (!numberRegex.test(values.bedrooms)) {
      errors.bedrooms = "Bedrooms must be a number";
    } else if (!posNumRegex.test(values.bedrooms)) {
      errors.bedrooms = "Bedrooms must be a positive number";
    }
    // bathrooms, required, number
    if (!values.bathrooms) {
      errors.bathrooms = "Bathrooms is required";
    } else if (!numberRegex.test(values.bathrooms)) {
      errors.bathrooms = "Bathrooms must be a number";
    } else if (!posNumRegex.test(values.bathrooms)) {
      errors.bathrooms = "Bathrooms must be a positive number";
    }
    // area, required, number
    if (!values.area) {
      errors.area = "Area is required";
    } else if (!numberRegex.test(values.area)) {
      errors.area = "Area must be a number";
    } else if (!posNumRegex.test(values.area)) {
      errors.area = "Area must be a positive number";
    }
    // display_address, required
    if (!values.display_address) {
      errors.display_address = "Display Address is required";
    }
    // street_address, required
    if (!values.street_address) {
      errors.street_address = "Street Address is required";
    }
    // postal_code, required
    if (!values.postal_code) {
      errors.postal_code = "Postal Code is required";
    }
    return errors;
  }

  // if no errors, send data to backend
  useEffect(() => {
    if (Object.keys(errors).length === 0 && checkSubmit) {
      handleAddProperty();
    }
  }, [errors])

  const handleAddProperty = async () => {
    // 2023-12-01
    // According to Liao's new request, the longitute and latitude will be generated randomly
    // get 2 random numbers to generate a random longitute and latitude
    // longitute range: 103.38 to 104.6
    // latitude range: 1.09 to 1.29
    const longitute = (Math.random() * (104.6 - 103.38) + 103.38).toFixed(6);
    const latitude = (Math.random() * (1.29 - 1.09) + 1.09).toFixed(6);
    // define the variables required for the query
    const variables = {
      price: parseInt(formValues.price),
      type: formValues.type,
      bathrooms: parseInt(formValues.bathrooms),
      bedrooms: parseInt(formValues.bedrooms),
      area: parseInt(formValues.area),
      display_address: formValues.display_address,
      street_address: formValues.street_address,
      manager_id: auth.id,
      postal_code: formValues.postal_code,
      lng: longitute,
      lat: latitude,
    };
    // send the request to the GraphQL API
    try {
      const result = await addPropertyMutation(variables);
      if (result.addProperty) {
        console.log("property added");
        // after adding the property, update the agent's property list
        // to prepare the old property list, get agent first
        handleGetAgent();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetAgent = async () => {
    // send the request to the GraphQL API
    try {
      const result = await getAgentQuery({email: auth.email})
      if (result.getAgent) {
        console.log('agent fetched')
        // after getting the agent, update the agent's property list
        handleUpdateAgent(result.getAgent.properties);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  // update agent's property list
  const handleUpdateAgent = async (propertyList) => {
    // define the variables required for the query
    // send the old property list and the backend will automatically add the new property id to it
    const variables = {
      id: auth.id,
      properties: propertyList,
    }
    // send the request to the GraphQL API
    try {
      const result = await updateAgentMutation(variables);
      if (result) {
        console.log("agent updated");
        // after updating the agent, reset the all values and navigate to myposts page
        setFormValues(initValues);
        setCheckSubmit(false);
        navigate("/myposts");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-gray-100 shadow-lg rounded-2xl w-2/3 max-w-3xl p-10 m-10 text-center'>
          <form onSubmit={handleSubmit} className='flex flex-col w-full px-10 gap-2 my-5'>
            <label className='text-left'>Price</label>
            <input
              className="inputBox"
              type="text"
              name="price"
              placeholder="Price (in SGD)"
              value={formValues.price}
              onChange={handleChange} 
            />
            {errors.price && <div className="errorMessage">{errors.price}</div>}
            <label className='text-left'>Type</label>
            <input
              className="inputBox"
              type="text"
              name="type"
              placeholder="Type (HDB/ Condo)"
              value={formValues.type}
              onChange={handleChange}
              list='typeList'
            />
            <datalist id='typeList'>
              <option value='HDB' />
              <option value='Condo' />
            </datalist>
            {errors.type && <div className="errorMessage">{errors.type}</div>}
            <label className='text-left'>Bedrooms</label>
            <input
              className="inputBox"
              type="number"
              name="bedrooms"
              placeholder="# of Bedrooms"
              value={formValues.bedrooms}
              onChange={handleChange}
            />
            {errors.bedrooms && <div className="errorMessage">{errors.bedrooms}</div>}
            <label className='text-left'>Bathrooms</label>
            <input
              className="inputBox"
              type="number"
              name="bathrooms"
              placeholder="# of Bathrooms"
              value={formValues.bathrooms}
              onChange={handleChange}
            />
            {errors.bathrooms && <div className="errorMessage">{errors.bathrooms}</div>}
            <label className='text-left'>Area</label>
            <input
              className="inputBox"
              type="text"
              name="area"
              placeholder="Area (in sqft)"
              value={formValues.area}
              onChange={handleChange}
            />
            {errors.area && <div className="errorMessage">{errors.area}</div>}
            <label className='text-left'>Display Address</label>
            <input
              className="inputBox"
              type="text"
              name="display_address"
              placeholder="Address that you want to display"
              value={formValues.display_address}
              onChange={handleChange}
            />
            {errors.display_address && <div className="errorMessage">{errors.display_address}</div>}
            <label className='text-left'>Street Address</label>
            <input
              className="inputBox"
              type="text"
              name="street_address"
              placeholder="Actual Street Address"
              value={formValues.street_address}
              onChange={handleChange}
            />
            {errors.street_address && <div className="errorMessage">{errors.street_address}</div>}
            <label className='text-left'>Postal Code</label>
            <input
              className="inputBox"
              type="text"
              name="postal_code"
              placeholder="Postal Code"
              value={formValues.postal_code}
              onChange={handleChange}
            />
            {errors.postal_code && <div className="errorMessage">{errors.postal_code}</div>}
            <button
              className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
              type="submit"
            >
              Add New Property
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProperty
