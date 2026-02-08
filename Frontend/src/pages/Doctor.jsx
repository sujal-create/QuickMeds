import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FaSearch, FaUserMd, FaHeartbeat, FaBrain, FaChild, FaCalendarAlt, FaClock } from "react-icons/fa";
import { GiMedicines, GiStomach, GiBrokenBone, GiHeartOrgan } from "react-icons/gi";
import { MdOutlinePsychology, MdOutlineHealthAndSafety } from "react-icons/md";
import "./Doctor.css";
// Import doctorsData from assetsNew.js and AppContext
import { doctorsData } from "../assets/assetsNew";
import { AppContext } from "./context/Appcontext";
const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [activeSpecialty, setActiveSpecialty] = useState(speciality || ""); 
  const [searchTerm, setSearchTerm] = useState("");
  const { doc_images } = useContext(AppContext);

  // Function to get icon for each specialty
  const getSpecialtyIcon = (specialty) => {
    switch(specialty) {
      case "General Physician":
        return <FaUserMd className="specialty-icon" />;
      case "Dermatologist":
        return <MdOutlineHealthAndSafety className="specialty-icon" />;
      case "Gynecologist":
        return <FaUserMd className="specialty-icon" />;
      case "Pediatrician":
        return <FaChild className="specialty-icon" />;
      case "Neurologist":
        return <FaBrain className="specialty-icon" />;
      case "Gastroenterologist":
        return <GiStomach className="specialty-icon" />;
      case "Orthopedic Surgeon":
        return <GiBrokenBone className="specialty-icon" />;
      case "Cardiologist":
        return <FaHeartbeat className="specialty-icon" />;
      case "Psychiatrist":
        return <MdOutlinePsychology className="specialty-icon" />;
      case "Endocrinologist":
        return <GiMedicines className="specialty-icon" />;
      case "Oncologist":
        return <GiHeartOrgan className="specialty-icon" />;
      default:
        return <FaUserMd className="specialty-icon" />;
    }
  };

  const specialties = [
    "General Physician",
    "Dermatologist",
    "Gynecologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
    "Orthopedic Surgeon",
    "Cardiologist",
    "Psychiatrist",
    "Endocrinologist",
    "Oncologist",
  ];


  useEffect(() => {
    // Use doctorsData from context
    const allDoctors = doc_images.doctorsData || doctorsData;

    if (speciality) {
      setFilterDoc(allDoctors.filter((doc) => doc.specialty === speciality));
    } else {
      setFilterDoc(allDoctors);
    }
    setActiveSpecialty(speciality || "");
  }, [speciality, doc_images]);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const doctorList = document.querySelector(".doctor-list2");

    const disableScroll = () => {
      doctorList.style.overflow = "hidden";
    };

    const enableScroll = () => {
      doctorList.style.overflow = "auto";
    };

    sidebar.addEventListener("mouseenter", disableScroll);
    sidebar.addEventListener("mouseleave", enableScroll);

    return () => {
      sidebar.removeEventListener("mouseenter", disableScroll);
      sidebar.removeEventListener("mouseleave", enableScroll);
    };
  }, []);

  return (
    <div className="doctor-container2">
      {/* Sidebar */}
      <div className="sidebar">
        <div
          className={`heading2 ${activeSpecialty === "" ? "active" : ""}`}
          onClick={() => {
            navigate("/doctors");
            setActiveSpecialty("");
          }}
        >
          <FaSearch className="search-icon" />
          Search Your Specialist
        </div>

        <div className="search-box-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="speciality-list2">
          {specialties
            .filter(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((spec, index) => (
            <p
              key={index}
              className={activeSpecialty === spec ? "active" : ""}
              onClick={() => {
                navigate(`/doctors/${spec}`);
                setActiveSpecialty(spec);
              }}
            >
              {getSpecialtyIcon(spec)}
              {spec}
            </p>
          ))}
        </div>
      </div>

      {/* Doctor List */}
      <div className="doctor-list2">
        {filterDoc.length > 0 ? (
          filterDoc.map((item, index) => (
            <div
              key={index}
              className="top-doctor"
              onClick={() => navigate(`/appointment/${item._id}`)}  // Use doctor ID instead of index
            >
              <div className="status-container2">
                <GoDotFill className={item.available ? "dot available" : "dot unavailable"} />
                <p className="status2">{item.available ? "Available" : "Unavailable"}</p>
              </div>
              <img src={item.image} alt={`${item.name} profile`} />
              <div className="doctor-info-container">
                <p className="doctor-name4">{item.name}</p>
                <p className="specialty4">{item.specialty}</p>

                <div className="doctor-details-row">
                  <div className="doctor-experience2">
                    <FaClock />
                    {item.experience}
                  </div>
                  {item.fees && (
                    <div className="doctor-fees">
                      
                      ${item.fees}
                    </div>
                  )}
                </div>

                <button className="book-now-btn">
                  <FaCalendarAlt />
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-doctors">Currently, No doctors are available</p>
        )}
      </div>
    </div>
  );
};

export default Doctor;
