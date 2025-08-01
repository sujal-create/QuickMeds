import { useContext } from "react";
import "./Top_doctors.css";

import { GoDotFill } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../pages/context/Appcontext";

const Top_doctors = () => {
  const navigate = useNavigate();
  const { doc_images } = useContext(AppContext);


  if (!doc_images || !doc_images.Alldoctors) {
    return <p>Loading doctors...</p>;
  }

  return (
    <div className="doctors-container">
      <h1 className="special-heading">Browse Top Specialists</h1>
      <p className="special-subheading">
        Connect with our highly qualified medical specialists for personalized care and expert consultations
      </p>

      <div className="doctors-grid">
        {doc_images.Alldoctors.slice(0, 10).map((item) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="top-doctor2"
            key={item._id}
          >
            <img src={item.image} alt={`${item.name} profile`} />

            <p className="doctor-name">{item.name}</p>
            <p className="specialty">{item.specialty}</p>

            <div className="status-container">
              <GoDotFill className="dot" />
              <p className="status">Available</p>
            </div>
          </div>
        ))}
      </div>
      <div onClick={() => navigate("Doctors")} className="more-btn">
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          View All Specialists <FaArrowRight style={{ marginLeft: '8px' }} />
        </span>
      </div>
    </div>
  );
};

export default Top_doctors;
