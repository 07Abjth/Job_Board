import React, { useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const FileUploadComponent = ({
  name, // must be 'resume' or 'profilePic'
  accept = "*",
  onFileSelect,
  label = "Upload File",
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(name, file); // use correct field name for backend match

    try {
      setUploading(true);
      setError("");

      const response = await axiosInstance.patch("/user/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = response.data?.user?.[name] || "";
      const previewUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;

      onFileSelect(name, fileUrl, previewUrl);
    } catch (err) {
      console.error("File upload failed:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="btn btn-outline btn-sm cursor-pointer">
        {uploading ? "Uploading..." : label}
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
