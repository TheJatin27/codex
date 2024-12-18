import React, { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"; // Import necessary Firestore methods
import { db } from "../firebase"; // Import Firebase configuration

const AdDetailsModal = ({ isOpen, onClose, adDetails, onStatusChange }) => {
  const [brandName, setBrandName] = useState("N/A"); // State to store the brand name
  const [specificAdvertise, setSpecificAdvertise] = useState("N/A"); // State to store the specific advertise type

  // Fetch brand name and determine specific advertise type
  useEffect(() => {
    const fetchBrandNameAndSpecificAdvertise = async () => {
      if (!adDetails) return;

      // Fetch brand name from "Brands" collection
      if (adDetails.brandId) {
        try {
          const brandDocRef = doc(db, "Brands", adDetails.brandId);
          const brandDoc = await getDoc(brandDocRef);
          if (brandDoc.exists()) {
            setBrandName(brandDoc.data().brandName || "N/A");
          } else {
            setBrandName("N/A");
          }
        } catch (error) {
          console.error("Error fetching brand name:", error);
          setBrandName("N/A");
        }
      }

      // Determine specific advertise type
      if (Array.isArray(adDetails.email) && adDetails.email.length > 0) {
        setSpecificAdvertise("Email");
      } else if (Array.isArray(adDetails.phone) && adDetails.phone.length > 0) {
        setSpecificAdvertise("Phone");
      } else {
        setSpecificAdvertise("N/A");
      }
    };

    fetchBrandNameAndSpecificAdvertise();
  }, [adDetails]);

  // Update ad status
  const updateStatus = async (status) => {
    try {
      const adDocRef = doc(db, "ads", adDetails.adId);
      await updateDoc(adDocRef, { status });

      if (onStatusChange) onStatusChange(status);

      onClose();
      console.log(`Ad successfully ${status}.`);
    } catch (error) {
      console.error(`Error updating ad status to ${status}:`, error);
      alert(`Failed to update the ad status to ${status}. Please try again.`);
    }
  };

  // Delete ad
  const deleteAd = async () => {
    try {
      if (!adDetails.adId) {
        alert("Ad ID is missing. Cannot delete the ad.");
        return;
      }

      const adDocRef = doc(db, "ads", adDetails.adId);
      await deleteDoc(adDocRef);

      if (onStatusChange) onStatusChange("deleted");

      onClose();
      alert("Ad successfully deleted.");
    } catch (error) {
      console.error("Error deleting the ad:", error);
      alert("Failed to delete the ad. Please try again.");
    }
  };

  if (!isOpen || !adDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-black text-lg"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-4">Ad Details</h2>

        {/* Ad Details */}
        <div className="flex gap-8">
          <div>
            <p>
              <strong>Ad Name:</strong> {adDetails.adName || "N/A"}
            </p>
            <p>
              <strong>Brand Name:</strong> {brandName}
            </p>
            <p>
              <strong>Ad Type:</strong> {adDetails.adType || "N/A"}
            </p>
            <p>
              <strong>Daily Budget:</strong> ₹{adDetails.dailyBudget || 0}
            </p>
            <p>
              <strong>Status:</strong> {adDetails.status || "N/A"}
            </p>
            <p>
              <strong>Specific Advertise:</strong> {specificAdvertise}
            </p>

            {/* Conditional Buttons */}
            {adDetails.status === "approved" ? (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateStatus("Paused")}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md"
                >
                  Pause
                </button>
                <button
                  onClick={deleteAd}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md"
                >
                  Delete
                </button>
              </div>
            ) : adDetails.status === "Paused" ? (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateStatus("approved")}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md"
                >
                  Resume
                </button>
                <button
                  onClick={deleteAd}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateStatus("approved")}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus("rejected")}
                  className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md"
                >
                  Reject
                </button>
              </div>
            )}
          </div>

          {/* Ad Preview */}
          <div>
            <h3 className="font-semibold mb-2">Ad Preview:</h3>
            {adDetails.adImage ? (
              <img
                src={adDetails.adImage}
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
