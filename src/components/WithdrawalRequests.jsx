import React, { useState, useEffect } from "react";
import Table from "./Table";
import WithdrawlsPopup from "./WithdrawalPopup";
import { collection, getDocs, query, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firebase config here

const WithdrawlsRequests = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isApproved, setIsApproved] = useState(true);
  const [dataPending, setDataPending] = useState([]);
  const [dataApproved, setDataApproved] = useState([]);

  const columnsPending = [
    { header: "Trans ID", field: "transId" },
    { header: "User Name", field: "holderName" },
    { header: "Phone Number", field: "phoneNumber" },
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
            onClick={() => handleApprove(row.transId)}
            aria-label={`Approve ${row.holderName}'s request`}
          >
            Approve
          </button>
          <button
            className="bg-[#880000] text-white px-2 py-1 rounded-xl"
            onClick={() => handleReject(row.transId)}
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
    { header: "Phone Number", field: "phoneNumber" },
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
          transId: doc.id,
          holderName: data.holderName || "NA",
          phoneNumber: data.phoneNumber || "NA",
          date: data.date || "NA",
          type: data.type || "NA",
          amount: data.amount || "NA",
          status: data.status || "NA",
          userId: data.userId || "NA",
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

  const handleApprove = async (transId) => {
    try {
      const docRef = doc(db, "Withdrawls", transId);
      await updateDoc(docRef, { status: "approved" });

      // Update local state
      const approvedItem = dataPending.find((item) => item.transId === transId);
      setDataPending(dataPending.filter((item) => item.transId !== transId));
      setDataApproved([...dataApproved, { ...approvedItem, status: "approved" }]);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (transId) => {
    try {
      // Find the withdrawal request to get the userId and amount
      const rejectedItem = dataPending.find((item) => item.transId === transId);

      if (rejectedItem) {
        const { userId, amount } = rejectedItem;

        // Fetch the user's current points
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const currentPoints = userData.points || 0;

          // Update the user's points
          const updatedPoints = currentPoints + parseFloat(amount);
          await updateDoc(userDocRef, { points: updatedPoints });
        } else {
          console.error(`User document not found for userId: ${userId}`);
        }

        // Update the withdrawal status to "rejected"
        const docRef = doc(db, "Withdrawls", transId);
        await updateDoc(docRef, { status: "rejected" });

        // Update local state
        setDataPending(dataPending.filter((item) => item.transId !== transId));
      } else {
        console.error(`Withdrawal request not found for transId: ${transId}`);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
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
