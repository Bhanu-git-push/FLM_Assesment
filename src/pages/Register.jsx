import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const navigate = useNavigate();

  const inputTags = ["First Name", "Last Name", "Email", "Mobile", "Password"];

  const inputTypes = {
    "First Name": "text",
    "Last Name": "text",
    "Email": "email",
    "Mobile": "number",
    "Password": "password",
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    const userData = {
      id: uuidv4(),
      ...formData,
    };

    try {
      await axios.post("http://localhost:3001/users", userData);
      setLoading(false);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Failed to register. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {inputTags.map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="block mb-1 font-medium text-gray-700 text-left"
              >
                {field.charAt(0) + field.slice(1)}:
              </label>
              <input
                type={inputTypes[field]}
                id={field}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
