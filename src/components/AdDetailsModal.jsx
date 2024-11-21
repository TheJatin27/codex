import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Firebase config import

const AdDetailsModal = ({ isOpen, onClose }) => {
  const [adDetails, setAdDetails] = useState(null);

  useEffect(() => {
    // Fetch the ad details from Firestore when the modal is open
    if (isOpen) {
      const fetchAdDetails = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "ads"));
          querySnapshot.forEach((doc) => {
            const adData = doc.data();
            console.log("Fetched Ad Data:", adData);  // Debug log to check the data
            setAdDetails(adData); // Set data for the first ad, or handle multiple ads
          });
        } catch (error) {
          console.error("Error fetching ad details: ", error);
        }
      };

      fetchAdDetails();
    }
  }, [isOpen]);

  // If modal is closed or no ad details fetched, don't render the modal
  if (!isOpen || !adDetails) return null;

  // Log the status value to ensure it's being set correctly
  console.log("Ad Status:", adDetails.status); // Debug log to check the status field

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-black text-lg"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Ad Details</h2>
        <div className="flex gap-8">
          <div>
            <p>
              <strong>Ad Name:</strong> {adDetails.adName || "N/A"}
            </p>
            <p>
              <strong>Brand Name:</strong> {adDetails.brandName || "N/A"}
            </p>
            <p>
              <strong>Ad Type:</strong> {adDetails.adType || "N/A"}
            </p>
            <p>
              <strong>Daily Budget:</strong> ₹{adDetails.dailyBudget || 0}
            </p>
            <p>
              <strong>Specific Advertise:</strong> {adDetails.specific || "N/A"}
            </p>

            {/* Conditionally render the approve/reject buttons based on status */}
            {adDetails.status === "pending" && (
              <div className="flex gap-4 mt-4">
                <button className="px-4 py-2 bg-purple-500 text-white rounded-md">
                  Approve
                </button>
                <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md">
                  Reject
                </button>
              </div>
            )}

            {/* If status is approved, the buttons will not be rendered */}
            {adDetails.status === "approved" && (
              <p className="text-green-500 mt-4">This ad is already approved</p>
            )}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ad Preview:</h3>
            {adDetails.adFile ? (
              <img
                src={adDetails.adFile}
                alt="Ad Preview"
                className="rounded-lg object-cover w-40 h-40"
              />
            ) : (
              <p>No Preview Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailsModal;
