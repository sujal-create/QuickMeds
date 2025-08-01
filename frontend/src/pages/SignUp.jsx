import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { dispatchAuthEvent } from "../utils/authEvents";

const SignUp = () => {
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth") || "null");
    const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");

    if (userAuth?.isAuthenticated) {
      navigate("/");
    } else if (adminAuth?.isAuthenticated) {
      navigate("/admin/messages");
    } else {
      setLoading(false);
    }
  }, [navigate]);

 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "phone") {
    // Only digits, max 10 characters
    const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: onlyDigits }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
};


  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, password, confirmPassword, } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Min 6 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
  else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be exactly 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = existingUsers.some(user => user.email === formData.email);
    if (emailExists) {
      setErrors((prev) => ({ ...prev, email: "Email already registered" }));
      return;
    }

    const newUser = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    delete newUser.confirmPassword;

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    localStorage.setItem("userAuth", JSON.stringify({
      isAuthenticated: true,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      userId: newUser.id,
      timestamp: new Date().toISOString(),
    }));

    dispatchAuthEvent();
    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-start pt-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 tracking-wide">
          Create <span className="text-blue-500">Account</span>
        </h1>
        <div className="w-24 h-1 bg-blue-400 mx-auto mt-2 rounded" />
      </div>

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl">
        {success && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-center font-medium">
            ✅ Account created! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={success}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.firstName && "border-red-500"}`}
              />
              {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={success}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.lastName && "border-red-500"}`}
              />
              {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={success}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.email && "border-red-500"}`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Phone (optional)</label>
           
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={success}
              placeholder="e.g., +91 9876543210"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.phone && "border-red-500"}`}
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Password */}
  <div>
    <label className="block font-medium mb-1">Password *</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        disabled={success}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10 ${errors.password && "border-red-500"}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
      >
      
      </button>
    </div>
    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block font-medium mb-1">Confirm Password *</label>
    <div className="relative">
      <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        disabled={success}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10 ${errors.confirmPassword && "border-red-500"}`}
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
      >
       
      </button>
    </div>
    {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
  </div>
</div>  


          <p className="text-sm text-gray-600">
            By creating an account, you agree to our
            <Link to="#" className="text-blue-600 underline ml-1">Terms of Service</Link> and
            <Link to="#" className="text-blue-600 underline ml-1">Privacy Policy</Link>.
          </p>

          <button
            type="submit"
            disabled={success}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <p className="text-center mt-4 text-gray-700">
            Already have an account?
            <Link to="/login" className="text-blue-600 underline ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
