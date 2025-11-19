import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const navigate = useNavigate();

  const inputTags = [
    "First Name",
    "Last Name",
    "Email",
    "Mobile",
    "Password",
    "Confirm Password",
  ];

  const fields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      id: "mobile",
      label: "Mobile",
      type: "number",
      placeholder: "Enter your mobile number",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter your password",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.id]: e.target.value });
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    // const userData = {
    //   id: uuidv4(),
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   email: formData.email,
    //   mobile: formData.mobile,
    //   password: formData.password,
    // };

    // console.log(userData);

    // try {
    //   await axios.post("http://localhost:3001/users", userData);
    //   setLoading(false);
    //   alert("Registration successful!");
    //   navigate("/login");
    // } catch (err) {
    //   setLoading(false);
    //   setError("Failed to register. Try again.");
    //   console.error(err);
    // }
    try {
      // Fetch users to check duplicates
      const res = await axios.get("http://localhost:3001/users");
      const users = res.data;

      const emailExists = users.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );

      const mobileExists = users.some((u) => u.mobile === formData.mobile);

      if (emailExists) {
        setLoading(false);
        setError("This email is already registered.");
        return;
      }

      if (mobileExists) {
        setLoading(false);
        setError("Mobile number is already registered.");
        return;
      }

      // If not duplicate → POST
      const userData = {
        id: uuidv4(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      };

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
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col">
              <label
                htmlFor={field.id}
                className="block mb-1 font-medium text-gray-700 text-left"
              >
                {field.label}:
              </label>
              <input
                id={field.id}
                type={
                  field.id === "password" || field.id === "confirmPassword"
                    ? showPassword
                      ? "text"
                      : "password"
                    : field.type
                }
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <label
            className="d-flex align-items-center gap-2 mt-2 text-sm text-gray-700"
            htmlFor="showPasswordToggle"
          >
            <input
              id="showPasswordToggle"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4"
            />
            Show Password
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 items-center justify-center gap-2"
            disabled={loading}
          >
            {/* {loading ? "Registering..." : "Register"} */}
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
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
