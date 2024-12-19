import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase";

const AddCategoryPopup = ({ onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !categoryImage) {
      alert("Please provide all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const imageRef = ref(storage, `voucherCategories/${categoryImage.name}`);
      await uploadBytes(imageRef, categoryImage);
      const imageUrl = await getDownloadURL(imageRef);

      const newCategory = { name: categoryName, imageUrl, count: 0 };
      await addDoc(collection(db, "VoucherCategory"), newCategory);

      alert("Category added successfully!");
      onCategoryAdded(newCategory); // Notify parent component
      onClose(); // Close popup
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded-md ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        <button
          className="w-full mt-2 bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCategoryPopup;
