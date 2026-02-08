import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { dispatchAuthEvent } from "../utils/authEvents";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userAuth = JSON.parse(localStorage.getItem("userAuth") || "null");
      const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");

      if (userAuth?.isAuthenticated) {
        navigate("/");
      } else if (adminAuth?.isAuthenticated) {
        navigate("/admin/messages");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === credentials.email);

    if (user) {
      if (user.password === credentials.password) {
        localStorage.setItem("userAuth", JSON.stringify({
          isAuthenticated: true,
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          timestamp: new Date().toISOString()
        }));

        dispatchAuthEvent();
        navigate("/");
      } else {
        setError("Invalid password. Please try again.");
      }
    } else {
      setError("No account found with this email. Please sign up first.");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">User Login</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
          <p className="mt-2">
            Admin?{" "}
            <Link to="/admin/login" className="text-blue-600 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
