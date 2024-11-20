import React from "react";
// import image from "./image.png"; // Path to the uploaded image

const AdDetailsModal = ({ isOpen, onClose, adDetails }) => {
  if (!isOpen) return null;

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
              <strong>Ad Name:</strong> {adDetails.adName}
            </p>
            <p>
              <strong>Brand Name:</strong> {adDetails.brandName}
            </p>
            <p>
              <strong>Ad Type:</strong> Image
            </p>
            <p>
              <strong>Daily Budget:</strong> ₹{adDetails.budget}
            </p>
            <p>
              <strong>Ad Duration:</strong> {adDetails.duration}
            </p>
            <p>
              <strong>Specific Advertise:</strong> Location
            </p>
            <div className="flex gap-4 mt-4">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-md">
                Approve
              </button>
              <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md">
                Reject
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ad Preview:</h3>
            {/* <img
              src={image}
              alt="Ad Preview"
              className="rounded-lg object-cover w-40 h-40"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailsModal;
