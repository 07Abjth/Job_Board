import React from "react";

export const InputField = ({ label, type = 'text', value, onChange, required = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="input input-bordered w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export const TextAreaField = ({ label, value, onChange, required = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      required={required}
      className="textarea textarea-bordered w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
