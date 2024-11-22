import React, { useState, useEffect } from "react";
import Table from "./Table";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firebase config here
import WithdrawlsPopup from "./WithdrawalPopup";

const WithdrawlsRequests = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isApproved, setIsApproved] = useState(true); 
  const [dataPending, setDataPending] = useState([]);
  const [dataApproved, setDataApproved] = useState([]);

  const columnsPending = [
    { header: "Trans ID", field: "transId" },
    { header: "User Name", field: "holderName" },
    { header: "Phone Number", field: "phoneNumber" }, // Assuming you add this field
    { header: "Requested Date", field: "date" },
    { header: "Payout Method", field: "type" },
    { header: "Points", field: "amount" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-[#9A02E2] text-white px-2 py-1 rounded-xl"
            onClick={() => handleViewDetails(row)}
            aria-label={`View details of ${row.holderName}`}
          >
            View Details
          </button>
          <button
            className="bg-[#338401] text-white px-2 py-1 rounded-xl"
            aria-label={`Approve ${row.holderName}'s request`}
          >
            Approve
          </button>
          <button
            className="bg-[#880000] text-white px-2 py-1 rounded-xl"
            aria-label={`Reject ${row.holderName}'s request`}
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  const columnsApproved = [
    { header: "Trans ID", field: "transId" },
    { header: "User Name", field: "holderName" },
    { header: "Phone Number", field: "phoneNumber" }, // Assuming you add this field
    { header: "Approved Date", field: "date" },
    { header: "Payout Method", field: "type" },
    { header: "Points", field: "amount" },
    {
      header: "",
      render: (row) => (
        <button
          onClick={() => handleViewDetails(row)}
          className="bg-[#9A02E2] text-white px-2 py-1 rounded-xl"
          aria-label={`View details of ${row.holderName}`}
        >
          View Details
        </button>
      ),
    },
  ];

  const fetchWithdrawls = async () => {
    try {
      const q = query(collection(db, "Withdrawls"));
      const querySnapshot = await getDocs(q);

      const pending = [];
      const approved = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const Withdrawls = {
          transId: doc.id, // Using document ID as transaction ID
          holderName: data.holderName || "NA",
          phoneNumber: data.phoneNumber || "NA", // Update based on available fields
          date: data.date || "NA",
          type: data.type || "NA",
          amount: data.amount || "NA",
          status: data.status || "NA",
        };

        if (Withdrawls.status === "approved") {
          approved.push(Withdrawls);
        } else {
          pending.push(Withdrawls);
        }
      });

      setDataPending(pending);
      setDataApproved(approved);
    } catch (error) {
      console.error("Error fetching Withdrawls:", error);
    }
  };

  useEffect(() => {
    fetchWithdrawls();
  }, []);

  const handleToggle = () => {
    setIsApproved(!isApproved);
  };

  const handleViewDetails = (userData) => {
    setSelectedUser(userData);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="w-full font-semibold font-Lato text-xl">
          Withdrawls Requests
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
        </div>
        {isApproved ? (
          <Table columns={columnsApproved} data={dataApproved} />
        ) : (
          <Table columns={columnsPending} data={dataPending} />
        )}
        {isPopupOpen && selectedUser && (
          <WithdrawlsPopup userData={selectedUser} closePopup={closePopup} />
        )}
      </div>
    </div>
  );
};

export default WithdrawlsRequests;
