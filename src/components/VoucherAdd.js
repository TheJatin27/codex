import React, { useState } from "react";
import "../VoucherPopup.css";

const VoucherAdd = ({ onClose }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2 className="popup-title">Add New Voucher</h2>

        {/* Form */}
        <form className="voucher-form">
          {/* Image Upload Section */}
          <div className="form-group image-upload-group">
            <label className="image-upload-label">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded Preview"
                  className="uploaded-image"
                />
              ) : (
                <div className="image-placeholder">
                  <p>Upload Voucher Brand Image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input-hidden"
              />
            </label>
          </div>

          {/* Voucher Name */}
          <div className="form-group">
            <label htmlFor="voucherName">Voucher Name</label>
            <input
              type="text"
              id="voucherName"
              placeholder="Enter Voucher Name"
              className="input-field"
            />
          </div>

          {/* Voucher Category */}
          <div className="form-group">
            <label htmlFor="voucherCategory">Voucher Category</label>
            <select id="voucherCategory" className="input-field">
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="grocery">Grocery</option>
              <option value="beauty">Beauty</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Voucher Limit */}
          <div className="form-group">
            <label htmlFor="voucherLimit">Voucher Limit</label>
            <input
              type="number"
              id="voucherLimit"
              placeholder="Enter Voucher Limit"
              className="input-field"
            />
          </div>

          {/* Voucher Cost */}
          <div className="form-group">
            <label htmlFor="voucherCost">Voucher Cost</label>
            <input
              type="text"
              id="voucherCost"
              placeholder="Enter Cost in Points"
              className="input-field"
            />
          </div>

          {/* Voucher Codes */}
          <div className="form-group">
            <label htmlFor="voucherCodes">Upload Voucher Codes</label>
            <input type="file" id="voucherCodes" className="file-input" />
          </div>

          {/* Voucher Details */}
          <div className="form-group">
            <label htmlFor="voucherDetails">Voucher Details</label>
            <textarea
              id="voucherDetails"
              placeholder="Enter Voucher Details"
              className="textarea-field"
            ></textarea>
          </div>

          {/* Terms & Conditions */}
          <div className="form-group">
            <label htmlFor="voucherTerms">Voucher Terms & Conditions</label>
            <textarea
              id="voucherTerms"
              placeholder="Enter Terms & Conditions"
              className="textarea-field"
            ></textarea>
          </div>

          {/* Publish Button */}
          <button type="submit" className="publish-btn">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoucherAdd;
