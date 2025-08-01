import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";
import MessageAdmin from "./pages/MessageAdmin";
import ApplicationsAdmin from "./pages/ApplicationsAdmin";
import AppointmentsAdmin from "./pages/AppointmentsAdmin";
import AdminLogin from "./pages/AdminLogin";
import SignUp from "./pages/SignUp";
import Careers from "./pages/Careers";
import JobApplication from "./pages/JobApplication";
import UserAppointments from "./pages/UserAppointments";
import Feedback from "./pages/Feedback";
import PaymentPage from "./pages/Paymentpage";
import AdminAddJob from "./pages/admin/AdminAddJob";
import PropTypes from "prop-types";
import AdminLayout from "./layouts/AdminLayout";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

// user layout wrapper
const UserLayout = ({ children }) => (
  <div className="mx-4 sm:mx-[10%]">
    <Navbar />
    {children}
    <Chatbot />
    <Footer />
  </div>
);

// redirect admin to admin dashboard if they're at root "/"
const RedirectAdminToDashboard = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();

  useEffect(() => {
    if (isAdmin && location.pathname === "/") {
      window.location.replace("/admin/messages");
    }
  }, [isAdmin, location]);

  return null;
};

const App = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <>
      <ScrollToTop />
      <RedirectAdminToDashboard />
      <Routes>
        {/* ✅ Admin-only layout - No navbar/footer/chatbot */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="messages" element={<MessageAdmin />} />
          <Route path="applications" element={<ApplicationsAdmin />} />
          <Route path="appointments" element={<AppointmentsAdmin />} />
          <Route path="add-job" element={<AdminAddJob />} />
        </Route>

        {/* ✅ Admin login page (no navbar/footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Regular user pages */}
        {!isAdmin && (
          <>
            <Route path="/" element={<UserLayout><Home /></UserLayout>} />
            <Route path="/about" element={<UserLayout><About /></UserLayout>} />
            <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />
            <Route path="/doctors" element={<UserLayout><Doctor /></UserLayout>} />
            <Route path="/doctors/:speciality" element={<UserLayout><Doctor /></UserLayout>} />
            <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
            <Route path="/signup" element={<UserLayout><SignUp /></UserLayout>} />
            <Route path="/appointment/:DocId" element={<UserLayout><Appointment /></UserLayout>} />
            <Route path="/careers" element={<UserLayout><Careers /></UserLayout>} />
            <Route path="/apply/:jobId" element={<UserLayout><JobApplication /></UserLayout>} />
            <Route path="/my-appointments" element={<UserLayout><UserAppointments /></UserLayout>} />
            <Route path="/feedback" element={<UserLayout><Feedback /></UserLayout>} />
            <Route path="/payment" element={<UserLayout><PaymentPage /></UserLayout>} />
          </>
        )}

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
