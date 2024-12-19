import React, { useState, useEffect } from "react";
import Table from "./Table";
import VoucherAdd from "./VoucherAdd"; // Import the VoucherAdd popup component
import AddCategoryPopup from "./AddCategoryPopup"; // Import AddCategoryPopup
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; // Firestore functions
import { db } from "../firebase"; // Import Firestore instance

const Vouchers = () => {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [showCategoryPopup, setShowCategoryPopup] = useState(false); // State for category popup
  const [vouchers, setVouchers] = useState([]); // State to store fetched voucher data
  const [editingVoucher, setEditingVoucher] = useState(null); // State for editing voucher
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Fetch data from Firestore
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vouchers"));
        const fetchedVouchers = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Ensure to use Firestore doc ID
          ...doc.data(), // Spread the document data
        }));
        setVouchers(fetchedVouchers); // Set fetched vouchers in state
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers(); // Fetch vouchers when component mounts
  }, []);

  const handleOpenPopup = (voucher = null) => {
    setEditingVoucher(voucher); // Set voucher for editing or null for new
    setShowPopup(true); // Open the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
    setEditingVoucher(null); // Reset editing voucher
  };

  const handleRemoveVoucher = async (id) => {
    try {
      await deleteDoc(doc(db, "vouchers", id)); // Delete voucher from Firestore
      setVouchers((prev) => prev.filter((voucher) => voucher.id !== id)); // Remove from local state
      alert("Voucher removed successfully!"); // Success message
    } catch (error) {
      console.error("Error removing voucher:", error);
      alert("Failed to remove voucher."); // Error message
    }
  };

  const handleEditVoucher = async (id, updatedData) => {
    try {
      const voucherDoc = doc(db, "vouchers", id); // Get Firestore document reference
      await updateDoc(voucherDoc, updatedData); // Update the voucher
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.id === id ? { ...voucher, ...updatedData } : voucher // Update in local state
        )
      );
      alert("Voucher updated successfully!"); // Success message
    } catch (error) {
      console.error("Error updating voucher:", error);
      alert("Failed to update voucher."); // Error message
    }
  };

  const handleCategoryAdded = (newCategory) => {
    // Handle the addition of new categories (if needed)
    console.log("New category added:", newCategory);
  };

  // Filter vouchers based on search term
  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.voucherName?.toLowerCase().includes(searchTerm.toLowerCase()) // Case insensitive search
  );

  const columns = [
    { header: "Voucher ID", field: "id" },
    { header: "Voucher Name", field: "voucherName" },
    { header: "Voucher Category", field: "eligibleProducts" },
    { header: "Voucher Cost", field: "points" },
    {
      header: "Vouchers Redeemed",
      render: (row) =>
        `${row.voucherCodes?.filter((code) => code.redeemed).length || 0}/${
          row.voucherCodes?.length || 0
        }`,
    },
    {
      header: "",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            onClick={() => handleOpenPopup(row)} // Open popup for editing
          >
            Edit Voucher
          </button>
          <button
            className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-100"
            onClick={() => handleRemoveVoucher(row.id)} // Remove voucher
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Vouchers</h1>
            <button
              className="ml-4 h-10 px-2 bg-[#9A02E2] text-white rounded-lg hover:bg-purple-600 flex items-center"
              onClick={() => handleOpenPopup()} // Open popup to add new voucher
            >
              Add New Voucher
            </button>
            <button
              className="ml-4 h-10 px-2 bg-[#9A02E2] text-white rounded-lg hover:bg-purple-600 flex items-center"
              onClick={() => setShowCategoryPopup(true)} // Open category popup
            >
              Add Category
            </button>
          </div>
          <div className="flex">
            <div className="relative flex justify-between">
              <div className="relative">
                <img
                  src={search}
                  alt="Search Icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6"
                />
                <input
                  type="text"
                  placeholder="Search Voucher"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Set search term
                  className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="ml-4 px-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center">
                <div className="flex">
                  <img src={filter} alt="Filter Icon" />
                  <span> Filter</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <Table columns={columns} data={filteredVouchers} /> {/* Pass filtered vouchers to table */}
      </div>

      {showPopup && (
        <VoucherAdd
          onClose={handleClosePopup}
          voucher={editingVoucher}
          onSave={handleEditVoucher}
        />
      )}

      {showCategoryPopup && (
        <AddCategoryPopup
          onClose={() => setShowCategoryPopup(false)} // Close category popup
          onCategoryAdded={handleCategoryAdded}
        />
      )}
    </div>
  );
};

export default Vouchers;
