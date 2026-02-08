import  { createContext } from "react";
import PropTypes from "prop-types";
import doc_images from "../../assets/assets.js"; // Original images import
import { doctorsData } from "../../assets/assetsNew.js"; // Import doctorsData from assetsNew.js


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // Combine both data sources
  // Add doctorsData to Alldoctors in doc_images
  const combinedDoctors = doc_images.Alldoctors ? [...doc_images.Alldoctors] : [];

  // Add doctorsData to the combined list, avoiding duplicates
  if (doctorsData) {
    doctorsData.forEach(doctor => {
      // Check if doctor already exists in combinedDoctors by ID
      if (!combinedDoctors.some(existingDoc => existingDoc._id === doctor._id)) {
        combinedDoctors.push(doctor);
      }
    });
  }

  // Create a new object with the combined data
  const enhancedDocImages = {
    ...doc_images,
    Alldoctors: combinedDoctors,
    doctorsData: doctorsData // Also provide doctorsData directly
  };

  const value = { doc_images: enhancedDocImages };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
