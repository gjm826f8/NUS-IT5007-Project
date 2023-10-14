import React, { useReducer } from "react";
import { useForm } from "react-hook-form";

// import the header component
import Navi from "../Components/Navi";

// import the auth context, when insert new data to the database, we need to know who is the manager
import { AuthData } from "../auth/authWrapper";

// import stylesheet
import "./New.css";

const New = () => {
  // use react hook form to validate the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // get the user data from the auth context
  const { userdata } = AuthData();

  // use reducer to store the form data and initialize the form data
  const [formData, serFormData] = useReducer(
    (oldData, item) => {
      return {
        ...oldData,
        [item.type]: item.value,
      };
    },
    {
      type: "",
      bedroom: "",
      bathroom: "",
      price: "",
      area: "",
      address: "",
      postCode: "",
    }
  );

  // when the form is submitted, we need to make an api call to add the new listing
  const onSubmit = () => {
    const data = {
      price: formData.price,
      type: formData.type,
      bathrooms: formData.bathroom,
      bedrooms: formData.bedroom,
      area: formData.area,
      display_address: formData.address,
      street_address: formData.address,
      manager_id: userdata.email,
    };

    // make api call to add new listing
    console.log(data);
  };

  return (
    <div>
      <Navi />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 shadow-lg rounded-2xl w-2/3 max-w-3xl p-10 text-center">
          {/* form elements include type, bedroom#, bathroom#, price, area, address and post code */}
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            
            {/* for type, a dropdown datalist is also built */}
            {/* only `HDB` and `Condo` are valid */}
            <label className="text-left">Type</label>
            <input
              className="inputBox"
              type="text"
              placeholder="Type: HDB/ Condo"
              list="typeList"
              {...register("type", {
                onChange: (e) => {
                    serFormData({ type: "type", value: e.target.value })
                },
                required: "Type is required",
                pattern: {
                  value: /^HDB$|^Condo$/i,
                  message: "Please enter a valid type",
                },
              })}
            />
            <datalist id="typeList">
              <option value="HDB" />
              <option value="Condo" />
            </datalist>
            <p className="errorMessage">{errors.type?.message}</p>
            
            {/* only numbers is valid */}
            <label className="text-left">Number of Bedrooms</label>
            <input
              className="inputBox"
              type="text"
              placeholder="# of Bedrooms"
              {...register("bedroom", {
                onChange: (e) => {
                    serFormData({ type: "bedroom", value: e.target.value });
                },
                required: "Bedroom is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Please enter a valid number",
                },
              })}
            />
            <p className="errorMessage">{errors.bedroom?.message}</p>
            
            {/* only numbers is valid */}
            <label className="text-left">Number of Bathrooms</label>
            <input
              className="inputBox"
              type="text"
              placeholder="# of Bathrooms"
              {...register("bathroom", {
                onChange: (e) => {
                    serFormData({ type: "bathroom", value: e.target.value });
                },
                required: "Bathroom is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Please enter a valid number",
                },
              })}
            />
            <p className="errorMessage">{errors.bathroom?.message}</p>
            
            {/* only numbers is valid */}
            <label className="text-left">Price</label>
            <input
              className="inputBox"
              type="text"
              placeholder="Price (SGD/month)"
              {...register("price", {
                onChange: (e) => {
                    serFormData({ type: "price", value: e.target.value });
                },
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Please enter a valid number",
                },
              })}
            />
            <p className="errorMessage">{errors.price?.message}</p>
            
            {/* only numbers is valid */}
            <label className="text-left">Area</label>
            <input
              className="inputBox"
              type="text"
              placeholder="Area (sqft)"
              {...register("area", {
                onChange: (e) => {
                    serFormData({ type: "area", value: e.target.value });
                },
                required: "Area is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Please enter a valid number",
                },
              })}
            />
            <p className="errorMessage">{errors.area?.message}</p>
            
            {/* cannot leave address empty */}
            <label className="text-left">Address</label>
            <input
              className="inputBox"
              type="text"
              placeholder="Address"
              {...register("address", {
                onChange: (e) => {
                    serFormData({ type: "address", value: e.target.value });
                },
                required: "Address is required",
              })}
            />
            <p className="errorMessage">{errors.address?.message}</p>
            
            {/* only numbers is valid, length must be 6 */}
            <label className="text-left">Post Code</label>
            <input
              className="inputBox"
              type="text"
              placeholder="Post Code"
              {...register("postCode", {
                onChange: (e) => {
                    serFormData({ type: "postCode", value: e.target.value });
                },
                required: "Post Code is required",
                maxLength: {
                  value: 6,
                  message: "Please enter a valid post code",
                },
                minLength: {
                  value: 6,
                  message: "Please enter a valid post code",
                },
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Please enter a valid number",
                },
              })}
            />
            <p className="errorMessage">{errors.postCode?.message}</p>
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
