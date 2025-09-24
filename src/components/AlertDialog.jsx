import React from "react";
import "./AlertDialog.css";

const AlertDialog = ({ open, title = "", message = "", onClose }) => {
  if (!open) return null;
  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
      <div className="dialog-content">
        {title ? <div className="dialog-title">{title}</div> : null}
        <div className="dialog-message">{message}</div>
        <div className="dialog-actions">
          <button className="dialog-ok" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;


