import React, { useState, useEffect } from "react";
import Table from "./Table";
import VoucherAdd from "./VoucherAdd"; // Import the VoucherAdd popup component
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // Firestore functions
import { db } from "../firebase"; // Import Firestore instance

const Vouchers = () => {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [vouchers, setVouchers] = useState([]); // State to store fetched voucher data
  const [editingVoucher, setEditingVoucher] = useState(null); // State for editing voucher
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Fetch data from Firestore
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vouchers"));
        const fetchedVouchers = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include Firestore document ID
          ...doc.data(),
        }));
        setVouchers(fetchedVouchers);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleOpenPopup = (voucher = null) => {
    setEditingVoucher(voucher); // Set the voucher to edit or null for a new one
    setShowPopup(true); // Show popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup
    setEditingVoucher(null); // Reset editing state
  };

  const handleRemoveVoucher = async (id) => {
    try {
      await deleteDoc(doc(db, "vouchers", id));
      setVouchers((prev) => prev.filter((voucher) => voucher.id !== id)); // Update state
      alert("Voucher removed successfully!");
    } catch (error) {
      console.error("Error removing voucher:", error);
      alert("Failed to remove voucher.");
    }
  };

  const handleEditVoucher = async (id, updatedData) => {
    try {
      const voucherDoc = doc(db, "vouchers", id);
      await updateDoc(voucherDoc, updatedData);
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.id === id ? { ...voucher, ...updatedData } : voucher
        )
      ); // Update state
      alert("Voucher updated successfully!");
    } catch (error) {
      console.error("Error updating voucher:", error);
      alert("Failed to update voucher.");
    }
  };

  // Filter vouchers based on search input
  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.voucherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "Voucher ID", field: "id" },
    { header: "Voucher Name", field: "voucherName" },
    { header: "Voucher Category", field: "voucherCategory" },
    { header: "Voucher Cost", field: "voucherCost" },
    {
      header: "Vouchers Redeemed",
      render: (row) =>
        `${row.voucherCodes.filter((code) => code.redeemed).length}/${
          row.voucherCodes.length
        }`,
    },
    {
      header: "",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            onClick={() => handleOpenPopup(row)} // Pass voucher to edit
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
              onClick={() => handleOpenPopup()} // Open popup for new voucher
            >
              Add New Voucher
            </button>
            <Link to="/voucher-transactions">
              {/* <button className="ml-4 h-10 px-2 border bg-[#fff] text-[#9A02E2] border-[#9A02E2] rounded-lg hover:bg-[#f1f1f1] flex items-center">
                Voucher Transactions
              </button> */}
            </Link>
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
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
        <Table columns={columns} data={filteredVouchers} />
      </div>

      {/* Conditional rendering of the popup */}
      {showPopup && (
        <VoucherAdd
          onClose={handleClosePopup}
          voucher={editingVoucher} // Pass voucher to edit
          onSave={handleEditVoucher} // Save changes
        />
      )}
    </div>
  );
};

export default Vouchers;
