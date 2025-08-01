import { useEffect } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Speciality from "../components/speciality";
import Top_doctors from "../components/Top_doctors";

const Home = () => {
  // Ensure home page loads properly without admin redirects
  useEffect(() => {
    // This ensures the home page is accessible to everyone
    // Admin authentication is only checked in admin-specific pages
  }, []);

  return (
    <div>
      <Header />
      <Speciality />
      <Top_doctors />
      <Banner />
    </div>
  );
};

export default Home;
