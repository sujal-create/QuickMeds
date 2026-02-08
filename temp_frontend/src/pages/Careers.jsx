import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Careers.css";
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaClock, FaUserMd, FaHospital, FaStethoscope, FaHeartbeat, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaArrowLeft} from "react-icons/fa";
const Careers = () => {
  // Sample job listings data
 

// Inside Careers component
const [allJobs, setAllJobs] = useState([]);

useEffect(() => {
  const jobsFromStorage = JSON.parse(localStorage.getItem("jobs")) || [];
  setAllJobs(jobsFromStorage);
}, []);


  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [expandedJobId, setExpandedJobId] = useState(null);

  // Filter jobs based on search term and filters
  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;

    const matchesJobType = selectedJobType === "All" || job.type === selectedJobType;

    return matchesSearch && matchesCategory && matchesJobType;
  });

  // Handle job card click to expand/collapse
  const toggleJobExpand = (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
      // Scroll the job card into view with a slight delay to ensure the expanded content is rendered
      setTimeout(() => {
        const element = document.getElementById(`job-card-${jobId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    
    <div className="careers-container">
       <div className="page-navigation2">
        <Link to="/contact" className="back-button2">
          <FaArrowLeft /> Back 
        </Link>
      </div>
      <div className="careers-header">
        <div className="careers-title-container">
          <h1 className="careers-title">CAREER <span>OPPORTUNITIES</span></h1>
          <div className="careers-title-decoration left"></div>
          <div className="careers-title-decoration right"></div>
        </div>
      </div>
       

      <div className="careers-intro">
        <div className="careers-intro-icon">
          <FaBriefcase />
        </div>
        <div className="careers-intro-content">
          <h2>Join Our Team at QuickMeds</h2>
          <p>
            At QuickMeds, we&apos;re dedicated to providing exceptional healthcare services.
            We&apos;re looking for talented professionals who share our commitment to patient care
            and innovation. Explore our current openings and become part of our mission to
            improve healthcare accessibility and quality.
          </p>
        </div>
      </div>

      <div className="careers-search-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Categories</option>
              <option value="Medical">Medical</option>
              <option value="Administrative">Administrative</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Job Type:</label>
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
      </div>

      <div className="careers-content">
        <div className="careers-sidebar">
          <div className="sidebar-section">
            <h3>Why Join Us?</h3>
            <ul className="benefits-list">
              <li>
                <FaUserMd className="benefit-icon" />
                <div className="benefit-text">
                  <h4>Professional Growth</h4>
                  <p>Continuous learning and development opportunities</p>
                </div>
              </li>
              <li>
                <FaHospital className="benefit-icon" />
                <div className="benefit-text">
                  <h4>Modern Facilities</h4>
                  <p>State-of-the-art equipment and technology</p>
                </div>
              </li>
              <li>
                <FaStethoscope className="benefit-icon" />
                <div className="benefit-text">
                  <h4>Collaborative Environment</h4>
                  <p>Work with multidisciplinary healthcare teams</p>
                </div>
              </li>
              <li>
                <FaHeartbeat className="benefit-icon" />
                <div className="benefit-text">
                  <h4>Meaningful Impact</h4>
                  <p>Make a difference in patients&apos; lives every day</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Application Process</h3>
            <ol className="process-list">
              <li>Browse and select a position that matches your skills</li>
              <li>Submit your application with resume and cover letter</li>
              <li>Initial screening and interview process</li>
              <li>Final interview and offer</li>
            </ol>
          </div>
        </div>

        <div className="job-listings">
          <h2>Current Openings ({filteredJobs.length})</h2>

          {filteredJobs.length === 0 ? (
            <div className="no-jobs-message">
              <p>No jobs match your search criteria. Please try different filters.</p>
            </div>
          ) : (
            <div className="job-cards">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  id={`job-card-${job.id}`}
                  className={`job-card ${expandedJobId === job.id ? 'expanded' : ''}`}
                  onClick={() => toggleJobExpand(job.id)}
                >
                  <div className="job-card-header">
                    <h3>{job.title}</h3>
                    <span className={`job-type ${job.type.toLowerCase().replace('-', '')}`}>
                      {job.type}
                    </span>
                  </div>

                  <div className="job-card-details">
                    <div className="job-detail">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>{job.location}</span>
                    </div>
                    <div className="job-detail">
                      <FaClock className="detail-icon" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="job-detail">
                      <FaBriefcase className="detail-icon" />
                      <span>{job.category}</span>
                    </div>
                  </div>

                  <p className="job-description">{job.description}</p>

                  {expandedJobId === job.id && (
                    <div className="job-expanded-content">
                      <h4>Requirements:</h4>
                      <ul className="requirements-list">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>

                      <Link to={`/apply/${job.id}`} className="apply-btn">Apply Now</Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="careers-contact-section">
        <h2>Have Questions?</h2>
        <p>
          If you have any questions about our open positions or the application process,
          please don&apos;t hesitate to contact our HR department.
        </p>
        <div className="contact-details">
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <span>careers@quickmeds.com</span>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <span>+91 7610312515</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
