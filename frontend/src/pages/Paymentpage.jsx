import { useLocation, useNavigate } from "react-router-dom";
import { FaUserMd, FaCalendarAlt, FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointmentData } = location.state || {};
  const [isPaid, setIsPaid] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fixed conversion rate
  const dollarToRupee = 83.5;
  const amountInRupees = appointmentData.doctorFees * dollarToRupee;
  const amountInPaise = Math.round(amountInRupees * 100);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          amount: amountInPaise, // Send paise to backend
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Doctor Appointment",
        description: `Booking with Dr. ${appointmentData.doctorName}`,
        order_id: data.id,
        handler: function () {
          appointmentData.status = "Upcoming";
          const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
          existingAppointments.push(appointmentData);
          localStorage.setItem("appointments", JSON.stringify(existingAppointments));
          setIsPaid(true);
        },
        prefill: {
          name: appointmentData.patientName || "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#13c2c2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment Failed. Please try again.");
    }
  };

  if (!appointmentData) {
    return <p className="text-center text-red-500 mt-10">Invalid access to payment page.</p>;
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen p-4"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      }}
    >
      {!isPaid ? (
        <div className="bg-[#1c2b36] rounded-2xl shadow-lg p-6 w-full max-w-md border border-[#3fbfff]">
          <h2 className="text-2xl font-semibold text-center text-[#3fbfff] mb-6">Appointment Summary</h2>

          <div className="flex items-center text-gray-200 mb-4">
            <FaUserMd className="mr-3 text-[#3fbfff]" />
            <span>
              <strong>Doctor:</strong> {appointmentData.doctorName}
            </span>
          </div>

          <div className="flex items-center text-gray-200 mb-4">
            <FaCalendarAlt className="mr-3 text-[#3fbfff]" />
            <span>
              <strong>Date:</strong> {appointmentData.appointmentDate}
            </span>
          </div>

          <div className="flex items-center text-gray-200 mb-4">
            <FaClock className="mr-3 text-[#3fbfff]" />
            <span>
              <strong>Time:</strong> {appointmentData.appointmentTime}
            </span>
          </div>

          <div className="text-gray-200 mb-6">
            <span>
              <strong>Fee:</strong>{" "}
              ₹{amountInRupees.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-[#4949ef] to-[#13c2c2] hover:opacity-90 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Pay Now
          </button>
        </div>
      ) : (
        <div className="bg-[#1c2b36] rounded-2xl shadow-lg p-6 w-full max-w-md border border-green-400">
          <h2 className="text-2xl font-semibold text-center text-green-400 mb-6">Appointment Confirmed!</h2>

          <p className="text-gray-200 mb-2">
            <strong>Doctor:</strong> {appointmentData.doctorName}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Date:</strong> {appointmentData.appointmentDate}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Time:</strong> {appointmentData.appointmentTime}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Fee:</strong> ₹{amountInRupees.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-gray-300 mb-6">
            <strong>Appointment ID:</strong> #{appointmentData.id}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/my-appointments")}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition"
            >
              View My Appointments
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
            >
              X Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
