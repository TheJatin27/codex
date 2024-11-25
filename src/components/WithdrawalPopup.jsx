import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path to your Firebase config

const WithdrawalPopup = ({ userData, closePopup }) => {
  const [withdrawalDetails, setWithdrawalDetails] = useState(null);

  // Fetch details from Firestore
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const docRef = doc(db, "Withdrawls", userData.transId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setWithdrawalDetails(docSnapshot.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching withdrawal details:", error);
      }
    };

    fetchDetails();
  }, [userData.transId]);

  if (!withdrawalDetails) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
          <button
            onClick={closePopup}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Withdrawal Request:</h2>

        <div className="mb-2">
          <span className="font-semibold">User Name: </span>{" "}
          {withdrawalDetails.holderName || "N/A"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Points: </span>{" "}
          {withdrawalDetails.amount || "N/A"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Phone Number: </span>{" "}
          {withdrawalDetails.phoneNumber || "N/A"}
        </div>

        {withdrawalDetails.type === "Bank Transfer" && (
          <div>
            <div className="mb-2">
              <span className="font-semibold">Account Details:</span> (Bank Transfer)
            </div>
            <div className="bg-[#D9D9D9] rounded-lg p-3 mt-3 text-sm">
              <div>
                <span className="font-semibold">Account Number:</span>{" "}
                {withdrawalDetails.holderAccountNumber || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Holder Name:</span>{" "}
                {withdrawalDetails.holderName || "N/A"}
              </div>
              <div>
                <span className="font-semibold">IFSC Code:</span>{" "}
                {withdrawalDetails.ifscCode || "N/A"}
              </div>
            </div>
          </div>
        )}

        {withdrawalDetails.type === "UPI" && (
          <div className="mb-2">
            <span className="font-semibold">UPI ID:</span>{" "}
            {withdrawalDetails.upiID || "N/A"}
          </div>
        )}

        {withdrawalDetails.status === "approved" && (
          <div className="mt-4 text-black text-sm text-center">
            Approved on{" "}
            {new Date(withdrawalDetails.date).toLocaleString() || "N/A"}
          </div>
        )}

        {withdrawalDetails.adminComment && (
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">Admin Comment:</span>{" "}
            {withdrawalDetails.adminComment}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalPopup;
