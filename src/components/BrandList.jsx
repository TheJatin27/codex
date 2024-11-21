import React, { useState, useEffect } from "react";
import Table from "./Table";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import pen from "../assets/pen.svg";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const SuccessPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-500">{message}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

const EditWalletModal = ({ isOpen, onClose, brand, currentBalance, onSave }) => {
  const [walletBalance, setWalletBalance] = useState(currentBalance);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(walletBalance);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Edit Wallet Balance of {brand}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <label className="block mb-2">Change Wallet Balance</label>
        <div className="flex items-center border border-gray-300 rounded-md p-2 mb-4">
          <span className="text-xl mr-2">₹</span>
          <input
            type="number"
            value={walletBalance}
            onChange={(e) => setWalletBalance(e.target.value)}
            className="outline-none w-full"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-purple-500 text-white rounded-md py-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const BrandList = () => {
  const [isApproved, setIsApproved] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [approvedBrands, setApprovedBrands] = useState([]);
  const [pendingBrands, setPendingBrands] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpenModal = (row) => {
    setSelectedBrand(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  const handleSaveBalance = (newBalance) => {
    const updatedData = approvedBrands.map((item) =>
      item.uid === selectedBrand.uid
        ? { ...item, wallet: `₹${newBalance}` }
        : item
    );
    setApprovedBrands(updatedData);
  };

  const fetchBrands = async () => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "Brand"));
      const data = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      const approved = data.filter((item) => item.Approve);
      const pending = data.filter((item) => !item.Approve);

      setApprovedBrands(approved);
      setPendingBrands(pending);
    } catch (error) {
      console.error("Error fetching brands: ", error);
    }
  };

  const handleApprove = async (row) => {
    try {
      const db = getFirestore();
      const brandDocRef = doc(db, "Brand", row.uid);
      await updateDoc(brandDocRef, { Approve: true });

      setPendingBrands((prev) => prev.filter((item) => item.uid !== row.uid));
      setApprovedBrands((prev) => [...prev, { ...row, Approve: true }]);

      // Show success message
      setSuccessMessage("Brand has been approved!");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error approving brand: ", error);
    }
  };

  const handleReject = async (row) => {
    try {
      const db = getFirestore();
      const brandDocRef = doc(db, "Brand", row.uid);
      await updateDoc(brandDocRef, { Approve: false });

      setApprovedBrands((prev) => prev.filter((item) => item.uid !== row.uid));
      setPendingBrands((prev) => [...prev, { ...row, Approve: false }]);
    } catch (error) {
      console.error("Error rejecting brand: ", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const columnsPending = [
    { header: "User ID", field: "uid" },
    { header: "Brand Name", field: "brandName" },
    { header: "Phone", field: "Phone" },
    { header: "Industry", field: "industry" },
    {
      header: "",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleApprove(row)}
            className="bg-purple-500 text-white px-3 py-1 rounded-full"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(row)}
            className="border border-purple-500 text-purple-500 px-3 py-1 rounded-full"
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  const columnsApproved = [
    { header: "User ID", field: "uid" },
    { header: "Brand Name", field: "brandName" },
    { header: "Phone", field: "Phone" },
    { header: "Industry", field: "industry" },
    {
      header: "Wallet Balance",
      render: (row) => (
        <div className="flex items-center">
          {row.wallet}
          <img
            src={pen}
            className="h-6 ml-2 cursor-pointer"
            alt="Edit"
            onClick={() => handleOpenModal(row)}
          />
        </div>
      ),
    },
    { header: "Status", field: "status" },
  ];

  const handleToggle = () => {
    setIsApproved(!isApproved);
  };

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="w-full font-semibold font-Lato text-xl">Brand Lists</div>
        <div className="flex justify-between mb-4">
          <div className="bg-white px-2 rounded-3xl items-center flex">
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${
                isApproved ? "bg-purple-600 text-white" : "text-black"
              }`}
            >
              Approved
            </button>
            <button
              onClick={handleToggle}
              className={`px-4 py-1 rounded-full ${
                !isApproved ? "bg-purple-600 text-white" : "text-black"
              }`}
            >
              Pending
            </button>
          </div>
          <div className="flex">
            <div className="relative">
              <img
                src={search}
                alt="Search Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6"
              />
              <input
                type="text"
                placeholder="Search Username"
                className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="ml-4 px-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center">
              <img src={filter} alt="Filter" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        {isApproved ? (
          <Table columns={columnsApproved} data={approvedBrands} />
        ) : (
          <Table columns={columnsPending} data={pendingBrands} />
        )}
        {selectedBrand && (
          <EditWalletModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            brand={selectedBrand.brandName}
            currentBalance={selectedBrand.wallet.replace("₹", "")}
            onSave={handleSaveBalance}
          />
        )}
        <SuccessPopup
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      </div>
    </div>
  );
};

export default BrandList;
