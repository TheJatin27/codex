import React from "react";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
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
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="flex gap-8">
          <div>
            <p>
              <strong>User ID:</strong> {user?.id || "N/A"}
            </p>
            <p>
              <strong>User Name:</strong> {user?.userName || "N/A"}
            </p>
            {/* <p>
              <strong>Date of Birth:</strong> {user?.dob || "N/A"}
            </p> */}
            <p>
              <strong>Age:</strong> {user?.age || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {user?.Gender || "N/A"}
            </p>
            <p>
              <strong>Phone Number:</strong> {user?.Phone || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {user?.Location || "N/A"}
            </p>
          </div>
          <div>
            <img
              src={user?.image ? user.image : "/profile.jpg"} // Default to profile.jpg if user.image is not available
              alt="User"
              className="rounded-lg object-cover w-40 h-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
