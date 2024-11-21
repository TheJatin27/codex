import React from "react";
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import Table from "./Table";

const Transaction = () => {
  const columns = [
    { header: "Trans ID", field: "TransId" },
    { header: "Brand Name", field: "brandName" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Industry", field: "industry" },
    {
      header: "Amount",
      field: "amount",
      render: (row) => (
        <div className="flex items-center">
          {"₹"}
          {row.amount}
        </div>
      ),
    },
    { header: "Date & Time", field: "dateTime" },
  ];

  const data = [
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
    {
      TransId: "52",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      amount: "600",
      dateTime: "02/06/24",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-4">Transactions</h1>
          <div className="relative flex justify-between mb-4">
            <div className="relative">
              <img
                src={search}
                alt="Search Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2  h-6"
              />
              <input
                type="text"
                placeholder="Search ID"
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

export default Transaction;
