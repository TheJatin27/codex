import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Firebase config import
import Table from "./Table";
import search from "../assets/search.svg";
import AdDetailsModal from "./AdDetailsModal.jsx";

const AdManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [pendingAds, setPendingAds] = useState([]);
  const [approvedAds, setApprovedAds] = useState([]);
  const [isPendingView, setIsPendingView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Table columns setup
  const columns = [
    { header: "AD ID", field: "adId" },
    { header: "Ad Name", field: "adName" },
    { header: "Brand Name", field: "brandName" },
    { header: "Email", field: "email" },
    { header: "Ad Type", field: "adType" },
    {
      header: "",
      field: "viewButton",
      render: (row) => (
        <button
          className="bg-purple-500 text-white px-3 py-1 rounded-full"
          onClick={() => {
            setSelectedAd(row); // Pass full ad data to the modal
            setIsModalOpen(true);
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
            adImage: data.adImage || null, // Updated to fetch adImage
            dailyBudget: data.dailyBudget || 0,
            adType: data.adType || "N/A",
            specific: data.specific || "N/A",
            walletBalance: data.walletBalance || "N/A",
            views: data.views || "N/A",
            status: data.status || "N/A",
          };

          // Categorize ads based on status
          if (ad.status === "pending") {
            pendingList.push(ad);
          } else if (ad.status === "approved") {
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
  const toggleView = () => setIsPendingView(!isPendingView);

  // Filter ads based on search input
  const filteredAds = (isPendingView ? pendingAds : approvedAds).filter((ad) =>
    [ad.brandName, ad.adName, ad.phone]
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle status change from modal
  const handleStatusChange = (adId, newStatus) => {
    if (newStatus === "approved") {
      const updatedPendingAds = pendingAds.filter((ad) => ad.adId !== adId);
      const approvedAd = pendingAds.find((ad) => ad.adId === adId);
      if (approvedAd) {
        setApprovedAds([...approvedAds, { ...approvedAd, status: "approved" }]);
        setPendingAds(updatedPendingAds);
      }
    } else if (newStatus === "rejected") {
      const updatedPendingAds = pendingAds.filter((ad) => ad.adId !== adId);
      setPendingAds(updatedPendingAds);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <h1 className="w-full font-semibold font-Lato text-xl mb-4">Ads Management</h1>
        
        <div className="flex justify-between mb-4">
          {/* Toggle Buttons */}
          <div className="bg-white px-2 rounded-3xl flex">
            <button
              onClick={toggleView}
              className={`px-4 py-1 rounded-full ${isPendingView ? "bg-purple-600 text-white" : "text-black"}`}
            >
              Pending
            </button>
            <button
              onClick={toggleView}
              className={`px-4 py-1 rounded-full ${!isPendingView ? "bg-purple-600 text-white" : "text-black"}`}
            >
              Approved Ads
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center">
            <img
              src={search}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6"
            />
            <input
              type="text"
              placeholder="Search by Brand Name, Ad Name, or Phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Ads Table */}
        <div>
          <h2 className="font-semibold text-xl mb-4">
            {isPendingView ? "Pending Ads" : "Approved Ads"}
          </h2>
          <Table columns={columns} data={filteredAds} />
        </div>

        {/* Ad Details Modal */}
        {selectedAd && (
          <AdDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            adDetails={selectedAd}
            onStatusChange={(newStatus) => handleStatusChange(selectedAd.adId, newStatus)}
          />
        )}
      </div>
    </div>
  );
};

export default AdManagement;
