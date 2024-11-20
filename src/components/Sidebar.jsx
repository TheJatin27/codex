import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dashboard from "../assets/dashboard.svg";
import user from "../assets/user.svg";
import downArrow from "../assets/downArrow.svg";
import upArrow from "../assets/upArrow.svg";
import brand from "../assets/brand.svg";
import banner from "../assets/banner.svg";
import dashboardUnactive from "../assets/dashboardUnactive.svg";

const Sidebar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isBrandManagementOpen, setIsBrandManagementOpen] = useState(false);
  const [isBannerAdvertiseOpen, setIsBannerAdvertiseOpen] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const activeClass =
    "text-[#9A02E2] underline underline-offset-4 decoration-[#9A02E2]";

  return (
    <div className="w-64 h-screen bg-white border-r">
      <div className="w-full mx-5 my-2">
        <button className="bg-[#9A02E2] text-white py-2 w-40 rounded-full">
          Logo
        </button>
      </div>

      <nav className="mt-8">
        <Link
          to="/dashboard"
          className={`flex items-center px-4 py-2 ${
            isActive("/dashboard")
              ? `bg-[#9A02E2] rounded-e-full text-[#FFFFFF] `
              : "text-black hover:bg-gray-100"
          }`}
        >
          {isActive("/dashboard") ? (
            <img src={dashboard} className="h-3 mr-1" alt="" />
          ) : (
            <img src={dashboardUnactive} className="h-3 mr-1" alt="" />
          )}
          Dashboard
        </Link>

        {/* User Management Section */}
        <div className="mt-2">
          <button
            className={`flex justify-between items-center w-full px-4 py-2 hover:bg-gray-100 ${
              isActive("/user-details") ||
              isActive("/withdrawal-requests") ||
              isActive("/user-analytics") ||
              isActive("/vouchers")
                ? "text-[#9A02E2]"
                : "text-gray-700"
            }`}
            onClick={() => setIsUserManagementOpen(!isUserManagementOpen)}
          >
            <div className="flex">
              <img src={user} alt="" />
              <span>User Management</span>
            </div>
            {isUserManagementOpen ? (
              <img src={upArrow} alt="" />
            ) : (
              <img src={downArrow} alt="" />
            )}
          </button>
          {isUserManagementOpen && (
            <div className="ml-6">
              <Link
                to="/user-details"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive("/user-details") ? activeClass : ""
                }`}
              >
                User Details
              </Link>
              <Link
                to="/withdrawal-requests"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive("/withdrawal-requests") ? activeClass : ""
                }`}
              >
                <div className="flex">
                  Withdrawal Requests
                  <img src={downArrow} alt="" />
                </div>
              </Link>
              <Link
                to="/user-analytics"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive("/user-analytics") ? activeClass : ""
                }`}
              >
                User Analytics
              </Link>
              <Link
                to="/vouchers"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive("/vouchers") ? activeClass : ""
                }`}
              >
                Vouchers
              </Link>
            </div>
          )}
        </div>

        {/* Brand Management Section */}
        <div>
          <button
            className={`flex justify-between items-center w-full px-4 py-2 hover:bg-gray-100 ${
              isActive("/brand-list") ||
              isActive("/ads-management") ||
              isActive("/transaction")
                ? "text-[#9A02E2]"
                : "text-gray-700"
            }`}
            onClick={() => setIsBrandManagementOpen(!isBrandManagementOpen)}
          >
            <div className="flex">
              <img src={brand} alt="" />
              <span>Brand Management</span>{" "}
            </div>
            {isBrandManagementOpen ? (
              <img src={upArrow} alt="" />
            ) : (
              <img src={downArrow} alt="" />
            )}
          </button>
          {isBrandManagementOpen && (
            <div className="ml-6">
              <Link
                to="/brand-list"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive("/brand-list") ? activeClass : ""
                }`}
              >
                Brands List
              </Link>
              <Link
                to="/ads-management"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive("/ads-management") ? activeClass : ""
                }`}
              >
                Ads Management
              </Link>
              <Link
                to="/transaction"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive("/transaction") ? activeClass : ""
                }`}
              >
                Transaction
              </Link>
            </div>
          )}
        </div>

        {/* Banner Advertise Section */}
        <div>
          <Link
            to="/banner-advertise"
            className={`flex justify-between items-center w-full px-4 py-2 hover:bg-gray-100 ${
              isActive("/banner-advertise") ? activeClass : "text-gray-700"
            }`}
          >
            <div className="flex">
              <img src={banner} alt="" />
              <span>Banner Advertise</span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
