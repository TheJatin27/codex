import React from "react";

const AdDetailsModal = ({ isOpen, onClose, adDetails }) => {
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
              <strong>Brand Name:</strong> {adDetails.brandName || "N/A"}
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
              <strong>Specific Advertise:</strong> {adDetails.specific || "N/A"}
            </p>

            {/* Approve and Reject Buttons */}
            {adDetails.status !== "approved" && (
              <div className="flex gap-4 mt-4">
                <button className="px-4 py-2 bg-purple-500 text-white rounded-md">
                  Approve
                </button>
                <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md">
                  Reject
                </button>
              </div>
            )}
          </div>

          {/* Ad Preview */}
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
