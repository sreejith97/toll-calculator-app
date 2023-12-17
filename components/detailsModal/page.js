import React from "react";

function DetailsModal({ isOpen, onClose, children, data }) {
  return (
    <div
      className={`fixed z-[1000] inset-0 ${
        isOpen ? "flex items-center justify-center" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 mx-[100px] min-h-[400px] w-full rounded-lg z-10 flex flex-col justify-between items-center">
        {children}
      </div>
    </div>
  );
}

export default DetailsModal;
