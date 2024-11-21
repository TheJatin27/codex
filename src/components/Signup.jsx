import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom"; // for navigation to Dashboard

const auth = getAuth(app);

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // for error handling
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    // Check if user is already logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, redirect to Dashboard
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset error on each attempt

    // Firebase login using email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signin success");
        navigate("/dashboard"); // Redirect to Dashboard after successful login
      })
      .catch((err) => {
        console.error("Signin error: ", err.message);
        setError("Invalid credentials. Please try again."); // Show error message to the user
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-center text-gray-500 mb-6">
          Hey, Enter your details to sign in
        </p>
        
        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
