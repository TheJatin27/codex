import React, { useState } from "react";
import Table from "./Table";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import pen from "../assets/pen.svg";
import AdDetailsModal from "./AdDetailsModal.jsx";

const AdManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const columnsPending = [
    { header: "AD ID", field: "adId" },
    { header: "Ad Name", field: "adName" },
    { header: "Brand Name", field: "brandName" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Industry", field: "industry" },
    {
      header: "",
      field: "viewButton",
      render: (row) => (
        <button
          className="bg-purple-500 text-white px-3 py-1 rounded-full"
          onClick={() => {
            setSelectedAd(row); // Set the selected ad data
            setIsModalOpen(true); // Open the modal
          }}
        >
          View
        </button>
      ),
    },
  ];
  const dataPending = [
    {
      adId: 55,
      adName: "Discount Ad",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Fashion",
    },
    {
      adId: 55,
      adName: "Discount Ad",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Fashion",
    },
    {
      adId: 55,
      adName: "Discount Ad",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Fashion",
    },
    {
      adId: 55,
      adName: "Discount Ad",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Fashion",
    },
    {
      adId: 55,
      adName: "Discount Ad",
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Fashion",
    },
  ];

  const columnsApproved = [
    { header: "ID", field: "id" },
    { header: "Brand Name", field: "brandName" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Industry", field: "industry" },
    {
      header: "Wallet Balance",
      field: "walletBalance",
      render: (row) => (
        <div className="flex items-center">
          {" "}
          {row.walletBalance}
          <img src={pen} className="h-6 ml-2" alt="" />
        </div>
      ),
    },
    {
      header: "", // For the "View Details" button
    },
    { header: "Status", field: "status" },
  ];

  const dataApproved = [
    {
      id: 54,
      brandName: "Codexcelerate",
      phoneNumber: "+91 9876543210",
      industry: "Automobile",
      walletBalance: "₹600",
      status: "Approved",
    },
    {
      id: 55,
      brandName: "Codexpress",
      phoneNumber: "+91 9876541234",
      industry: "Tech",
      walletBalance: "₹750",
      status: "Pending",
    },
    {
      id: 56,
      brandName: "InnoTech",
      phoneNumber: "+91 9123456789",
      industry: "Healthcare",
      walletBalance: "₹500",
      status: "Rejected",
    },
    {
      id: 57,
      brandName: "DriveFast",
      phoneNumber: "+91 9988776655",
      industry: "Automobile",
      walletBalance: "₹1000",
      status: "Approved",
    },
    {
      id: 58,
      brandName: "QuickCode",
      phoneNumber: "+91 9098765432",
      industry: "Tech",
      walletBalance: "₹450",
      status: "Pending",
    },
  ];

  const [isApproved, setIsApproved] = useState(true);

  const handleToggle = () => {
    setIsApproved(!isApproved);
  };
  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="w-full font-semibold font-Lato text-xl	">
          Ads Management{" "}
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-white px-2 rounded-3xl items-center flex">
            {" "}
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${
                isApproved ? "bg-purple-600 text-white" : "text-black"
              }`}
            >
              Pending
            </button>
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${
                !isApproved ? "bg-purple-600 text-white" : "text-black"
              }`}
            >
              Approved Ads
            </button>
          </div>

          <div className="flex">
            <div className="relative flex justify-between ">
              <div className="relative">
                <img
                  src={search}
                  alt="Search Icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2  h-6"
                />
                <input
                  type="text"
                  placeholder="Search Brandname, Username, Phone"
                  className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="ml-4 px-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center">
                <div className="flex ">
                  <img src={filter} alt="" />
                  <span> Filter</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {isApproved ? (
          <Table columns={columnsPending} data={dataPending} />
        ) : (
          <Table columns={columnsPending} data={dataPending} />
        )}

        {selectedAd && (
          <AdDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            adDetails={selectedAd}
          />
        )}
      </div>
    </div>
  );
};

export default AdManagement;
