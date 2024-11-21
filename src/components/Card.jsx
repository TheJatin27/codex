import React from "react";

const Card = ({ label, value, iconColor, icon }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg">
      <div className="flex">
        <div className={`h-16 w-1 ${iconColor} rounded-xl`}></div>
        <div className="flex flex-col ml-2">
          <p className="text-lg">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${iconColor}`}>
        <img src={icon} alt="" />{" "}
      </div>
    </div>
  );
};

export default Card;
