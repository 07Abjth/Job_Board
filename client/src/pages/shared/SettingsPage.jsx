import React from "react";

export const SettingsPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Settings</h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-medium mb-2 text-black dark:text-white">Profile</h3>
        <p className="text-gray-600 dark:text-gray-300">Update your name, email, and profile picture.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-medium mb-2 text-black dark:text-white">Security</h3>
        <p className="text-gray-600 dark:text-gray-300">Change your password and manage login settings.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium mb-2 text-black dark:text-white">Notifications</h3>
        <p className="text-gray-600 dark:text-gray-300">Manage your notification preferences.</p>
      </div>
    </div>
  );
};
