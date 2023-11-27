import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthData, addPropertyMutation, getAgentQuery, updateAgentMutation } from '/src/components/';

function AddProperty() {
  const navigate = useNavigate();
  const { auth } = AuthData()
  const initValues = {
    price: "",
    type: "",
    bathrooms: "",
    bedrooms: "",
    area: "",
    display_address: "",
    street_address: "",
    postal_code: "",
  };
  const [formValues, setFormValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [checkSubmit, setCheckSubmit] = useState(false);

  // handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // handle submit of input form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(formValues));
    setCheckSubmit(true);
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
    // define the variables required for the query
    const variables = {
      price: parseInt(formValues.price),
      type: formValues.type,
      bathrooms: parseInt(formValues.bathrooms),
      bedrooms: parseInt(formValues.bedrooms),
      area: parseInt(formValues.area),
      display_address: formValues.display_address,
      street_address: formValues.street_address,
      manager_id: auth.userData.id,
      postal_code: formValues.postal_code,
    };
    // send the request to the GraphQL API
    try {
      const result = await addPropertyMutation(variables);
      if (result.addProperty) {
        console.log("property added");
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
        handleUpdateAgent(result.getAgent.properties);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  // update agent's property list
  const handleUpdateAgent = async (propertyList) => {
    // define the variables required for the query
    const variables = {
      id: auth.userData.id,
      properties: propertyList,
    }
    // send the request to the GraphQL API
    try {
      const result = await updateAgentMutation(variables);
      if (result) {
        console.log("agent updated");
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
              placeholder="Price: $"
              value={formValues.price}
              onChange={handleChange} 
            />
            {errors.price && <div className="errorMessage">{errors.price}</div>}
            <label className='text-left'>Type</label>
            <input
              className="inputBox"
              type="text"
              name="type"
              placeholder="Type: HDB/ Condo"
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
              placeholder="Bedrooms: "
              value={formValues.bedrooms}
              onChange={handleChange}
            />
            {errors.bedrooms && <div className="errorMessage">{errors.bedrooms}</div>}
            <label className='text-left'>Bathrooms</label>
            <input
              className="inputBox"
              type="number"
              name="bathrooms"
              placeholder="Bathrooms: "
              value={formValues.bathrooms}
              onChange={handleChange}
            />
            {errors.bathrooms && <div className="errorMessage">{errors.bathrooms}</div>}
            <label className='text-left'>Area</label>
            <input
              className="inputBox"
              type="text"
              name="area"
              placeholder="Area: "
              value={formValues.area}
              onChange={handleChange}
            />
            {errors.area && <div className="errorMessage">{errors.area}</div>}
            <label className='text-left'>Display Address</label>
            <input
              className="inputBox"
              type="text"
              name="display_address"
              placeholder="Display Address: "
              value={formValues.display_address}
              onChange={handleChange}
            />
            {errors.display_address && <div className="errorMessage">{errors.display_address}</div>}
            <label className='text-left'>Street Address</label>
            <input
              className="inputBox"
              type="text"
              name="street_address"
              placeholder="Street Address: "
              value={formValues.street_address}
              onChange={handleChange}
            />
            {errors.street_address && <div className="errorMessage">{errors.street_address}</div>}
            <label className='text-left'>Postal Code</label>
            <input
              className="inputBox"
              type="text"
              name="postal_code"
              placeholder="Postal Code: "
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
