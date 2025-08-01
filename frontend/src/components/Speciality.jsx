import "./speciality.css";
import {Specialists} from "../assets/assets";
import { Link } from "react-router-dom";



const Speciality = () => {
  // Descriptions for each specialist type
  const specialistDescriptions = {
    "Family Doctor": "General healthcare for all ages",
    "Dermatologist": "Skin, hair & nail specialist",
    "Pediatrician": "Child healthcare expert",
    "Neurologist": "Brain & nervous system care",
    "GI Specialist": "Digestive system expert",
    "Gynecologist": "Women's health specialist"
  };

  // Statistics for each specialist type
  const specialistStats = {
    "Family Doctor": { doctors: 42, experience: "8+", rating: 4.8 },
    "Dermatologist": { doctors: 28, experience: "10+", rating: 4.7 },
    "Pediatrician": { doctors: 35, experience: "12+", rating: 4.9 },
    "Neurologist": { doctors: 23, experience: "15+", rating: 4.8 },
    "GI Specialist": { doctors: 19, experience: "9+", rating: 4.6 },
    "Gynecologist": { doctors: 31, experience: "11+", rating: 4.7 }
  };

  return (
    <section className="speciality-section">
      <div id="speciality" style={{ scrollMarginTop: '100px' }}>
        <h1 className="heading">Choose Your <span>Medical Specialty</span></h1>
        <p className="subheading">
          Select from our range of medical specialties to find the right healthcare expert for your specific needs.
          Each specialty offers qualified professionals dedicated to providing exceptional care.
        </p>
      </div>
      <div className="specialist-container">
        {Specialists.map((item, index) => (
          <div
            className="specialist"
            key={index}
          >
            <Link to={`/doctors/${item.name}`}>
              <div className="specialist-icon-container">
                <img className="images" src={item.imageUrl} alt={item.name} />
              </div>
              <p className="image_name">{item.name}</p>
              <p className="specialist-description">{specialistDescriptions[item.name]}</p>

              <div className="specialist-stats">
                <div className="stat">
                  <span className="stat-value">{specialistStats[item.name].doctors}</span>
                  <span className="stat-label">Doctors</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{specialistStats[item.name].experience}</span>
                  <span className="stat-label">Years</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{specialistStats[item.name].rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>

              <button className="specialist-cta">View Doctors</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Speciality;
