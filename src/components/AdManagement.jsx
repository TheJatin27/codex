import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Firebase config import
import Table from "./Table";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import AdDetailsModal from "./AdDetailsModal.jsx";

const AdManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [pendingAds, setPendingAds] = useState([]); // Ads with 'pending' status
  const [approvedAds, setApprovedAds] = useState([]); // Ads with 'approved' status
  const [isApproved, setIsApproved] = useState(true); // Toggle between Pending and Approved

  // Table columns setup
  const columns = [
    { header: "AD ID", field: "adId" },
    { header: "Ad Name", field: "adName" },
    { header: "Brand Name", field: "brandName" },
    { header: "Phone", field: "phone" },
    { header: "Industry", field: "industry" },
    {
      header: "",
      field: "viewButton",
      render: (row) => (
        <button
          className="bg-purple-500 text-white px-3 py-1 rounded-full"
          onClick={() => {
            setSelectedAd(row); // Pass the full ad data to the modal
            setIsModalOpen(true); // Open the modal
          }}
        >
          View
        </button>
      ),
    },
  ];

  // Fetch ads data from Firestore
  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ads"));
        const pendingList = [];
        const approvedList = [];

        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const ad = {
            adId: doc.id,
            adName: data.adName || "N/A",
            brandName: data.brandName || "N/A",
            phone: data.phone || "N/A",
            industry: data.industry || "N/A",
            adFile: data.adFile || null, // URL for the ad image or file
            dailyBudget: data.dailyBudget || 0,
            adType: data.adType || "N/A",
            specific: data.specific || "N/A", // For specific advertise field
            walletBalance: data.walletBalance || "N/A",
            views: data.views || "N/A",
            status: data.status || "N/A",
          };

          // Categorize ads based on status
          if (data.status === "pending") {
            pendingList.push(ad);
          } else if (data.status === "approved") {
            approvedList.push(ad);
          }
        });

        setPendingAds(pendingList);
        setApprovedAds(approvedList);
      } catch (error) {
        console.error("Error fetching ads data: ", error);
      }
    };

    fetchAdsData();
  }, []);

  // Toggle between pending and approved ads
  const handleToggle = () => {
    setIsApproved(!isApproved);
  };

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="w-full font-semibold font-Lato text-xl">Ads Management</div>
        <div className="flex justify-between mb-4">
          <div className="bg-white px-2 rounded-3xl items-center flex">
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${isApproved ? "bg-purple-600 text-white" : "text-black"}`}
            >
              Pending
            </button>
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${!isApproved ? "bg-purple-600 text-white" : "text-black"}`}
            >
              Approved Ads
            </button>
          </div>

          <div className="flex">
            <div className="relative flex justify-between">
              <div className="relative">
                <img
                  src={search}
                  alt="Search Icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6"
                />
                <input
                  type="text"
                  placeholder="Search Brandname, Username, Phone"
                  className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {/* <button className="ml-4 px-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center">
                <div className="flex">
                  <img src={filter} alt="" />
                  <span> Filter</span>
                </div>
              </button> */}
            </div>
          </div>
        </div>

        {/* Render either pending or approved ads based on toggle */}
        <div className="mb-4">
          {isApproved ? (
            <>
              <h2 className="font-semibold text-xl mb-4">Pending Ads</h2>
              <Table columns={columns} data={pendingAds} /> {/* Pending ads */}
            </>
          ) : (
            <>
              <h2 className="font-semibold text-xl mb-4">Approved Ads</h2>
              <Table columns={columns} data={approvedAds} /> {/* Approved ads */}
            </>
          )}
        </div>

        {/* Ad Details Modal */}
        {selectedAd && (
          <AdDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            adDetails={selectedAd} // Pass the full ad details
          />
        )}
      </div>
    </div>
  );
};

export default AdManagement;
