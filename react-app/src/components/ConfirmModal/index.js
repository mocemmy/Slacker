import React from "react";
import { useModal } from "../../context/Modal";
import "./ConfirmModal.css";

const ConfirmModal = ({ modalTitle, yesHandler }) => {
  const { closeModal } = useModal();

  if (!modalTitle) return null;

  const handleClick = async () => {
    await yesHandler();
    closeModal();
  };

  return (
    <div className="confirm-modal-container">
      <h1 className="modal-title">{modalTitle}</h1>
      <div className="button-container">
        <button className="confirm-button" onClick={handleClick}>
          Yes
        </button>
        <button className="cancel-button" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
