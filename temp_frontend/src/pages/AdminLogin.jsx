import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dispatchAuthEvent } from "../utils/authEvents";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");
    if (adminAuth?.isAuthenticated) {
      navigate("/admin/messages");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUsername = "admin";
    const adminPassword = "admin@123";

    if (
      credentials.username === adminUsername &&
      credentials.password === adminPassword
    ) {
      localStorage.setItem("adminAuth", JSON.stringify({
        isAuthenticated: true,
        timestamp: new Date().toISOString(),
      }));
      localStorage.setItem("isAdmin", "true");

      dispatchAuthEvent();
      navigate("/admin/messages");
    } else {
      setError("Invalid username or password");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
