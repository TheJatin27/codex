import React, { useState } from "react";
import Table from "./Table";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import backArrow from "../assets/backArrow.svg";
import { Link } from "react-router-dom";
import WithdrawalPopup from "./WithdrawalPopup.jsx";

const WithdrawalRequests = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user data

  const columnsPending = [
    { header: "Trans ID", field: "transId" },
    { header: "User Name", field: "userName" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Requested Date", field: "requestedDate" },
    { header: "Payout Method", field: "payoutMethod" },
    { header: "Points", field: "points" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-[#9A02E2] text-white px-2 py-1 rounded-xl"
            onClick={() => handleViewDetails(row)}
          >
            View Details
          </button>
          <button className="bg-[#338401] text-white px-2 py-1 rounded-xl">
            Approve
          </button>
          <button className="bg-[#880000] text-white px-2 py-1 rounded-xl">
            Reject
          </button>
        </div>
      ),
    },
  ];
  const dataPending = [
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      requestedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    // Add more rows as needed
  ];

  const columnsApproved = [
    { header: "Trans ID", field: "transactionId" },
    { header: "User Name", field: "userName" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Approved Date", field: "approvedDate" },
    { header: "Payout Method", field: "payoutMethod" },
    { header: "Points", field: "points" },
    {
      header: "",
      render: (row) => (
        <button
          onClick={() => handleViewDetails(row)}
          className="bg-[#9A02E2] text-white px-2 py-1 rounded-xl"
        >
          View Details
        </button>
      ),
    },
  ];

  const dataApproved = [
    {
      transactionId: "#551248",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      approvedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transactionId: "#551249",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      approvedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transactionId: "#551250",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      approvedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transactionId: "#551251",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      approvedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
    {
      transactionId: "#551252",
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      approvedDate: "02/04/24",
      payoutMethod: "Bank Transfer",
      points: "600 Points",
    },
  ];

  const [isApproved, setIsApproved] = useState(true);

  const handleToggle = () => {
    setIsApproved(!isApproved);
  };

  const handleViewDetails = (userData) => {
    setSelectedUser(userData); // Set the selected user data
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="w-full font-semibold font-Lato text-xl	">
          Withdrawal Requests
        </div>
        <div className="flex justify-between my-4">
          <div className="bg-white px-2 rounded-3xl items-center flex">
            {" "}
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${
                isApproved ? "bg-purple-600 text-white" : "text-black"
              }`}
            >
              Approved
            </button>
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${
                !isApproved ? "bg-purple-600 text-white" : "text-black"
              }`}
            >
              Pending
            </button>
          </div>
          <div className="flex">
            <div className="relative flex justify-between ">
              <div className="relative">
                <img
                  src={search}
                  alt="Search Icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2  h-6"
                />
                <input
                  type="text"
                  placeholder=" Search Username"
                  className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="ml-4 px-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center">
                <div className="flex ">
                  <img src={filter} alt="" />
                  <span> Filter</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {isApproved ? (
          <Table columns={columnsApproved} data={dataApproved} />
        ) : (
          <Table columns={columnsPending} data={dataPending} />
        )}
        {isPopupOpen && selectedUser && (
          <WithdrawalPopup userData={selectedUser} closePopup={closePopup} />
        )}
      </div>
    </div>
  );
};

export default WithdrawalRequests;
