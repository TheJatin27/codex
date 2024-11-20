import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const BannerAdvertiseModal = ({ onClose }) => {
  const [adName, setAdName] = useState("");
  const [postOn, setPostOn] = useState("Brand Screen");
  const [publishOn, setPublishOn] = useState("Top Banner");
  const [adImage, setAdImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdImage(file); // Store the actual file object for Firebase Storage upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adImage) {
      alert("Please upload an image.");
      return;
    }

    setIsUploading(true);

    try {
      // Firebase Storage instance
      const storage = getStorage();
      const storageRef = ref(storage, `banner/${adImage.name}`); // Save in 'banner' folder

      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, adImage);

      // Monitor upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          alert("Image upload failed. Please try again.");
          setIsUploading(false);
        },
        async () => {
          // Get download URL after successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Save ad data in Firestore, including the image URL and image name
          const adData = {
            adName,
            postOn,
            publishOn,
            adImage: downloadURL, // Store the download URL
            adImageName: adImage.name, // Store the image file name
            createdAt: new Date(), // Timestamp for tracking
          };

          const docRef = await addDoc(collection(db, "bannerAds"), adData);
          console.log("Document written with ID: ", docRef.id);
          alert("Advertisement Published Successfully!");

          // Reset form fields
          setAdName("");
          setPostOn("Brand Screen");
          setPublishOn("Top Banner");
          setAdImage(null);

          // Close the modal
          onClose();
        }
      );
    } catch (error) {
      console.error("Error adding advertisement: ", error);
      alert("Failed to publish advertisement. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[400px] md:w-[500px] rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Banner Advertise</h2>

        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block relative cursor-pointer mb-4">
            {adImage ? (
              <img
                src={URL.createObjectURL(adImage)}
                alt="Ad preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex justify-center items-center rounded-lg">
                <span className="text-purple-600 font-medium">
                  Upload Ad Image
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          {/* Ad Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Name
            </label>
            <input
              type="text"
              value={adName}
              onChange={(e) => setAdName(e.target.value)}
              placeholder="30% off Ad"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Post on */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post on
            </label>
            <select
              value={postOn}
              onChange={(e) => setPostOn(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Brand Screen</option>
              <option>User Screen</option>
              <option>Brand Screen</option>
            </select>
          </div>

          {/* Publish on */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publish on
            </label>
            <select
              value={publishOn}
              onChange={(e) => setPublishOn(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Top Banner</option>
              <option>Bottom Banner</option>
              <option>Side Banner</option>
            </select>
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BannerAdvertiseModal;
