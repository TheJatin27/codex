import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firebase config
import search from "../assets/search.svg";
import Table from "./Table";
import UserDetailsModal from "./UserDetailsModal.jsx";

// Edit User Modal
const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [userName, setUserName] = useState(user?.userName || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [location, setLocation] = useState(user?.location || "");

  const handleSave = async () => {
    const updatedUser = { userName, dob, location };
    onSave(updatedUser); // Pass the updated user data
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit User Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div>
          <label className="block mb-2">User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <label className="block mb-2">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <label className="block mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="w-full bg-purple-500 text-white rounded-md py-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const headers = [
    { header: "ID", field: "id" },
    { header: "User Name", field: "userName" },
    { header: "Email", field: "Email" },
    { header: "Phone Number", field: "Phone" },
    { header: "Gender", field: "Gender" },
    { header: "Age", field: "age" },
    { header: "Points", field: "points" },
    {
      header: "",
      render: (row) => (
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            onClick={() => {
              setSelectedUser(row);
              setIsModalOpen(true);
            }}
          >
            View Details
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            onClick={() => {
              setSelectedUser(row);
              setIsEditModalOpen(true);
            }}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  const handleSaveEditedUser = async (updatedUser) => {
    try {
      const userRef = doc(db, "users", selectedUser.id);
      await updateDoc(userRef, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...updatedUser } : user
        )
      );
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-4">User Details</h1>
          <div className="relative flex justify-between mb-4">
            <div className="relative">
              <img
                src={search}
                alt="Search Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6"
              />
              <input
                type="text"
                placeholder=" Search Username"
                className="pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
        <Table columns={headers} data={users} />
      </div>
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveEditedUser}
      />
    </div>
  );
};

export default UserDetails;
