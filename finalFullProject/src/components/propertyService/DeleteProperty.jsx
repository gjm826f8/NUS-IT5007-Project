// Purpose: Displays a modal to confirm if the user really wants to delete a property.
// Li Yueling
// First Create: 2023-11-26
// Function Complete: 2023-11-26

import React from "react";
// import graphql mutation
import { deletePropertyMutation } from "../FetchCmd.js";
import Modal from "../Modal.jsx";

const DeleteProperty = (args) => {
  args.propertyId = parseInt(args.propertyId); // convert id from string to int
  // modalVisible: boolean to determine if modal is visible
  // setModalVisible: function to set modalVisible
  // setRow: function to set the row to be deleted
  // setId: function to set the id of the row to be deleted
  // propertyId: id of the property to be deleted
  const { modalVisible, setModalVisible, setRow, setId, propertyId } = args;

  const handleDelete = async () => {
    await handleDeleteProperty();
    setModalVisible(false);
    setRow(null);
    setId(null);
  };

  const handleDeleteProperty = async () => {
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
