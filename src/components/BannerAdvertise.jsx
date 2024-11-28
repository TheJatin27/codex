import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Table from "./Table";
import upload from "../assets/upload.svg";
import search from "../assets/search.svg";
import BannerAdvertiseModal from "./BannerAdvertiseModal.jsx";

const BannerAdvertise = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adData, setAdData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false); // For toggling dropdown visibility
  const [filterOption, setFilterOption] = useState("All"); // Track selected filter option

  // Helper function to format Firestore timestamps
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  // Fetch ads from Firestore
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsSnapshot = await getDocs(collection(db, "bannerAds"));
        const adsList = adsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: formatTimestamp(data.createdAt),
          };
        });
        setAdData(adsList);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  // Handle Remove Ad
  const handleRemoveAd = async (adId) => {
    try {
      await deleteDoc(doc(db, "bannerAds", adId));
      setAdData((prevAds) => prevAds.filter((ad) => ad.id !== adId));
      console.log(`Ad with ID ${adId} removed successfully.`);
    } catch (error) {
      console.error("Error removing ad:", error);
    }
  };

  // Sort and Filter Ads

const sortedAndFilteredAds = adData
  .filter((ad) => {
    // Match search term
    const matchesSearch = ad.adName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Match filter option
    const matchesFilter = 
    (filterOption === "All" && ad.publishOn === "Top Banner" || ad.publishOn === "Bottom Banner") ||
      // filterOption === "All" || 
      (filterOption === "Top Banner" && ad.publishOn === "Top Banner") ||
      (filterOption === "Bottom Banner" && ad.publishOn === "Bottom Banner");
    
    return matchesSearch && matchesFilter;
  })
  .sort((a, b) => {
    if (filterOption === "Top Banner") {
      return new Date(a.publishOn) - new Date(b.publishOn); // Earliest publishOn first
    } else if (filterOption === "Bottom Banner") {
      return new Date(b.publishOn) - new Date(a.publishOn); // Latest publishOn first
    }
    return 0; // No sorting for "All"
  });


  const columns = [
    {
      header: "",
      field: "image",
      render: (row) => (
        <img
          src={row.adImage || "/placeholder-image.png"}
          alt={row.adName}
          className="w-16 h-16 object-cover"
        />
      ),
    },
    { header: "Ad Name", field: "adName" },
    { header: "Posted Date", field: "createdAt" },
    { header: "Published on", field: "publishOn" },
    { header: "Post on", field: "postOn" },
    {
      header: "",
      render: (row) => (
        <button
          onClick={() => handleRemoveAd(row.id)}
          className="text-white bg-purple-600 px-4 py-2 rounded-lg"
        >
          Remove this Ad
        </button>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* Upload Button */}
      <div
        className="bg-white rounded-lg w-72 p-6 shadow-md mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col items-center border-2 border-purple-500 rounded-lg p-4 cursor-pointer">
          <img src={upload} alt="" />
          <span className="mt-2 text-black">Upload Ad</span>
        </div>
      </div>
      {isModalOpen && (
        <BannerAdvertiseModal onClose={() => setIsModalOpen(false)} />
      )}

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <img
            src={search}
            alt="Search Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2  h-6"
          />
          <input
            type="text"
            placeholder="Search Ad Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Filter Dropdown */}
<div className="relative">
  <button
    className="text-white bg-purple-600 px-4 py-2 rounded-lg"
    onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
  >
    Filter
  </button>
  {filterDropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setFilterOption("All");
          setFilterDropdownOpen(false);
        }}
      >
        All
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setFilterOption("Top Banner");
          setFilterDropdownOpen(false);
        }}
      >
        Top Banner
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setFilterOption("Bottom Banner");
          setFilterDropdownOpen(false);
        }}
      >
        Bottom Banner
      </button>
    </div>
  )}
</div>

      </div>

      {/* Table */}
      <Table columns={columns} data={sortedAndFilteredAds} />
    </div>
  );
};

export default BannerAdvertise;
