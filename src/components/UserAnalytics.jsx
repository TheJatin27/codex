import React from "react";
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import Table from "./Table";

const UserAnalytics = () => {
  const columns = [
    { header: "ID", field: "id" },
    { header: "User Name", field: "userName" },
    { header: "Watch Time", field: "watchTime" },
    { header: "Points", field: "points" },
    { header: "Referrals", field: "referrals" },
  ];

  const data = [
    {
      id: "52",
      userName: "Akash",
      watchTime: "165Mins",
      points: "600 Points",
      referrals: "5 Referrals",
    },
    {
      id: "52",
      userName: "Akash",
      watchTime: "165Mins",
      points: "600 Points",
      referrals: "5 Referrals",
    },
    {
      id: "52",
      userName: "Akash",
      watchTime: "165Mins",
      points: "600 Points",
      referrals: "5 Referrals",
    },
    {
      id: "52",
      userName: "Akash",
      watchTime: "165Mins",
      points: "600 Points",
      referrals: "5 Referrals",
    },
    {
      id: "52",
      userName: "Akash",
      watchTime: "165Mins",
      points: "600 Points",
      referrals: "5 Referrals",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="w-full font-semibold font-Lato text-xl	mb-2">
          User Analytics - 680
        </div>
        <div className="flex justify-between">
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
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserAnalytics;
