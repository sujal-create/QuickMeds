import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function SSO() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [message, setMessage] = useState(
    "Signing you in..."
  );

  useEffect(() => {
    const handleSSO = async () => {
      try {
        // Get CureGo JWT from URL
        const token = searchParams.get("token");

        console.log("SSO token received:", !!token);

        // No token
        if (!token) {
          setMessage("Authentication token missing.");

          setTimeout(() => {
            navigate("/login");
          }, 1500);

          return;
        }

        // Check API URL
        if (!API_URL) {
          console.error(
            "VITE_API_BASE_URL is missing"
          );

          setMessage(
            "QuickMeds API configuration missing."
          );

          return;
        }

        // Verify CureGo JWT
        const response = await fetch(
          `${API_URL}/api/users/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("SSO response:", data);

        // Invalid token
        if (!response.ok) {
          console.error(
            "SSO verification failed:",
            data
          );

          localStorage.removeItem("token");

          setMessage(
            data.message ||
              "Authentication failed."
          );

          setTimeout(() => {
            navigate("/login");
          }, 1500);

          return;
        }

        // =========================================
        // LOGIN SUCCESS
        // =========================================

        // Save JWT
        localStorage.setItem(
          "token",
          token
        );

        // Save user
        localStorage.setItem(
          "quickmeds_user",
          JSON.stringify(data)
        );

        // Some existing QuickMeds components
        // may use "user"
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        // Notify application
        window.dispatchEvent(
          new CustomEvent(
            "quickmeds_auth_updated"
          )
        );

        setMessage(
          `Welcome ${
            data.name ||
            data.firstName ||
            ""
          }! Redirecting...`
        );

        // Go to QuickMeds home
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        console.error(
          "SSO error:",
          error
        );

        setMessage(
          "Unable to connect to QuickMeds server."
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    handleSSO();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full mx-4">

        {/* Loading */}
        <div className="flex justify-center mb-5">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          QuickMeds
        </h1>

        <p className="mt-3 text-gray-600">
          {message}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Please wait...
        </p>
      </div>
    </div>
  );
}