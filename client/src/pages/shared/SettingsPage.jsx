import React, { useState } from "react";
import { Save, Bell, Lock, Globe, User } from "lucide-react";

export const SettingsPage =()=> {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Account Settings
        </h1>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8" aria-label="Settings sections">
            {[
              { id: "profile", icon: <User className="mr-2 h-4 w-4" />, label: "Profile" },
              { id: "security", icon: <Lock className="mr-2 h-4 w-4" />, label: "Security" },
              { id: "notifications", icon: <Bell className="mr-2 h-4 w-4" />, label: "Notifications" },
              { id: "preferences", icon: <Globe className="mr-2 h-4 w-4" />, label: "Preferences" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <div className="flex items-center">{tab.icon}<span>{tab.label}</span></div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
              <div className="flex flex-col sm:flex-row sm:space-x-6">
                <div className="sm:w-1/3 flex justify-center sm:justify-start">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                      <User size={48} />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                    </button>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">Upload new photo</p>
                  </div>
                </div>

                <div className="sm:w-2/3 space-y-4">
                  {["Full Name", "Email Address", "Bio"].map((label, i) => (
                    <div key={label}>
                      <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {label}
                      </label>
                      {label === "Bio" ? (
                        <textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          rows={3}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <input
                          type={label === "Email Address" ? "email" : "text"}
                          id={label.toLowerCase().replace(" ", "-")}
                          placeholder={`Enter your ${label.toLowerCase()}`}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>

              {[
                { id: "current-password", label: "Current Password" },
                { id: "new-password", label: "New Password" },
                { id: "confirm-password", label: "Confirm Password" },
              ].map(({ id, label }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                  </label>
                  <input
                    type="password"
                    id={id}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>
              ))}

              {/* Two Factor Auth */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Add extra security to your account</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">A verification code will be sent during login</p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 dark:bg-gray-700 transition-all">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
              {["Email Notifications", "SMS Alerts", "Push Notifications"].map((label) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
              ))}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Display Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Language
                  </label>
                  <select
                    id="language"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Malayalam</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme
                  </label>
                  <select
                    id="theme"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>System Default</option>
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
