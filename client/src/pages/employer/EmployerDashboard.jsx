import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, MessageSquare, Search, Users, Briefcase, FileText, PieChart, Settings, LogOut, ChevronDown, Plus } from 'lucide-react';

// Sample data for charts
const applicationsData = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 15 },
  { name: 'Apr', count: 25 },
  { name: 'May', count: 32 },
  { name: 'Jun', count: 28 },
];

// Sample job postings data
const jobPostings = [
  { id: 1, title: 'Senior Front-end Developer', department: 'Engineering', applicants: 48, status: 'active', daysLeft: 14 },
  { id: 2, title: 'Product Marketing Manager', department: 'Marketing', applicants: 32, status: 'active', daysLeft: 7 },
  { id: 3, title: 'UX/UI Designer', department: 'Design', applicants: 24, status: 'active', daysLeft: 21 },
  { id: 4, title: 'DevOps Engineer', department: 'Engineering', applicants: 16, status: 'expired', daysLeft: 0 },
];

// Sample candidates data
const topCandidates = [
  { id: 1, name: 'Sarah Johnson', role: 'Senior Front-end Developer', match: 95, status: 'New' },
  { id: 2, name: 'Michael Chen', role: 'UX/UI Designer', match: 92, status: 'Screening' },
  { id: 3, name: 'Alex Rodriguez', role: 'Product Marketing Manager', match: 88, status: 'Interview' },
];

export const EmployerDashboard = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen ">
     

      {/* Main Content */}
      <div className="flex-1">
        

         {/* Dashboard Content */}
                <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card  shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Active Jobs</div>
                            <div className="text-3xl font-bold">24</div>
                          </div>
                          <div className="bg-blue-100 p-3 rounded-full">
                            <Briefcase className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="text-sm text-success font-medium mt-4">↑ 12% from last month</div>
                      </div>
                    </div>
                    
                    <div className="card  shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Total Applications</div>
                            <div className="text-3xl font-bold">1,482</div>
                          </div>
                          <div className="bg-green-100 p-3 rounded-full">
                            <FileText className="h-6 w-6 text-success" />
                          </div>
                        </div>
                        <div className="text-sm text-success font-medium mt-4">↑ 8% from last month</div>
                      </div>
                    </div>
                    
                    <div className="card  shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Interviews Scheduled</div>
                            <div className="text-3xl font-bold">36</div>
                          </div>
                          <div className="bg-purple-100 p-3 rounded-full">
                            <Users className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <div className="text-sm text-danger font-medium mt-4">↓ 5% from last month</div>
                      </div>
                    </div>
                    
                    <div className="card  shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Time to Hire (Avg)</div>
                            <div className="text-3xl font-bold">18 <span className="text-base">days</span></div>
                          </div>
                          <div className="bg-orange-100 p-3 rounded-full">
                            <PieChart className="h-6 w-6 text-warning" />
                          </div>
                        </div>
                        <div className="text-sm text-success font-medium mt-4">↑ 4% from last month</div>
                      </div>
                    </div>
                  </div>
        
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Applications Chart */}
                    <div className="card  shadow-sm lg:col-span-2">
                      <div className="card-body">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold">Application Trends</h3>
                          <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-sm btn-ghost">
                              Last 6 Months <ChevronDown className="ml-1 h-4 w-4" />
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52">
                              <li><a>Last 30 Days</a></li>
                              <li><a>Last 6 Months</a></li>
                              <li><a>Last Year</a></li>
                            </ul>
                          </div>
                        </div>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={applicationsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="count" fill="#2563eb" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
        
                    {/* Top Candidates */}
                    <div className="card  shadow-sm">
                      <div className="card-body">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold">Top Candidates</h3>
                          <a href="#" className="text-primary text-sm">View All</a>
                        </div>
                        <div className="space-y-4">
                          {topCandidates.map(candidate => (
                            <div key={candidate.id} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="avatar">
                                  <div className="w-10 h-10 rounded-full">
                                    <img src={`/api/placeholder/${40 + candidate.id}/40`} alt={candidate.name} />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-medium">{candidate.name}</div>
                                  <div className="text-sm text-gray-500">{candidate.role}</div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <div className="badge badge-success">{candidate.match}%</div>
                                <div className="text-xs text-gray-500">{candidate.status}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="btn btn-outline btn-primary btn-sm w-full mt-4">View All Candidates</button>
                      </div>
                    </div>
                  </div>
        
                  {/* Job Postings Table */}
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Recent Job Postings</h3>
                      <button className="btn btn-primary btn-sm gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Job
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead>
                          <tr>
                            <th>Job Title</th>
                            <th>Department</th>
                            <th>Applicants</th>
                            <th>Status</th>
                            <th>Days Left</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobPostings.map(job => (
                            <tr key={job.id}>
                              <td className="font-medium">{job.title}</td>
                              <td>{job.department}</td>
                              <td>{job.applicants}</td>
                              <td>
                                <div className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-ghost'}`}>
                                  {job.status}
                                </div>
                              </td>
                              <td>{job.daysLeft > 0 ? `${job.daysLeft} days` : 'Expired'}</td>
                              <td>
                                <div className="dropdown dropdown-end">
                                  <button tabIndex={0} className="btn btn-ghost btn-xs">...</button>
                                  <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-40">
                                    <li><a>View Details</a></li>
                                    <li><a>Edit Job</a></li>
                                    <li><a>View Applicants</a></li>
                                    <li><a className="text-danger">Delete</a></li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-center mt-4">
                      <div className="btn-group">
                        <button className="btn btn-sm">«</button>
                        <button className="btn btn-sm">1</button>
                        <button className="btn btn-sm btn-active">2</button>
                        <button className="btn btn-sm">3</button>
                        <button className="btn btn-sm">»</button>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          );
        }
