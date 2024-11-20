import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Import deleteDoc and doc
import { db } from "../firebase"; // Import Firestore instance
import Table from "./Table";
import upload from "../assets/upload.svg";
import search from "../assets/search.svg";
import BannerAdvertiseModal from "./BannerAdvertiseModal.jsx";

const BannerAdvertise = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adData, setAdData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Helper function to format Firestore timestamps
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format as a human-readable string
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
            createdAt: formatTimestamp(data.createdAt), // Format the createdAt timestamp
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
      // Delete the ad from Firestore
      await deleteDoc(doc(db, "bannerAds", adId));

      // Remove the ad from state
      setAdData((prevAds) => prevAds.filter((ad) => ad.id !== adId));

      console.log(`Ad with ID ${adId} removed successfully.`);
    } catch (error) {
      console.error("Error removing ad:", error);
    }
  };

  // Filter ads by search term
  const filteredAds = adData.filter((ad) =>
    ad.adName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: "",
      field: "image",
      render: (row) => (
        <img
          src={row.adImage || "/placeholder-image.png"} // Use `adImage` field for the image URL
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
          onClick={() => handleRemoveAd(row.id)} // Call the remove function
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
        <button className="text-white bg-purple-600 px-4 py-2 rounded-lg">
          Filter
        </button>
      </div>

      {/* Table */}
      <Table columns={columns} data={filteredAds} />
    </div>
  );
};

export default BannerAdvertise;
