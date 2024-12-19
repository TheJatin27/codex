import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { collection, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import "../VoucherPopup.css";
import { db } from "../firebase"; // Import Firestore instance

const VoucherAdd = ({ onClose, voucher, onSave }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [voucherCodes, setVoucherCodes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    voucherName: "", // We'll keep this for UI purposes, but the value will be based on categoryId
    points: "",
    termsAndConditions: "",
    brandName: "",
    offer: "",
    categoryId: "", // Category ID that will be passed to Firestore
  });

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categorySnapshot = await getDocs(collection(db, "VoucherCategory"));
        const fetchedCategories = categorySnapshot.docs.map((doc) => ({
          id: doc.id, // Fetch the document ID as the category ID
          name: doc.data().name,
        }));
        setCategories(fetchedCategories);

        // If editing a voucher, set the selected categoryId
        if (voucher) {
          setFormData((prev) => ({
            ...prev,
            categoryId: voucher.categoryId || "", // Set categoryId for editing
            voucherCategory: voucher.voucherCategory || "", // Set category name for display in UI
          }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [voucher]);

  // Pre-fill form for editing
  useEffect(() => {
    if (voucher) {
      setFormData({
        voucherName: voucher.voucherName || "",
        voucherCategory: voucher.voucherCategory || "",
        points: voucher.points || "",
        termsAndConditions: voucher.termsAndConditions || "",
        brandName: voucher.brandName || "",
        offer: voucher.offer || "",
        categoryId: voucher.categoryId || "", // Added categoryId for editing
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
              isUsed: false, // Renamed "redeemed" to "isUsed"
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

    // Retrieve category name based on categoryId
    const selectedCategory = categories.find(
      (category) => category.id === formData.categoryId
    );
    const categoryName = selectedCategory ? selectedCategory.name : "";

    // Prepare the voucher data
    const voucherData = {
      ...formData,
      voucherCodes: voucherCodes.map((code) => ({
        ...code,
        isUsed: code.isUsed, // Ensure isUsed field is sent
      })),
      image: uploadedImage,
      timestamp: new Date().toISOString(),
      eligibleProducts: categoryName, // Send category name as eligibleProducts
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
          {/* Brand Image Upload Section */}
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
                  <p>Upload Brand Image</p>
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

          {/* Brand Name */}
          <div className="form-group">
            <label htmlFor="brandName">Brand Name</label>
            <input
              type="text"
              id="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              placeholder="Enter Brand Name"
              className="input-field"
            />
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

          {/* Eligible Products (Category Dropdown) */}
          <div className="form-group">
            <label htmlFor="voucherCategory">Eligible Products</label>
            <select
              id="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden Category ID */}
          <input
            type="hidden"
            id="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
          />

          {/* Voucher Points */}
          <div className="form-group">
            <label htmlFor="points">Voucher Points</label>
            <input
              type="text"
              id="points"
              value={formData.points}
              onChange={handleInputChange}
              placeholder="Enter Points"
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

          {/* Offer Section */}
          <div className="form-group">
            <label htmlFor="offer">Offer</label>
            <textarea
              id="offer"
              value={formData.offer}
              onChange={handleInputChange}
              placeholder="Enter Offer Details"
              className="textarea-field"
            ></textarea>
          </div>

          {/* Terms & Conditions */}
          <div className="form-group">
            <label htmlFor="termsAndConditions">Voucher Terms & Conditions</label>
            <textarea
              id="termsAndConditions"
              value={formData.termsAndConditions}
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
