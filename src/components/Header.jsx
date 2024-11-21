import React, { useEffect, useState } from "react";
import userPic from "../assets/userPic.svg";
import logOut from "../assets/logOut.svg";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For navigation

const auth = getAuth();

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state
  const navigate = useNavigate(); // For navigation to login/signup page

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
        navigate("/signup"); // Redirect to signup/login page if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, [navigate]);

  // Function to handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully");
        navigate("/signup"); // Redirect to login page after logging out
      })
      .catch((error) => {
        console.error("Logout error: ", error);
        // Handle error (e.g., show an error message)
      });
  };

  // Only render the header if the user is logged in
  if (!isLoggedIn) {
    return null; // Do not render header if the user is not logged in
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div></div>
      <div className="flex gap-x-1 items-center">
        <div>
          <img src={userPic} alt="User" />
        </div>

        <div className="flex flex-col">
          <span className="mr-4 font-semibold text-2xl">Admin</span>
          <button
            onClick={handleLogout} // Trigger logout on button click
            className="flex items-center text-purple-500"
          >
            <img src={logOut} alt="Logout" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
