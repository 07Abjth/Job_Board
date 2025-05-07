import React, { useState } from "react";

export const FileUploadComponent = ({ name, accept, onFileSelect, label }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState(label || "Choose file");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(`Selected file for ${name}:`, file.name);
    
    // Create FormData to display preview if it's an image
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target.result;
        setFilePreview(previewUrl);
        
        // Call parent component's handler with file info
        onFileSelect(name, file, previewUrl);
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files (like resume)
      setFileName(file.name);
      onFileSelect(name, file, null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <label className="flex items-center px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-focus transition">
          <span>{label || `Select ${name}`}</span>
          <input
            type="file"
            name={name}
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <span className="ml-2 text-sm text-gray-500">
          {filePreview ? "File selected" : fileName}
        </span>
      </div>
      
      {filePreview && accept.includes("image/") && (
        <div className="mt-2">
          <img 
            src={filePreview} 
            alt="Preview" 
            className="h-20 w-20 object-cover rounded-md" 
          />
        </div>
      )}
    </div>
  );
};