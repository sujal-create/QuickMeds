import { useState } from "react";
import "./AdminAddJob.css";

const AdminAddJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    type: "Full-time",
    experience: "",
    category: "Medical",
    requirements: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    const newJob = {
      ...jobData,
      id: Date.now(),
      requirements: jobData.requirements.split(",").map(r => r.trim())
    };

    jobs.push(newJob);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    alert("Job added!");
    setJobData({
      title: "",
      description: "",
      location: "",
      type: "Full-time",
      experience: "",
      category: "Medical",
      requirements: ""
    });
  };

  return (
    <div className="admin-job-form">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={jobData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" value={jobData.description} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={jobData.location} onChange={handleChange} required />
        <input name="experience" placeholder="Experience" value={jobData.experience} onChange={handleChange} required />
        <select name="type" value={jobData.type} onChange={handleChange}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <select name="category" value={jobData.category} onChange={handleChange}>
          <option value="Medical">Medical</option>
          <option value="Administrative">Administrative</option>
          <option value="Technical">Technical</option>
        </select>
        <input name="requirements" placeholder="Requirements (comma separated)" value={jobData.requirements} onChange={handleChange} required />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AdminAddJob;
