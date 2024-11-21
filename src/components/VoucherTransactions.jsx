import React from "react";
import { Link } from "react-router-dom";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import backArrow from "../assets/backArrow.svg";
import Table from "./Table";

const VoucherTransactions = () => {
  const columns = [
    { header: "Trans ID", field: "TransId" },
    { header: "User Name", field: "userName" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Voucher Name", field: "voucherName" },
    { header: "Voucher Category", field: "voucherCategory" },
    { header: "Voucher Points", field: "voucherPoints" },
    { header: "Redeemed on", field: "redeemedOn" },
  ];

  const vouchers = [
    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },




    
    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },

    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },

    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },

    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },

    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },

    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },

    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },

    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },

    {
      TransId: 55489,
      userName: "Akash",
      phoneNumber: "+91 9876543210",
      voucherName: "Nykaa",
      voucherCategory: "Fashion",
      voucherPoints: "600 Points",
      redeemedOn: "05/05/24  16:55:54",
    },
  ];
  return (
    <div className="p-4">
      <div className="bg-purple-50 rounded-lg shadow-md p-4 h-full">
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Link to="/vouchers">
              <button className="bg-[#9A02E2] rounded-full flex items-center justify-center">
                <img src={backArrow} className="h-5" alt="" />
              </button>
            </Link>
            <h1 className="text-xl font-bold">Voucher Transactions</h1>
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
                  placeholder=" Search Username"
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
        <Table columns={columns} data={vouchers} />
      </div>
    </div>
  );
};

export default VoucherTransactions;
