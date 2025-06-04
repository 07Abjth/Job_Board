import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  PieChart,
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      }  border-r  border-gray-200 shadow-sm transition-all duration-300 flex flex-col min-h-screen`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <Link
          to="/employer/home"
          className={`text-xl font-bold text-primary ${
            !sidebarOpen && "hidden"
          }`}
        >
          Talent Hiring
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-600 hover:text-primary"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform ${
              !sidebarOpen && "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1  px-2 mt-4 ">
        <ul className="space-y-2 text-base-content text-sm">
          <SidebarItem
            to="/employer/dashboard"
            icon={<PieChart className="h-5 w-5" />}
            label="Dashboard"
            open={sidebarOpen}
          />
          <SidebarItem
            to="/employer/post-job"
            icon={<Briefcase className="h-5 w-5" />}
            label="Post a Job"
            open={sidebarOpen}
          />
          <SidebarItem
            to="/employer/manage-job-applications"
            icon={<FileText className="h-5 w-5" />}
            label="Manage Applications"
            open={sidebarOpen}
          />
          <SidebarItem
            to="/employer/manage-posted-jobs"
            icon={<Users className="h-5 w-5" />}
            label="Manage Jobs"
            open={sidebarOpen}
          />
          <SidebarItem
            to="/employer/profile"
            icon={<MessageSquare className="h-5 w-5" />}
            label="Company Profile"
            open={sidebarOpen}
          />
          {/* <SidebarItem
            to="/employer/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            open={sidebarOpen}
          /> */}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-4 py-3 border-t">
        <button className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-600">
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

// Reusable sidebar item component
const SidebarItem = ({ to, icon, label, open }) => (
  <li>
    <Link
      to={to}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 text-gray-700 transition-all"
    >
      {icon}
      {open && <span className="truncate">{label}</span>}
    </Link>
  </li>
);
