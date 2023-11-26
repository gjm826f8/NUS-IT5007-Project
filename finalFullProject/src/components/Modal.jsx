import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  }

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        onClick={handleClose}
        id="wrapper"
    >
      <div className="w-[660px] flex flex-col gap-2">
        <button 
            className="text-white text-xl place-self-end"
            onClick={() => onClose()}
        >
            x
        </button>
        <div className="bg-gray-50 px-2 py-5 rounded-lg">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
