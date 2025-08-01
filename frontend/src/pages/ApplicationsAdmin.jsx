import { useEffect, useState } from "react";
import "./ApplicationsAdmin.css";

const ApplicationsAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("jobApplications")) || [];
    setApplications(stored);
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000${url}`;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="applications-admin">
      <h2>Job Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="application-summary">
                <h3>{app.firstName} {app.lastName}</h3>
                <p><strong>Job:</strong> {app.jobTitle}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <button className="view-btn" onClick={() => toggleExpand(app.id)}>
                  {expandedId === app.id ? "Hide Details" : "View Full Data"}
                </button>
              </div>

              {expandedId === app.id && (
                <div className="application-details">
                  <p><strong>Address:</strong> {app.address}, {app.city}, {app.state} - {app.zipCode}</p>
                  <p><strong>Education:</strong> {app.education}</p>
                  <p><strong>Experience:</strong> {app.experience}</p>
                  {app.currentEmployer && <p><strong>Current Employer:</strong> {app.currentEmployer}</p>}
                  {app.currentPosition && <p><strong>Current Position:</strong> {app.currentPosition}</p>}
                  {app.startDate && <p><strong>Earliest Start Date:</strong> {app.startDate}</p>}
                  {app.coverLetter && <p><strong>Cover Letter:</strong> {app.coverLetter}</p>}
                  <p><strong>Submitted:</strong> {new Date(app.timestamp).toLocaleString()}</p>

                  {app.resume?.url && (
                    <p>
                      <strong>Resume:</strong>{" "}
                      <a
                        href={`http://localhost:5000${app.resume.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={app.resume.name}
                        className="download-btn"
                      >
                        Download {app.resume.name}
                      </a>
                    </p>
                    
                  )}

                  {app.certificates?.length > 0 && (
                    <div>
                      <strong>Certificates:</strong>
                      <ul>
                        {app.certificates.map((cert, index) => (
                          <li key={index}>{cert.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsAdmin;