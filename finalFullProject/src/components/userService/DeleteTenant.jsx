// Purpose: Provide a way for a tenant to delete their account.

import React from "react";
// import auth
import { AuthData } from "../AuthWrapper.jsx";
// import graphql mutation
import { deleteTenantMutation } from "../FetchCmd.js";
// import modal to confirm delete
import Modal from "../Modal.jsx";

const DeleteTenant = (args) => {
  const { modalVisible, setModalVisible } = args;

  const { auth, setAuth } = AuthData();

  const handleDelete = async () => {
    handleDeleteTenant(); // delete the tenant from the database
    setModalVisible(false); // close the modal
    setAuth({ 
      ...auth, 
      id: "",
      name: "",
      email: "",
      isAuthenticated: false,
      asTenant: false, 
    });
  };

  // delete the tenant from the database
  const handleDeleteTenant = async () => {
    try {
      const variables = {
        id: auth.id,
      };
      const result = await deleteTenantMutation(variables);
      if (result) {
        console.log("Success! delete account");
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
      }}
    >
      <div className="flex flex-col items-center justify-center text-center gap-4 p-10">
        <div className="text-xl font-semibold">
          Are you sure you want to delete your account?
        </div>
        <div className="flex justify-between w-full my-5 gap-2">
          <div
            className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
            onClick={() => {
              setModalVisible(false);
            }}
          >
            Cancel
          </div>
          <div
            className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
            onClick={handleDelete}
          >
            Delete
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTenant;
