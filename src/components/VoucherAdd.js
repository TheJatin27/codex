import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import "../VoucherPopup.css";
import { db } from "../firebase"; // Import Firestore instance

const VoucherAdd = ({ onClose, voucher, onSave }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [voucherCodes, setVoucherCodes] = useState([]);
  const [formData, setFormData] = useState({
    voucherName: "",
    voucherCategory: "fashion",
    voucherLimit: "",
    voucherCost: "",
    voucherDetails: "",
    voucherTerms: "",
  });

  // Pre-fill form for editing
  useEffect(() => {
    if (voucher) {
      setFormData({
        voucherName: voucher.voucherName || "",
        voucherCategory: voucher.voucherCategory || "fashion",
        voucherLimit: voucher.voucherLimit || "",
        voucherCost: voucher.voucherCost || "",
        voucherDetails: voucher.voucherDetails || "",
        voucherTerms: voucher.voucherTerms || "",
      });
      setUploadedImage(voucher.image || null);
      setVoucherCodes(voucher.voucherCodes || []);
    }
  }, [voucher]);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  // Handle CSV/Excel Upload and Parse
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: false,
        complete: (results) => {
          const codes = results.data
            .filter((row) => row[0]) // Ensure no empty rows
            .map((row) => ({
              code: row[0],
              redeemed: false,
            }));
          setVoucherCodes(codes);
        },
        error: (error) => {
          console.error("Error parsing file:", error);
        },
      });
    }
  };

  // Handle Form Input Changes
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const voucherData = {
      ...formData,
      voucherCodes,
      image: uploadedImage,
      timestamp: new Date().toISOString(),
    };

    if (voucher) {
      // Editing existing voucher
      try {
        const voucherRef = doc(db, "vouchers", voucher.id);
        await updateDoc(voucherRef, voucherData);
        alert("Voucher updated successfully!");
        onSave();
        onClose();
      } catch (error) {
        console.error("Error updating voucher:", error);
        alert("Failed to update voucher.");
      }
    } else {
      // Adding new voucher
      try {
        // Save to Firestore
        await addDoc(collection(db, "vouchers"), voucherData);
        alert("Voucher successfully added!");
        onClose();
      } catch (error) {
        console.error("Error adding voucher:", error);
        alert("Failed to add voucher.");
      }
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2 className="popup-title">{voucher ? "Edit Voucher" : "Add New Voucher"}</h2>

        {/* Form */}
        <form className="voucher-form" onSubmit={handleSubmit}>
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
              value={formData.voucherName}
              onChange={handleInputChange}
              placeholder="Enter Voucher Name"
              className="input-field"
            />
          </div>

          {/* Voucher Category */}
          <div className="form-group">
            <label htmlFor="voucherCategory">Voucher Category</label>
            <select
              id="voucherCategory"
              value={formData.voucherCategory}
              onChange={handleInputChange}
              className="input-field"
            >
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
              value={formData.voucherLimit}
              onChange={handleInputChange}
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
              value={formData.voucherCost}
              onChange={handleInputChange}
              placeholder="Enter Cost in Points"
              className="input-field"
            />
          </div>

          {/* Voucher Codes */}
          <div className="form-group">
            <label htmlFor="voucherCodes">Upload Voucher Codes</label>
            <input
              type="file"
              id="voucherCodes"
              accept=".csv"
              onChange={handleFileUpload}
              className="file-input"
            />
          </div>

          {/* Voucher Details */}
          <div className="form-group">
            <label htmlFor="voucherDetails">Voucher Details</label>
            <textarea
              id="voucherDetails"
              value={formData.voucherDetails}
              onChange={handleInputChange}
              placeholder="Enter Voucher Details"
              className="textarea-field"
            ></textarea>
          </div>

          {/* Terms & Conditions */}
          <div className="form-group">
            <label htmlFor="voucherTerms">Voucher Terms & Conditions</label>
            <textarea
              id="voucherTerms"
              value={formData.voucherTerms}
              onChange={handleInputChange}
              placeholder="Enter Terms & Conditions"
              className="textarea-field"
            ></textarea>
          </div>

          {/* Publish Button */}
          <button type="submit" className="publish-btn">
            {voucher ? "Update Voucher" : "Publish Voucher"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoucherAdd;
