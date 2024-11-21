import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Update with your Firebase initialization file
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import Table from "./Table";

const UserAnalytics = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { header: "User Name", field: "userName" },
    { header: "Email", field: "Email" },
    { header: "Gender", field: "Gender" },
    { header: "Points", field: "points" },
    { header: "Watch Time", field: "watchTime" },
    { header: "Referrals", field: "referal" },
  ];

  // Fetch data from Firestore and calculate Watch Time
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map((doc) => {
          const userData = doc.data();
          const watchTime = (userData.referal || 0) * 7; // Calculate watch time
          return {
            id: doc.id,
            ...userData,
            watchTime, // Add calculated field
          };
        });
        setData(users);
        setFilteredData(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = data.filter((user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="w-full font-semibold font-Lato text-xl mb-2">
          User Analytics - {filteredData.length}
        </div>
        <div className="flex justify-between">
          <div className="relative flex justify-between mb-4">
            <div className="relative">
              <img
                src={search}
                alt="Search Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6"
              />
              <input
                type="text"
                placeholder="Search Username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="ml-4 p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 flex items-center">
              <div className="flex">
                <img src={filter} alt="Filter Icon" />
                <span> Filter</span>
              </div>
            </button>
          </div>
        </div>
        <Table columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default UserAnalytics;
