import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title = "Are you sure?", message = "This action cannot be undone." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <FaExclamationTriangle className="text-2xl" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
