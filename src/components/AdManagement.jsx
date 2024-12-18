import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase config import
import Table from "./Table";
import search from "../assets/search.svg";
import AdDetailsModal from "./AdDetailsModal.jsx";

const EditAdModal = ({ isOpen, onClose, ad, onSave }) => {
  const [adName, setAdName] = useState(ad?.adName || "");
  const [dailyBudget, setDailyBudget] = useState(ad?.dailyBudget || "");
  const [location, setLocation] = useState(ad?.location || "");

  const handleSave = async () => {
    const updatedAd = { adName, dailyBudget, location };
    onSave(updatedAd);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Ad Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div>
          <label className="block mb-2">Ad Name</label>
          <input
            type="text"
            value={adName}
            onChange={(e) => setAdName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <label className="block mb-2">Daily Budget</label>
          <input
            type="number"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(e.target.value)}
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

const AdManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [pendingAds, setPendingAds] = useState([]);
  const [approvedAds, setApprovedAds] = useState([]);
  const [isPendingView, setIsPendingView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const columns = [
    { header: "AD ID", field: "adId" },
    { header: "Ad Name", field: "adName" },
    { header: "Brand Name", field: "brandName" },
    { header: "Start Date", field: "startDate" },
    { header: "End Date", field: "endDate" },
    {
      header: "",
      field: "viewButton",
      render: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-purple-500 text-white px-3 py-1 rounded-full"
            onClick={() => {
              setSelectedAd(row);
              setIsModalOpen(true);
            }}
          >
            View
          </button>
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded-full"
            onClick={() => {
              setSelectedAd(row);
              setIsEditModalOpen(true);
            }}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ads"));
        const pendingList = [];
        const approvedList = [];

        for (const docSnap of querySnapshot.docs) {
          const data = docSnap.data();
          const brandDoc = data.brandId
            ? await getDoc(doc(db, "Brands", data.brandId))
            : null;
          const brandName = brandDoc?.exists() ? brandDoc.data().brandName : "N/A";

          const specificAdvertise =
            data.email?.length > 0
              ? "Email"
              : data.phone?.length > 0
              ? "Phone"
              : "N/A";

          const ad = {
            adId: docSnap.id,
            adName: data.adName || "N/A",
            brandName,
            dailyBudget: data.dailyBudget || 0,
            location: data.location || "N/A",
            specificAdvertise,
            startDate: data.createdAt
              ? typeof data.createdAt.seconds === "number"
                ? new Date(data.createdAt.seconds * 1000).toLocaleString()
                : new Date(data.createdAt).toLocaleString()
              : "N/A",
            endDate: data.endDate
              ? typeof data.endDate.seconds === "number"
                ? new Date(data.endDate.seconds * 1000).toLocaleString()
                : new Date(data.endDate).toLocaleString()
              : "N/A",
            status: data.status || "N/A",
          };

          if (ad.status === "pending") {
            pendingList.push(ad);
          } else if (ad.status === "approved" || ad.status === "Paused") {
            approvedList.push(ad);
          }
        }

        pendingList.sort((a, b) => a.status.localeCompare(b.status));
        approvedList.sort((a, b) => a.status.localeCompare(b.status));

        setPendingAds(pendingList);
        setApprovedAds(approvedList);
      } catch (error) {
        console.error("Error fetching ads data: ", error);
      }
    };

    fetchAdsData();
  }, []);

  const toggleView = () => setIsPendingView(!isPendingView);

  const filteredAds = (isPendingView ? pendingAds : approvedAds).filter((ad) =>
    [ad.brandName, ad.adName].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSaveEditedAd = async (updatedAd) => {
    try {
      const adRef = doc(db, "ads", selectedAd.adId);
      await updateDoc(adRef, updatedAd);

      setPendingAds((prevAds) =>
        prevAds.map((ad) =>
          ad.adId === selectedAd.adId ? { ...ad, ...updatedAd } : ad
        )
      );
      setApprovedAds((prevAds) =>
        prevAds.map((ad) =>
          ad.adId === selectedAd.adId ? { ...ad, ...updatedAd } : ad
        )
      );
    } catch (error) {
      console.error("Error updating ad: ", error);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <h1 className="w-full font-semibold font-Lato text-xl mb-4">Ads Management</h1>

        <div className="flex justify-between mb-4">
          <div className="bg-white px-2 rounded-3xl flex">
            <button
              onClick={toggleView}
              className={`px-4 py-1 rounded-full ${
                isPendingView ? "bg-purple-600 text-white" : "text-black"
              }`}
            >
              Pending
            </button>
            <button
              onClick={toggleView}
              className={`px-4 py-1 rounded-full ${
                !isPendingView ? "bg-purple-600 text-white" : "text-black"
              }`}
            >
              Approved Ads
            </button>
          </div>

          <div className="relative flex items-center">
            <img
              src={search}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6"
            />
            <input
              type="text"
              placeholder="Search by Brand Name or Ad Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-xl mb-4">
            {isPendingView ? "Pending Ads" : "Approved Ads"}
          </h2>
          <Table columns={columns} data={filteredAds} />
        </div>

        {selectedAd && (
          <AdDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            adDetails={selectedAd}
          />
        )}

        {selectedAd && (
          <EditAdModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            ad={selectedAd}
            onSave={handleSaveEditedAd}
          />
        )}
      </div>
    </div>
  );
};

export default AdManagement;
