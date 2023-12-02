// Purpose: Displays a modal to edit property data.
// Li Yueling
// First Create: 2023-11-26
// Function Complete: 2023-11-26

import React, { useEffect, useState } from "react";
// import auth
import { AuthData } from "../AuthWrapper.jsx";
// import graphql mutation and query
import { getPropertyQuery, updatePropertyMutation } from "../FetchCmd.js";
import Modal from "../Modal.jsx";

function EditProperty(args) {
  args.propertyId = parseInt(args.propertyId); // convert id from string to int
  // propertyId: id of the property to be edited
  // setRow: function to set the row to be edited
  // setId: function to set the id of the row to be edited
  // modalVisible: boolean to determine if modal is visible
  // setModalVisible: function to set modalVisible
  const { propertyId, setRow, setId, modalVisible, setModalVisible } = args;

  const { auth } = AuthData();
  const initValues = {
    price: "",
    type: "",
    bathrooms: "",
    bedrooms: "",
    area: "",
    display_address: "",
    street_address: "",
    postal_code: "",
  }; // initial values for input fields
  const [formValues, setFormValues] = useState(initValues); // input fields initialization
  const [errors, setErrors] = useState({}); // errors initialization, used for validation
  const [checkSubmit, setCheckSubmit] = useState(false); // check if submit button is clicked
  const [readOnly, setReadOnly] = useState(true); // if input fields are read only

  // fetch property data on load
  useEffect(() => {
    handleGetProperty();
  }, []);

  const handleGetProperty = async () => {
    try {
      const result = await getPropertyQuery({ idList: [propertyId] });
      if (result) {
        setFormValues({
          ...formValues,
          price: result.getProperty[0].price,
          type: result.getProperty[0].type,
          bathrooms: result.getProperty[0].bathrooms,
          bedrooms: result.getProperty[0].bedrooms,
          area: result.getProperty[0].area,
          display_address: result.getProperty[0].display_address,
          street_address: result.getProperty[0].street_address,
          postal_code: result.getProperty[0].postal_code,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  };

  // if no errors, send data to backend
  useEffect(() => {
    if (Object.keys(errors).length === 0 && checkSubmit) {
      handleUpdateProperty();
    }
  }, [errors]);

  const handleUpdateProperty = async () => {
    // create args for updatePropertyMutation. copy formValues, add manager_id and property_id
    const args = {
      ...formValues,
      manager_id: auth.id,
      id: propertyId,
    };
    try {
      const result = await updatePropertyMutation(args);
      if (result) {
        console.log("property updateded");
        // after update, reset all status and values to default
        setReadOnly(true);
        setCheckSubmit(false);
        setModalVisible(false);
        setRow(null);
        setId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isVisible={modalVisible}
      onClose={() => {
        setModalVisible(false);
        setRow(null);
        setId(null);
      }}
    >
      <div className="flex items-center justify-center">
        <div className="text-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-2 my-5"
          >
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-left">Price</label>
                <input
                  className="inputBox"
                  type="text"
                  name="price"
                  placeholder="Price: $"
                  value={formValues.price}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
                {errors.price && (
                  <div className="errorMessage">{errors.price}</div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-left">Type</label>
                <input
                  className="inputBox"
                  type="text"
                  name="type"
                  placeholder="Type: HDB/ Condo"
                  value={formValues.type}
                  onChange={handleChange}
                  list="typeList"
                  readOnly={readOnly}
                />
                <datalist id="typeList">
                  <option value="HDB" />
                  <option value="Condo" />
                </datalist>
                {errors.type && (
                  <div className="errorMessage">{errors.type}</div>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-left">Bedrooms</label>
                <input
                  className="inputBox"
                  type="number"
                  name="bedrooms"
                  placeholder="Bedrooms: "
                  value={formValues.bedrooms}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
                {errors.bedrooms && (
                  <div className="errorMessage">{errors.bedrooms}</div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-left">Bathrooms</label>
                <input
                  className="inputBox"
                  type="number"
                  name="bathrooms"
                  placeholder="Bathrooms: "
                  value={formValues.bathrooms}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
                {errors.bathrooms && (
                  <div className="errorMessage">{errors.bathrooms}</div>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-left">Area</label>
                <input
                  className="inputBox"
                  type="text"
                  name="area"
                  placeholder="Area: "
                  value={formValues.area}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
                {errors.area && (
                  <div className="errorMessage">{errors.area}</div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-left">Display Address</label>
                <input
                  className="inputBox"
                  type="text"
                  name="display_address"
                  placeholder="Display Address: "
                  value={formValues.display_address}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
                {errors.display_address && (
                  <div className="errorMessage">{errors.display_address}</div>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-left">Street Address</label>
                <input
                  className="inputBox"
                  type="text"
                  name="street_address"
                  placeholder="Street Address: "
                  value={formValues.street_address}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
                {errors.street_address && (
                  <div className="errorMessage">{errors.street_address}</div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-left">Postal Code</label>
                <input
                  className="inputBox"
                  type="text"
                  name="postal_code"
                  placeholder="Postal Code: "
                  value={formValues.postal_code}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
                {errors.postal_code && (
                  <div className="errorMessage">{errors.postal_code}</div>
                )}
              </div>
            </div>
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
                  onClick={() => {
                    setReadOnly(true);
                    handleGetProperty();
                  }}
                >
                  Cancel
                </div>
                <button
                  className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
                  type="submit"
                >
                  Update Data
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default EditProperty;
