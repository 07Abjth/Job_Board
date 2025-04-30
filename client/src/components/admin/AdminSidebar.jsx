import { Link } from "react-router-dom";
import React from "react";

export const AdminSidebar = () => {
  return (
    <div className="bg-primary min-h-screen w-64 text-white shadow-md">
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <span className="text-2xl font-bold text-blue-500 dark:text-blue-400">
          Admin Panel
        </span>
      </div>

      <ul className="flex flex-col gap-2 px-4 py-6">
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/admin/users">Manage Users</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/admin/jobs">Manage Jobs</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/admin/employers">Manage Employers</Link>
        </li>
        <li className="hover:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer">
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};
