import  { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./JobApplication.css";
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle, } from "react-icons/fa";
 
const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Sample job listings data (same as in Careers.jsx)
 

const [allJobs, setAllJobs] = useState([]);

useEffect(() => {
  const jobsFromStorage = JSON.parse(localStorage.getItem("jobs")) || [];
  setAllJobs(jobsFromStorage);
}, []);


  // Find the job based on the jobId
 
const job = allJobs.find(job => job.id.toString() === jobId);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    education: "",
    experience: "",
    currentEmployer: "",
    currentPosition: "",
    startDate: "",
    coverLetter: "",
    agreeToTerms: false
  });

  // File upload states


  // Form validation states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form input changes
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (name === "phone") {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      setFormData({ ...formData, [name]: numericValue });
    }
    return;
  }

  if (name === "zipCode") {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 6) {
    setFormData({ ...formData, [name]: numericValue });
    }
    return;
  }

  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });

  if (errors[name]) {
    setErrors({
      ...errors,
      [name]: null,
    });
  }
};


  // Handle resume file upload
  // Handle certificates file upload
 

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Address validation
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    // Education and experience
    if (!formData.education.trim()) newErrors.education = "Education details are required";
    if (!formData.experience.trim()) newErrors.experience = "Experience details are required";
if (!formData.startDate.trim()) newErrors.startDate = "Start date is required";
    // Resume validation
   

    // Terms agreement
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";

    return newErrors;
  };

  // Function to save application to localStorage
  const saveApplicationToLocalStorage = (applicationData) => {
    // Get existing applications or initialize empty array
    const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');

    // Create application object with ID and timestamp
    const newApplication = {
      id: Date.now(), // Unique ID based on timestamp
      jobId: parseInt(jobId),
      jobTitle: job.title,
      timestamp: new Date().toISOString(),
      status: 'Pending Review',
      ...applicationData
    };

    // Add new application to array
    existingApplications.push(newApplication);

    // Save back to localStorage
    localStorage.setItem('jobApplications', JSON.stringify(existingApplications));

    return newApplication;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll to the first error
      const firstErrorField = document.querySelector(".error-message");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Set submitting state
    setIsSubmitting(true);

    // Prepare file data for storage
    // In a real app, you'd upload files to a server and store URLs
    // For this demo, we'll just store file names
   

    // Prepare application data
    const applicationData = {
      ...formData,
      
    };

    // Simulate API call with timeout
    setTimeout(() => {
      // Save application to localStorage
      const savedApplication = saveApplicationToLocalStorage(applicationData);
      console.log("Application saved:", savedApplication);

      // Reset form and show success message
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Redirect after 3 seconds
      setTimeout(() => {
        window.scrollTo(0, 0); // Ensure we're at the top before navigating
        navigate("/careers");
      }, 3000);
    }, 1500);
  };

  // If job not found, redirect to careers page
useEffect(() => {
  if (allJobs.length > 0 && !job) {
    navigate("/careers");
  }
}, [allJobs, job, navigate]);

  if (!job) {
    return null; // Will redirect via useEffect
  }

  if (submitSuccess) {
    return (
      <div className="job-application-container">
        <div className="application-success">
          <FaCheckCircle className="success-icon" />
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for applying for the position of <strong>{job.title}</strong>.</p>
          <p>We have received your application and will review it shortly. If your qualifications match our requirements, our HR team will contact you for the next steps.</p>
          <p>You will be redirected to the careers page in a few seconds...</p>
          <Link to="/careers" className="back-to-careers">Return to Careers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="job-application-container">
      <div className="application-header">
        <Link to="/careers" className="back-link">
          <FaArrowLeft /> Back to Careers
        </Link>
        <h1>Apply for <span>{job.title}</span></h1>
        <div className="job-details-summary">
          <div className="job-detail-item">
            <strong>Location:</strong> {job.location}
          </div>
          <div className="job-detail-item">
            <strong>Type:</strong> {job.type}
          </div>
          <div className="job-detail-item">
            <strong>Experience:</strong> {job.experience}
          </div>
        </div>
      </div>

      <div className="application-form-container">
        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Personal Information</h2>

            <div className="form-row">
              <div className="form-group3">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && <div className="error-message"><FaExclamationCircle /> {errors.firstName}</div>}
              </div>

              <div className="form-group3">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && <div className="error-message"><FaExclamationCircle /> {errors.lastName}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group3">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <div className="error-message"><FaExclamationCircle /> {errors.email}</div>}
              </div>

              <div className="form-group3">
                <label htmlFor="phone">Phone Number *</label>
               <input
  type="tel"
  id="phone"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="+91 XXXXX XXXXX"
  className={errors.phone ? "error" : ""}
/>

                {errors.phone && <div className="error-message"><FaExclamationCircle /> {errors.phone}</div>}
              </div>
            </div>

            <div className="form-group3">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && <div className="error-message"><FaExclamationCircle /> {errors.address}</div>}
            </div>

            <div className="form-row">
              <div className="form-group3">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? "error" : ""}
                />
                {errors.city && <div className="error-message"><FaExclamationCircle /> {errors.city}</div>}
              </div>

              <div className="form-group3">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={errors.state ? "error" : ""}
                />
                {errors.state && <div className="error-message"><FaExclamationCircle /> {errors.state}</div>}
              </div>

              <div className="form-group3">
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
  type="text"
  id="zipCode"
  name="zipCode"
  value={formData.zipCode}
  onChange={handleChange}
  className={errors.zipCode ? "error" : ""}
/>

                {errors.zipCode && <div className="error-message"><FaExclamationCircle /> {errors.zipCode}</div>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Professional Information</h2>

            <div className="form-group3">
              <label htmlFor="education">Education *</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="List your degrees, institutions, and graduation years"
                className={errors.education ? "error" : ""}
                rows="3"
              ></textarea>
              {errors.education && <div className="error-message"><FaExclamationCircle /> {errors.education}</div>}
            </div>

            <div className="form-group3">
              <label htmlFor="experience">Professional Experience *</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Summarize your relevant work experience"
                className={errors.experience ? "error" : ""}
                rows="4"
              ></textarea>
              {errors.experience && <div className="error-message"><FaExclamationCircle /> {errors.experience}</div>}
            </div>

            <div className="form-row">
              <div className="form-group3">
                <label htmlFor="currentEmployer">Current Employer</label>
                <input
                  type="text"
                  id="currentEmployer"
                  name="currentEmployer"
                  value={formData.currentEmployer}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group3">
                <label htmlFor="currentPosition">Current Position</label>
                <input
                  type="text"
                  id="currentPosition"
                  name="currentPosition"
                  value={formData.currentPosition}
                  onChange={handleChange}
                />
                
              </div>
            </div>

            <div className="form-group3">
              <label htmlFor="startDate">Earliest Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.startDate && <div className="error-message"><FaExclamationCircle /> {errors.startDate}</div>}
            </div>
          </div>

        
          <div className="form-section">
            <div className="form-group3 checkbox-group">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={errors.agreeToTerms ? "error" : ""}
              />
              <label htmlFor="agreeToTerms">
                I certify that all information provided is true and complete to the best of my knowledge. I understand that false information may disqualify me from consideration. *
              </label>
            </div>
            {errors.agreeToTerms && <div className="error-message"><FaExclamationCircle /> {errors.agreeToTerms}</div>}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/careers")}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
