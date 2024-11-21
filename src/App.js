import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import UserDetails from "./components/UserDetails";
import WithdrawalRequests from "./components/WithdrawalRequests.jsx";
import UserAnalytics from "./components/UserAnalytics.jsx";
import Vouchers from "./components/Vouchers.jsx";
import VoucherTransactions from "./components/VoucherTransactions.jsx";
import BrandList from "./components/BrandList.jsx";
import AdManagement from "./components/AdManagement.jsx";
import Transaction from "./components/Transaction.jsx";
import BannerAdvertise from "./components/BannerAdvertise.jsx";
import AdminLogin from "./components/Signup.jsx";



const auth = getAuth(app);


function App() {

  const sinupUser = () =>{

    createUserWithEmailAndPassword(
      auth,
      "xyz@xyz.com",
    "xyz" 
  ).then((value) => console.log(value));



  };



  const location = useLocation();

  // Hide sidebar and header on login/signup page
  const hideSidebarAndHeader = location.pathname === "/SignUp";
  return (
    <div className="flex">
      {!hideSidebarAndHeader && <Sidebar />}
      <div className="flex-1">
        {!hideSidebarAndHeader && <Header />}
        <Routes>
          <Route path="/SignUp" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route
            path="/voucher-transactions"
            element={<VoucherTransactions />}
          />
          <Route path="/withdrawal-requests" element={<WithdrawalRequests />} />
          <Route path="/user-analytics" element={<UserAnalytics />} />
          <Route path="/brand-list" element={<BrandList />} />
          <Route path="/ads-management" element={<AdManagement />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/banner-advertise" element={<BannerAdvertise />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
