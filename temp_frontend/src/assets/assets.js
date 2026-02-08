import GeneralPhysician from "../assets/Gen_doc.png";
import Dermatologist from "../assets/Dermatologist.png";
import Pediatrician from "../assets/Pediatrician.png";
import Neurologist from "../assets/Neurologist.png";
import Gastroenterologist from "../assets/Gastroenterologist.png";
import Gynecologist from "../assets/Gynaecologist.png";

import doc1 from "../assets/doc_images/doc1.jpg";
import doc2 from "../assets/doc_images/doc2.jpg";
import doc3 from "../assets/doc_images/doc3.jpg";
import doc4 from "../assets/doc_images/doc4.jpg";
import doc5 from "../assets/doc_images/doc5.jpg";
import doc6 from "../assets/doc_images/doc6.jpg";
import doc7 from "../assets/doc_images/doc7.jpg";
import doc8 from "../assets/doc_images/doc8.jpg";
import doc9 from "../assets/doc_images/doc9.jpg";
import doc10 from "../assets/doc_images/doc10.jpg";






const Specialists = [
  {
    name: "Family Doctor",
    imageUrl: GeneralPhysician,
  },
  {
    name: "Dermatologist",
    imageUrl: Dermatologist,
  },
  {
    name: "Pediatrician",
    imageUrl: Pediatrician,
  },
  {
    name: "Neurologist",
    imageUrl: Neurologist,
  },
  {
    name: "GI Specialist",
    imageUrl: Gastroenterologist,
  },
  {
    name: "Gynecologist",
    imageUrl: Gynecologist,
  },
];

const Alldoctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    specialty: "General Physician",
    degree: "MBBS",
    experience: "4 Years",
    about: "Dedicated to providing personalized and patient-centered medical care.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Sarah Lee",
    image: doc2,
    specialty: "Dermatologist",
    degree: "MD Dermatology",
    experience: "6 Years",
    about: "Expert in skincare, specializing in acne and anti-aging treatments.",
    fees: 80,
    address: {
      line1: "21st Avenue, Greenfield",
      line2: "Maple Street, Toronto",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Amanda Clark",
    image: doc3,
    specialty: "Pediatrician",
    degree: "MD Pediatrics",
    experience: "5 Years",
    about: "Compassionate healthcare provider for children of all ages.",
    fees: 70,
    address: {
      line1: "5th Street, Sunrise Valley",
      line2: "Central Avenue, Boston",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Michael Turner",
    image: doc4,
    specialty: "Neurologist",
    degree: "MD Neurology",
    experience: "8 Years",
    about: "Specializes in treating migraines and other neurological conditions.",
    fees: 100,
    address: {
      line1: "12th Main, Brainwood",
      line2: "Neuro Lane, Chicago",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Priya Sharma",
    image: doc6,
    specialty: "Gastroenterologist",
    degree: "DM Gastroenterology",
    experience: "7 Years",
    about: "Expert in digestive health and gastrointestinal treatments.",
    fees: 90,
    address: {
      line1: "Main Boulevard, Sector 7",
      line2: "Hilltop Road, Mumbai",
    },
  },
  {
    _id: "doc6",
    name: "Dr. David Wright",
    image: doc5,
    specialty: "Orthopedic Surgeon",
    degree: "MS Orthopedics",
    experience: "9 Years",
    about: "Specialist in bone and joint surgery and rehabilitation.",
    fees: 120,
    address: {
      line1: "Sunshine Boulevard",
      line2: "Park Avenue, New York",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Eliana Gomez",
    image: doc7,
    specialty: "Cardiologist",
    degree: "DM Cardiology",
    experience: "10 Years",
    about: "Expert in heart health and cardiovascular treatments.",
    fees: 150,
    address: {
      line1: "Heartline Street",
      line2: "Downtown Avenue, Los Angeles",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Rahul Patel",
    image: doc8,
    specialty: "Endocrinologist",
    degree: "MD Endocrinology",
    experience: "6 Years",
    about: "Specializes in diabetes and hormonal disorders.",
    fees: 110,
    address: {
      line1: "Hormone Plaza",
      line2: "Health Street, Delhi",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Maria Chen",
    image: doc9,
    specialty: "Oncologist",
    degree: "MD Oncology",
    experience: "11 Years",
    about:
      "Expert in cancer diagnosis and treatment with a patient-focused approach.",
    fees: 200,
    address: {
      line1: "Cancer Care Center",
      line2: "Riverfront Lane, Shanghai",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Ahmed Yusuf",
    image: doc10,
    specialty: "Psychiatrist",
    degree: "MD Psychiatry",
    experience: "8 Years",
    about:
      "Helps patients navigate mental health challenges with compassionate care.",
    fees: 130,
    address: {
      line1: "Mind Wellness Street",
      line2: "Harmony Avenue, Dubai",
    },
  },
];




// ✅ Named exports
export { Specialists, Alldoctors };

// ✅ Default export (for importing everything at once)
const doc_images = { Specialists, Alldoctors };
export default doc_images;
