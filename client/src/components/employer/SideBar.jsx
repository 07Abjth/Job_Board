import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Search,
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
  console.log("employer profile", sidebarOpen);
  

  return (
    <div className={`bg-primary text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col min-h-screen`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <h2 className={`text-2xl font-bold text-blue-400 ${!sidebarOpen && 'hidden'}`}>Talent Hiring</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-gray-800 p-2 rounded-lg">
          <ChevronDown className={`h-5 w-5 transition-transform ${!sidebarOpen && 'rotate-180'}`} />
        </button>
      </div>

      <div className="flex-1">
        <nav className="mt-4">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/employer/dashboard" className="flex items-center p-3 hover:bg-slate-700 rounded-lg mx-2">
                <PieChart className="h-5 w-5" />
                <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/employer/post-job" className="flex items-center p-3 hover:bg-slate-700 rounded-lg mx-2">
                <Briefcase className="h-5 w-5" />
                <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Post a Job</span>
              </Link>
            </li>
            <li>
              <Link to="/employer/manage-job-applications" className="flex items-center p-3 hover:bg-slate-700 rounded-lg mx-2">
                <FileText className="h-5 w-5" />
                <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Manage Applications</span>
              </Link>
            </li>
            <li>
              <Link to="/employer/manage-posted-jobs" className="flex items-center p-3 hover:bg-slate-700 rounded-lg mx-2">
                <Users className="h-5 w-5" />
                <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Manage Jobs</span>
              </Link>
            </li>
            <li>
              <Link to="/employer/profile" className="flex items-center p-3 hover:bg-slate-700 rounded-lg mx-2">
                <MessageSquare className="h-5 w-5" />
                <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Company Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/employer/settings" className="flex items-center p-3 hover:bg-slate-700 rounded-lg mx-2">
                <Settings className="h-5 w-5" />
                <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <a href="#" className="flex items-center p-2 text-gray-400 hover:text-white rounded-lg">
          <LogOut className="h-5 w-5" />
          <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Logout</span>
        </a>
      </div>
    </div>
  );
};
