import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { InputField, TextAreaField } from '../shared/FormFields';

 

 

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

      // Clear form
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
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4"> Post a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <InputField label="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          <InputField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <InputField label="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          <InputField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <InputField label="Job Type" value={jobType} onChange={(e) => setJobType(e.target.value)} />
          <InputField label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
          <InputField label="Qualifications" value={qualifications} onChange={(e) => setQualifications(e.target.value)} />
          <InputField label="Requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
        </div>

        <TextAreaField label="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <div>
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            ✅ Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

