

import GeneralPhysician1 from "../assets/doc_images/genralphysian1.jpg";
import GeneralPhysician2 from "../assets/doc_images/genralphysian2.jpg";
import Gastroenterologist1 from "../assets/doc_images/Gastroenterologist1.jpg";
import Neurologist1 from "../assets/doc_images/Neurologist1.jpg";
import Neurologist2 from "../assets/doc_images/Neurologist2.jpg";
import Gynecologist1 from "../assets/doc_images/Gynecologist1.jpg";
import Gynecologist2 from "../assets/doc_images/Gynecologist2.jpg";
import Pediatrician1 from "../assets/doc_images/Pediatrician1.jpg";
import Dermatologist2 from "../assets/doc_images/dermatologist2.jpg";
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
import doc11 from "../assets/doc_images/doc11.jpeg";
import doc12 from "../assets/doc_images/doc12.jpeg";
import doc13 from "../assets/doc_images/doc13.jpeg";
import doc14 from "../assets/doc_images/doc14.jpeg";
import doc15 from "../assets/doc_images/doc15.jpeg";
import doc16 from "../assets/doc_images/doc16.jpeg";
import doc17 from "../assets/doc_images/doc17.jpeg";
import doc18 from "../assets/doc_images/doc18.jpeg";

export const doctorsData = [
  {
    _id: "1",
    name: "Dr. Richard James",
    image: GeneralPhysician1,
    specialty: "General Physician",
    degree: "MBBS",
    experience: "4 Years",
    about: "Dedicated to providing personalized and patient-centered medical care.",
    fees: 50,
    available: true,
    address: {
      line1: "123 Medical Center Drive",
      line2: "New York, NY 10001"
    }
  },
  {
    _id: "2",
    name: "Dr. Ava Thompson",
    image: GeneralPhysician2,
    specialty: "General Physician",
    degree: "MBBS, MD",
    experience: "6 Years",
    about: "Passionate about preventive medicine and chronic disease management.",
    fees: 60,
    available: false,
    address: {
      line1: "456 Health Avenue",
      line2: "Boston, MA 02108"
    }
  },
  {
    _id: "3",
    name: "Dr. John Smith",
    image: Gastroenterologist1,
    specialty: "Gastroenterologist",
    degree: "MBBS, MD, DM (Gastro)",
    experience: "10 Years",
    about: "Expert in digestive health and liver diseases.",
    fees: 40,
    available: true,
    address: {
      line1: "789 Digestive Care Center",
      line2: "Chicago, IL 60601"
    }
  },
  {
    _id: "4",
    name: "Dr. Emily Johnson",
    image: Neurologist1,
    specialty: "Neurologist",
    degree: "MBBS, MD, DM (Neurology)",
    experience: "8 Years",
    about: "Specialized in treating neurological disorders and brain health.",
    fees: 50,
    available: false,
    address: {
      line1: "234 Neuro Center",
      line2: "San Francisco, CA 94102"
    }
  },
  {
    _id: "5",
    name: "Dr. Mark Williams",
    image: Neurologist2,
    specialty: "Neurologist",
    degree: "MBBS, MD",
    experience: "7 Years",
    about: "Focused on treating conditions related to the nervous system.",
    fees: 80,
    available: true,
    address: {
      line1: "567 Brain Health Clinic",
      line2: "Seattle, WA 98101"
    }
  },
  {
    _id: "6",
    name: "Dr. Sarah Brown",
    image: Gynecologist1,
    specialty: "Gynecologist",
    degree: "MBBS, MS (OBG)",
    experience: "12 Years",
    about: "Providing expert care for women’s health and pregnancy.",
    fees: 90,
    available: true,
    address: {
      line1: "890 Women's Health Center",
      line2: "Los Angeles, CA 90001"
    }
  },
  {
    _id: "7",
    name: "Dr. Olivia Davis",
    image: Gynecologist2,
    specialty: "Gynecologist",
    degree: "MBBS, MS (OBG), DGO",
    experience: "15 Years",
    about: "Expert in infertility treatments and high-risk pregnancies.",
    fees: 75,
    available: false,
    address: {
      line1: "321 Fertility Clinic",
      line2: "Miami, FL 33101"
    }
  },
  {
    _id: "8",
    name: "Dr. James Wilson",
    image: Pediatrician1,
    specialty: "Pediatrician",
    degree: "MBBS, MD (Pediatrics)",
    experience: "9 Years",
    about: "Caring for children's health from infancy to adolescence.",
    fees: 80,
    available: true,
    address: {
      line1: "432 Children's Medical Plaza",
      line2: "Denver, CO 80202"
    }
  },
  {
    _id: "9",
    name: "Dr. Sophia Martinez",
    image: Dermatologist2,
    specialty: "Dermatologist",
    degree: "MBBS, MD (Dermatology)",
    experience: "5 Years",
    about: "Specialized in skin, hair, and nail care treatments.",
    fees: 70,
    available: false,
    address: {
      line1: "543 Skin Care Center",
      line2: "Phoenix, AZ 85001"
    }
  },
  {
    _id: "10",
    name: "Dr. Henry den ",
    image: doc1,
    specialty: "General Physician",
    degree: "MBBS",
    experience: "4 Years",
    about: "Dedicated to diagnosing and treating a wide range of general health conditions.",
    fees: 50,
    available: true,
    address: {
      line1: "654 Primary Care Clinic",
      line2: "Dallas, TX 75201"
    }
  },
  {
    _id: "11",
    name: "Dr. Sarah Lee",
    image: doc2,
    specialty: "Dermatologist",
    degree: "MD Dermatology",
    experience: "6 Years",
    about: "Provides effective skincare solutions and cosmetic dermatology treatments.",
    fees: 80,
    available: false,
    address: {
      line1: "765 Beauty Dermatology",
      line2: "Atlanta, GA 30301"
    }
  },
  {
    _id: "12",
    name: "Dr. Amanda Clark",
    image: doc3,
    specialty: "Pediatrician",
    degree: "MD Pediatrics",
    experience: "5 Years",
    about: "Committed to the physical and emotional well-being of children.",
    fees: 70,
    available: true,
    address: {
      line1: "876 Kids Health Center",
      line2: "Portland, OR 97201"
    }
  },
  {
    _id: "13",
    name: "Dr. Michael Turner",
    image: doc4,
    specialty: "Neurologist",
    degree: "MD Neurology",
    experience: "8 Years",
    about: "Expert in diagnosing and managing brain and nervous system disorders.",
    fees: 45,
    available: true,
    address: {
      line1: "987 Neurology Institute",
      line2: "Philadelphia, PA 19101"
    }
  },
  {
    _id: "14",
    name: "Dr. Priya Sharma",
    image: doc6,
    specialty: "Gastroenterologist",
    degree: "DM Gastroenterology",
    experience: "7 Years",
    about: "Specialist in digestive system disorders and liver diseases.",
    fees: 90,
    available: false,
    address: {
      line1: "135 Digestive Health Center",
      line2: "Houston, TX 77001"
    }
  },
  {
    _id: "15",
    name: "Dr. David Wright",
    image: doc5,
    specialty: "Orthopedic Surgeon",
    degree: "MS Orthopedics",
    experience: "9 Years",
    about: "Performs surgeries and treatments for bone, joint, and muscle issues.",
    fees: 65,
    available: true,
    address: {
      line1: "246 Orthopedic Center",
      line2: "Detroit, MI 48201"
    }
  },
  {
    _id: "16",
    name: "Dr. Eliana Gomez",
    image: doc7,
    specialty: "Cardiologist",
    degree: "DM Cardiology",
    experience: "10 Years",
    about: "Focused on treating heart conditions and promoting cardiovascular health.",
    fees: 55,
    available: true,
    address: {
      line1: "357 Heart Institute",
      line2: "Minneapolis, MN 55401"
    }
  },
  {
    _id: "17",
    name: "Dr. Rahul Patel",
    image: doc8,
    specialty: "Endocrinologist",
    degree: "MD Endocrinology",
    experience: "6 Years",
    about: "Treats hormonal imbalances and metabolic disorders with precision.",
    fees: 55,
    available: true,
    address: {
      line1: "468 Endocrine Specialists",
      line2: "Nashville, TN 37201"
    }
  },
  {
    _id: "18",
    name: "Dr. Maria Chen",
    image: doc9,
    specialty: "Oncologist",
    degree: "MD Oncology",
    experience: "11 Years",
    about: "Experienced in cancer diagnosis, treatment, and patient care strategies.",
    fees: 75,
    available: true,
    address: {
      line1: "579 Cancer Treatment Center",
      line2: "New Orleans, LA 70112"
    }
  },
  {
    _id: "19",
    name: "Dr. Ahmed Yusuf",
    image: doc10,
    specialty: "Psychiatrist",
    degree: "MD Psychiatry",
    experience: "8 Years",
    about: "Helps individuals manage mental health issues with compassion and expertise.",
    fees: 95,
    available: true,
    address: {
      line1: "680 Mental Health Clinic",
      line2: "Salt Lake City, UT 84101"
    }
  },
  {
    _id: "20",
    name: "Dr. Jennifer Roberts",
    image: doc11,
    specialty: "Orthopedic Surgeon",
    degree: "MS Orthopedics",
    experience: "7 Years",
    about: "Specializes in joint replacement surgeries and sports injury treatments.",
    fees: 60,
    available: true,
    address: {
      line1: "789 Orthopedic Center",
      line2: "Austin, TX 78701"
    }
  },
  {
    _id: "21",
    name: "Dr. Robert Chen",
    image: doc12,
    specialty: "Cardiologist",
    degree: "DM Cardiology",
    experience: "9 Years",
    about: "Expert in diagnosing and treating heart conditions and cardiovascular diseases.",
    fees: 90,
    available: true,
    address: {
      line1: "456 Heart Care Center",
      line2: "San Diego, CA 92101"
    }
  },
  {
    _id: "22",
    name: "Dr. Lisa Patel",
    image: doc13,
    specialty: "Psychiatrist",
    degree: "MD Psychiatry",
    experience: "8 Years",
    about: "Specializes in treating depression, anxiety, and other mental health conditions with compassionate care.",
    fees: 65,
    available: true,
    address: {
      line1: "234 Mental Health Center",
      line2: "Pittsburgh, PA 15222"
    }
  },
  {
    _id: "23",
    name: "Dr. Thomas Wilson",
    image: doc14,
    specialty: "Endocrinologist",
    degree: "MD Endocrinology",
    experience: "11 Years",
    about: "Provides comprehensive care for diabetes, thyroid disorders, and other hormonal conditions.",
    fees: 80,
    available: true,
    address: {
      line1: "567 Endocrine Specialists",
      line2: "Cleveland, OH 44113"
    }
  },
  {
    _id: "24",
    name: "Dr. Sophia Kim",
    image: doc15,
    specialty: "Orthopedic Surgeon",
    degree: "MS Orthopedics",
    experience: "6 Years",
    about: "Specializes in minimally invasive orthopedic procedures and rehabilitation therapy.",
    fees: 70,
    available: true,
    address: {
      line1: "890 Sports Medicine Center",
      line2: "Indianapolis, IN 46204"
    }
  },
  {
    _id: "25",
    name: "Dr. James Rodriguez",
    image: doc16,
    specialty: "Cardiologist",
    degree: "DM Cardiology",
    experience: "10 Years",
    about: "Expert in interventional cardiology and heart rhythm disorders.",
    fees: 55,
    available: true,
    address: {
      line1: "123 Cardiac Care Institute",
      line2: "Charlotte, NC 28202"
    }
  },
  {
    _id: "26",
    name: "Dr. Emma Thompson",
    image: doc17,
    specialty: "Psychiatrist",
    degree: "MD Psychiatry",
    experience: "9 Years",
    about: "Specializes in cognitive behavioral therapy and mood disorders treatment.",
    fees: 75,
    available: false,
    address: {
      line1: "456 Behavioral Health Center",
      line2: "Columbus, OH 43215"
    }
  },
  {
    _id: "27",
    name: "Dr. Daniel Garcia",
    image: doc18,
    specialty: "Endocrinologist",
    degree: "MD Endocrinology",
    experience: "12 Years",
    about: "Provides specialized care for complex hormonal disorders and metabolic conditions.",
    fees: 85,
    available: true,
    address: {
      line1: "789 Metabolic Health Center",
      line2: "Tampa, FL 33602"
    }
  }
];



const doc_images = { doctorsData };
export default doc_images;