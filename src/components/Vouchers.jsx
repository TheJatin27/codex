import React, { useState } from "react";
import Table from "./Table";
import VoucherAdd from "./VoucherAdd"; // Import the VoucherAdd popup component
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import { Link } from "react-router-dom";

const Vouchers = () => {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  const handleOpenPopup = () => {
    setShowPopup(true); // Show popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup
  };

  const columns = [
    { header: "Voucher ID", field: "voucherId" },
    { header: "Voucher Name", field: "voucherName" },
    { header: "Voucher Category", field: "voucherCategory" },
    { header: "Voucher Cost", field: "voucherCost" },
    { header: "Vouchers Redeemed", field: "vouchersRedeemed" },
    {
      header: "",
      render: (row) => (
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
            Edit Voucher
          </button>
          <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-100">
            Remove
          </button>
        </div>
      ),
    },
  ];

  const vouchers = [
    {
      voucherId: 52,
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherCost: "600 Points",
      vouchersRedeemed: "50/100",
    },
    // Add more voucher data as needed
  ];

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Vouchers</h1>
            <button
              className="ml-4 h-10 px-2 bg-[#9A02E2] text-white rounded-lg hover:bg-purple-600 flex items-center"
              onClick={handleOpenPopup} // Open popup on click
            >
              Add New Voucher
            </button>
            <Link to="/voucher-transactions">
              <button className="ml-4 h-10 px-2 border bg-[#fff] text-[#9A02E2] border-[#9A02E2] rounded-lg hover:bg-[#f1f1f1] flex items-center">
                Voucher Transactions
              </button>
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
        <Table columns={columns} data={vouchers} />
      </div>

      {/* Conditional rendering of the popup */}
      {showPopup && <VoucherAdd onClose={handleClosePopup} />}
    </div>
  );
};

export default Vouchers;
