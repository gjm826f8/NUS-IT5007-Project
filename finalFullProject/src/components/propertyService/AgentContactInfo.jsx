// Purpose: Displays the agent's contact information in a modal.

import React from "react";
import Modal from "../Modal.jsx";

const AgentContactInfo = (args) => {
  // modalVisible: boolean to determine if modal is visible
  // setModalVisible: function to set modalVisible
  // name: agent's name
  // email: agent's email
  const { modalVisible, setModalVisible, name, email } = args;

  return (
    <Modal
      isVisible={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
    >
      <div className="flex flex-col items-center justify-center text-center gap-4 p-10">
        <div className="text-xl font-semibold">
            Here is the agent's contact information:
        </div>
        <div className="flex flex-col w-full px-10 gap-2 my-5">
            <label className="text-left text-gray-500">
                Agent Name:
            </label>
            <div>
                {name}
            </div>
            <label className="text-left text-gray-500">
                Agent Email:
            </label>
            <div>
                {email}
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default AgentContactInfo;
