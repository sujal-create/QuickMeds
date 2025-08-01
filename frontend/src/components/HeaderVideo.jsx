import "./HeaderVideo.css";
import { useRef, useEffect } from "react";

const HeaderVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; 
    }
  }, []);

  return (
    <div className="video-container">
      <div className="blue-heartbeat-container">
        <svg className="heartbeat-svg" viewBox="0 0 1200 250" xmlns="http://www.w3.org/2000/svg">
          <path
            className="heartbeat-path"
            d="M0,100 L100,100 L200,90 L250,90 L270,40 L290,160 L310,30 L330,160 L350,90 L400,90 L500,100 L600,90 L650,90 L670,20 L690,180 L710,-10 L730,180 L750,90 L800,90 L900,100 L1000,90 L1050,90 L1070,40 L1090,160 L1110,30 L1130,160 L1150,90 L1200,90"
            fill="none"
            stroke="#4dabf7"
            strokeWidth="8"
          />
        </svg>
      </div>
      <div className="video-overlay"></div>
    </div>
  );
};

export default HeaderVideo;
