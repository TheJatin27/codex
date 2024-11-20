import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firebase config
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import Table from "./Table";
import UserDetailsModal from "./UserDetailsModal.jsx";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
    { header: "Date of Birth", field: "dob" },
    { header: "Gender", field: "Gender" },
    { header: "Age", field: "Age" },
    { header: "Points", field: "points" },
    {
      header: "",
      render: (row) => (
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          onClick={() => {
            setSelectedUser(row);
            setIsModalOpen(true);
          }}
        >
          View Details
        </button>
      ),
    },
  ];

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
                className="absolute left-3 top-1/2 transform -translate-y-1/2  h-6"
              />
              <input
                type="text"
                placeholder=" Search Username"
                className="pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="ml-4 p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 flex items-center">
              <div className="flex">
                <img src={filter} alt="" />
                <span> Filter</span>
              </div>
            </button>
          </div>
        </div>
        <Table columns={headers} data={users} />
      </div>
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserDetails;
