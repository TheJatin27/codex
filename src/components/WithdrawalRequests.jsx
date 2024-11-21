import React, { useState, useEffect } from "react";
import Table from "./Table";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import { db } from "../firebase"; // Import Firebase setup
import { collection, getDocs } from "firebase/firestore";
import WithdrawalPopup from "./WithdrawalPopup.jsx";

const WithdrawalRequests = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user data
  const [withdrawals, setWithdrawals] = useState([]); // State for storing withdrawals data
  const [isApproved, setIsApproved] = useState(true); // Toggle between approved and pending

  // Fetch data from Firestore on component mount
  useEffect(() => {
    const fetchWithdrawals = async () => {
      const withdrawalsCollection = collection(db, "Withdrawals");
      const snapshot = await getDocs(withdrawalsCollection);
      const withdrawalsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWithdrawals(withdrawalsList);
    };

    fetchWithdrawals();
  }, []);

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
            aria-label={`View details of ${row.userName}`}
          >
            View Details
          </button>
          <button
            className="bg-[#338401] text-white px-2 py-1 rounded-xl"
            aria-label={`Approve ${row.userName}'s request`}
          >
            Approve
          </button>
          <button
            className="bg-[#880000] text-white px-2 py-1 rounded-xl"
            aria-label={`Reject ${row.userName}'s request`}
          >
            Reject
          </button>
        </div>
      ),
    },
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
          aria-label={`View details of ${row.userName}`}
        >
          View Details
        </button>
      ),
    },
  ];

  // Filter data by status
  const dataPending = withdrawals.filter(
    (withdrawal) => withdrawal.status === "Pending"
  );

  const dataApproved = withdrawals.filter(
    (withdrawal) => withdrawal.status === "Approved"
  );

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
        <div className="w-full font-semibold font-Lato text-xl">
          Withdrawal Requests
        </div>
        <div className="flex justify-between my-4">
          <div className="bg-white px-2 rounded-3xl items-center flex">
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${
                isApproved ? "bg-purple-600 text-white" : "text-black"
              }`}
              aria-label="Show approved requests"
            >
              Approved
            </button>
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${
                !isApproved ? "bg-purple-600 text-white" : "text-black"
              }`}
              aria-label="Show pending requests"
            >
              Pending
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
                  placeholder="Search Username"
                  className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Search for a username"
                />
              </div>
              <button
                className="ml-4 px-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center"
                aria-label="Filter withdrawal requests"
              >
                <div className="flex">
                  <img
                    src={filter}
                    alt="Filter Icon"
                    className="h-4 mr-2"
                  />
                  <span>Filter</span>
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
