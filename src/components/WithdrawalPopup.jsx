function WithdrawalPopup({ userData, closePopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-[gray-500] hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Withdrawal Request:</h2>
        <div className="mb-2">
          <span className="font-semibold">User Name: </span> {userData.userName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Points: </span> {userData.points}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Phone Number: </span>{" "}
          {userData.phoneNumber}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Account Details: </span> (Bank
          Transfer)
        </div>
        <div className="bg-[#D9D9D9] rounded-lg p-3 mt-3 text-sm">
          <div>
            <span className="font-semibold">Account Number:</span>{" "}
            12331000004049
          </div>
          <div>
            <span className="font-semibold">Holder Name:</span>{" "}
            {userData.userName}
          </div>
          <div>
            <span className="font-semibold">IFSC Code:</span> PSB122546
          </div>
        </div>
        <div className="mt-4 text-black text-sm text-center">
          Approved on 02/04/24 16:05:54
        </div>
      </div>
    </div>
  );
}

export default WithdrawalPopup;
