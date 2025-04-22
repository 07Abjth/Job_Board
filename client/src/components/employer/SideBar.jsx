import { Link } from "react-router-dom";
import React from "react";

export const SideBar = () => {
  return (
    <div className="bg-primary min-h-screen w-64 text-white shadow-md">
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <span className="text-2xl font-bold text-blue-500 dark:text-blue-400 -ml-4">
          Talent Hiring
        </span>
      </div>

      <ul className="flex flex-col gap-2 px-4 py-6">
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/employer">Dashboard</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/employer/post-job">Post a Job</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/employer/manage-jobs">Manage Jobs</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/employer/applications">Applications</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/employer/profile">Company Profile</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/employer/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};
