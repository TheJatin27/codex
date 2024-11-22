function WithdrawalPopup({ userData, closePopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Withdrawal Request:</h2>

        <div className="mb-2">
          <span className="font-semibold">User Name: </span> {userData.userName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Points: </span> {userData.amount || "N/A"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Phone Number: </span> {userData.phoneNumber || "N/A"}
        </div>

        {userData.type === "Bank Transfer" && (
          <div>
            <div className="mb-2">
              <span className="font-semibold">Account Details:</span> (Bank Transfer)
            </div>
            <div className="bg-[#D9D9D9] rounded-lg p-3 mt-3 text-sm">
              <div>
                <span className="font-semibold">Account Number:</span>{" "}
                {userData.holderAccountNumber || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Holder Name:</span>{" "}
                {userData.holderName || "N/A"}
              </div>
              <div>
                <span className="font-semibold">IFSC Code:</span> {userData.ifscCode || "N/A"}
              </div>
            </div>
          </div>
        )}

        {userData.type === "UPI" && (
          <div className="mb-2">
            <span className="font-semibold">UPI ID:</span> {userData.upiID || "N/A"}
          </div>
        )}

        {userData.status === "Approved" && (
          <div className="mt-4 text-black text-sm text-center">
            Approved on {new Date(userData.date).toLocaleString() || "N/A"}
          </div>
        )}

        {userData.adminComment && (
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">Admin Comment:</span> {userData.adminComment}
          </div>
        )}
      </div>
    </div>
  );
}

export default WithdrawalPopup;
