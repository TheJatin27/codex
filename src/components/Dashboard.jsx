import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore instance
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // for navigation
import Card from "./Card";
import library from "../assets/library.svg";
import brand from "../assets/brand.svg";
import userGroup from "../assets/userGroup.svg";

const Dashboard = () => {
  const [totalAds, setTotalAds] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);
  const navigate = useNavigate(); // for navigation
  const auth = getAuth(); // Firebase authentication instance

  useEffect(() => {
    const checkAuth = () => {
      const user = auth.currentUser;
      if (!user) {
        // If no user is logged in, redirect to login page
        navigate("/signup");
      }
    };

    checkAuth(); // Check auth status on component mount

    const fetchCounts = async () => {
      try {
        // Fetch total ads count
        const adsSnapshot = await getDocs(collection(db, "ads"));
        setTotalAds(adsSnapshot.size);

        // Fetch total users count
        const usersSnapshot = await getDocs(collection(db, "users"));
        setTotalUsers(usersSnapshot.size);

        // Fetch total brands count
        const brandsSnapshot = await getDocs(collection(db, "Brand"));
        setTotalBrands(brandsSnapshot.size);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, [auth, navigate]); // Dependencies include auth and navigate

  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      <Card
        label="Total Ads"
        value={totalAds} // Dynamically fetched value
        iconColor="bg-green-500"
        icon={library}
      />
      <Card
        label="Total Users"
        value={totalUsers} // Dynamically fetched value
        iconColor="bg-blue-500"
        icon={userGroup}
      />
      <Card
        label="Total Brands"
        value={totalBrands} // Dynamically fetched value
        iconColor="bg-purple-500"
        icon={brand}
      />
    </div>
  );
};

export default Dashboard;
