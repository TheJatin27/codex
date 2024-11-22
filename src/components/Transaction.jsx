import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import backArrow from "../assets/backArrow.svg";
import Table from "./Table";
import { db } from "../firebase"; // Import initialized Firebase
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const TransactionsWithUserNames = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { header: "Transaction ID", field: "transactionId" },
    { header: "User Name", field: "userName" },
    { header: "Amount", field: "amount" },
    // { header: "Brand ID", field: "brandId" },
    { header: "Date", field: "date" },
    { header: "Description", field: "description" },
    // { header: "GST", field: "gst" },
    { header: "Total Amount", field: "totalAmount" },
    { header: "Type", field: "type" },
    // { header: "User ID", field: "userId" },
  ];

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchTransactions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Transactions"));

      const transactionsWithUserNames = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const transactionData = docSnapshot.data();
          const userId = transactionData.userId;

          // Fetch userName from Users collection
          let userName = "N/A";
          if (userId) {
            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
              userName = userDoc.data().userName || "N/A";
            }
          }

          return {
            transactionId: docSnapshot.id,
            userName,
            amount: transactionData.amount || "N/A",
            // brandId: transactionData.brandId || "N/A",
            date: formatDate(transactionData.date), // Format the date
            description: transactionData.description || "N/A",
            // gst: transactionData.gst || "N/A",
            totalAmount: transactionData.totalAmount || "N/A",
            type: transactionData.type || "N/A",
            // userId: transactionData.userId || "N/A",
          };
        })
      );

      setTransactions(transactionsWithUserNames);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Link to="/transactions">
              <button className="bg-[#9A02E2] rounded-full flex items-center justify-center">
                <img src={backArrow} className="h-5" alt="Back" />
              </button>
            </Link>
            <h1 className="text-xl font-bold">Transaction Details</h1>
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
                  placeholder=" Search Username"
                  className="pl-12 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="ml-4 px-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center">
                <div className="flex">
                  <img src={filter} alt="Filter" />
                  <span> Filter</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table columns={columns} data={transactions} />
        )}
      </div>
    </div>
  );
};

export default TransactionsWithUserNames;
