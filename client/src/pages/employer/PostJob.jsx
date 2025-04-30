import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
   const [category, setCategory] = useState('');
   const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [requirements, setRequirements] = useState('');
 

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = {
        title,
        description,
        company,
        location,
        salary: Number(salary.replace(/,/g, '')),
        category,
        jobType,
        experience,
        qualifications,
        requirements,
      };
      
      const res = await axiosInstance.post('/jobs/create', newJob);
      toast.success(res.data.message);
      
      // Clear form after successful post
      setTitle('');
    setDescription('');
    setCompany('');
    setLocation('');
    setSalary('');
    setCategory('');
    setJobType('');
    setExperience('');
    setQualifications('');
    setRequirements('');
    } catch (error) {
      console.error("Job post failed:", error);
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Salary</label>
          <input
  type="number"
  value={salary}
  onChange={(e) => setSalary(e.target.value)}
  className="input input-bordered w-full"
  required
/>
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Experience</label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Job Type</label>
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="input input-bordered w-full"
          />
        </div> 
          <div>
          <label className="block mb-1">Requirements</label>
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>  <div>
          <label className="block mb-1">Qualifications</label>
          <input
            type="text"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Post Job</button>
      </form>
    </div>
  );
};
