import React from "react";
import { AuthData } from "./AuthWrapper.jsx";
import { deletePropertyMutation, updateAgentMutation } from "./FetchCmd.js";
import Modal from "./Modal.jsx";

const DeleteProperty = (args) => {
  args.propertyId = parseInt(args.propertyId);
  const { modalVisible, setModalVisible, setRow, setId, propertyId } = args;

  const { auth } = AuthData();

  const handleDelete = async () => {
    await handleDeleteProperty();
    await handleUpdateAgent();
    setModalVisible(false);
    setRow(null);
    setId(null);
  };

  const handleDeleteProperty = async () => {
    console.log(propertyId);
    try {
      const variables = {
        id: propertyId,
      };
      const result = await deletePropertyMutation(variables);
      if (result) {
        console.log("Success! delete property");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAgent = async () => {
    console.log(auth.userData);
    try {
      const variables = {
        id: auth.userData.id,
        properties: auth.userData.properties,
        propertyId: propertyId,
      };
      const result = await updateAgentMutation(variables);
      if (result) {
        console.log("Success! update agent's property list");
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
      <div className="flex flex-col items-center justify-center text-center gap-4 p-10">
        <div className="text-xl font-semibold">
          Are you sure you want to delete this property?
        </div>
        <div className="flex justify-between w-full my-5 gap-2">
          <div
            className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
            onClick={() => {
              setModalVisible(false);
              setRow(null);
              setId(null);
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

export default DeleteProperty;
