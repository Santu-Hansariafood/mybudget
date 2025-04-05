import React, { useState } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import Popup from "./Popup";

const Actions = ({ rowData }) => {
  const [popupData, setPopupData] = useState({ isOpen: false, type: "", data: null });

  const handleOpenPopup = (type) => {
    setPopupData({ isOpen: true, type, data: rowData });
  };

  const handleClosePopup = () => {
    setPopupData({ isOpen: false, type: "", data: null });
  };

  return (
    <div className="flex space-x-3 text-lg">
      <button onClick={() => handleOpenPopup("View")} className="text-blue-500 hover:text-blue-700">
        <FiEye />
      </button>
      <button onClick={() => handleOpenPopup("Edit")} className="text-yellow-500 hover:text-yellow-700">
        <FiEdit />
      </button>
      <button onClick={() => handleOpenPopup("Delete")} className="text-red-500 hover:text-red-700">
        <FiTrash2 />
      </button>

      {/* Popup Component */}
      <Popup isOpen={popupData.isOpen} onClose={handleClosePopup} title={popupData.type}>
        {popupData.data ? (
          <div>
            {popupData.type === "View" && <p><strong>Name:</strong> {popupData.data.name}</p>}
            {popupData.type === "Edit" && <p>Editing data for {popupData.data.name}</p>}
            {popupData.type === "Delete" && <p>Are you sure you want to delete {popupData.data.name}?</p>}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </Popup>
    </div>
  );
};

export default Actions;
