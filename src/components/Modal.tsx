import React from "react";

import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
// import "./Modal.css";

interface ModalProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export const Modal = ({ type, message, onClose }: ModalProps) => {
  return (
    <div className="modal-backdrop">
      <div className={`modal ${type}`}>
        <div className="modal-icon">
          {type === "success" ? (
            <AiOutlineCheckCircle className="icon success" />
          ) : (
            <AiOutlineCloseCircle className="icon error" />
          )}
        </div>
        <p>{message}</p>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
