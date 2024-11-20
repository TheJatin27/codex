import React from "react";
import userPic from "../assets/userPic.svg";
import logOut from "../assets/logOut.svg";
const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div></div>
      <div className="flex gap-x-1 items-center">
        <div>
          <img src={userPic} alt="" />
        </div>

        <div className="flex flex-col">
          <span className="mr-4 font-semibold text-2xl">Admin</span>
          <button className="flex items-center  text-purple-500">
            {" "}
            <img src={logOut} className="" alt="" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
