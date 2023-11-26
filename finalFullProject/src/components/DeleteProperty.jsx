import React from "react";
import { AuthData } from "./AuthWrapper.jsx";
import Modal from "./Modal.jsx";
import { deletePropertyMutation } from "./FetchCmd.js";

const DeleteProperty = (args) => {
  args.propertyId = parseInt(args.propertyId);
  const {
    modalVisible,
    setModalVisible,
    setRow,
    setId,
    propertyId,
  } = args;

  const { auth, setAuth } = AuthData();

  const handleDeleteProperty = async () => {
    try {
        const variables = {
            id: propertyId
        }
        const result = await deletePropertyMutation(variables);
        if (result) {
            handleUpdateAgent();
            console.log("deleted property")
        }
    } catch (error) {
        console.log(error)
    }
  };

  const handleUpdateAgent = async () => {};

  return (
    <Modal
      isVisible={modalVisible}
      onClose={() => {
        setModalVisible(false);
        setRow(null);
        setId(null);
      }}
    >
        <div className="flex flex-col items-center justify-center text-center gap-4">
        <div className="text-xl font-semibold">
            Are you sure you want to delete this property?
        </div>
        <div className="flex flex-col w-full my-5 gap-2">
            <div
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
                onClick={() => {
                    setModalVisible(false);
                    setRow(null);
                    setId(null);
                }}
            >Cancel</div>
            <div 
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold p-2 rounded-lg w-full"
                onClick={handleDeleteProperty}
            >
                Delete
            </div>

        </div>
        </div>
    </Modal>
  );
};

export default DeleteProperty;
