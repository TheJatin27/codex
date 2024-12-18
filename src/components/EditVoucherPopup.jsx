import React, { useState } from "react";
// import "../EditVoucherPopup.css"; // Add custom styles for the popup if needed.

const EditVoucherPopup = ({ voucher, onClose, onSave }) => {
  const [voucherName, setVoucherName] = useState(voucher.voucherName || "");
  const [voucherLimit, setVoucherLimit] = useState(voucher.voucherLimit || "");
  const [voucherCost, setVoucherCost] = useState(voucher.voucherCost || "");
  const [voucherDetails, setVoucherDetails] = useState(voucher.voucherDetails || "");
  const [voucherTerms, setVoucherTerms] = useState(voucher.voucherTerms || "");

  const handleSave = () => {
    // Create an object with the updated fields
    const updatedData = {
      voucherName,
      voucherLimit,
      voucherCost,
      voucherDetails,
      voucherTerms,
    };

    onSave(voucher.id, updatedData); // Pass updated data to the parent
    onClose(); // Close the popup
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="popup-title">Edit Voucher</h2>
        <form className="edit-voucher-form">
          {/* Voucher Name */}
          <div className="form-group">
            <label htmlFor="voucherName">Voucher Name</label>
            <input
              type="text"
              id="voucherName"
              value={voucherName}
              onChange={(e) => setVoucherName(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Voucher Limit */}
          <div className="form-group">
            <label htmlFor="voucherLimit">Voucher Limit</label>
            <input
              type="number"
              id="voucherLimit"
              value={voucherLimit}
              onChange={(e) => setVoucherLimit(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Voucher Cost */}
          <div className="form-group">
            <label htmlFor="voucherCost">Voucher Cost</label>
            <input
              type="text"
              id="voucherCost"
              value={voucherCost}
              onChange={(e) => setVoucherCost(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Voucher Details */}
          <div className="form-group">
            <label htmlFor="voucherDetails">Voucher Details</label>
            <textarea
              id="voucherDetails"
              value={voucherDetails}
              onChange={(e) => setVoucherDetails(e.target.value)}
              className="textarea-field"
            ></textarea>
          </div>

          {/* Terms & Conditions */}
          <div className="form-group">
            <label htmlFor="voucherTerms">Terms & Conditions</label>
            <textarea
              id="voucherTerms"
              value={voucherTerms}
              onChange={(e) => setVoucherTerms(e.target.value)}
              className="textarea-field"
            ></textarea>
          </div>

          {/* Save Button */}
          <button type="button" onClick={handleSave} className="save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVoucherPopup;
