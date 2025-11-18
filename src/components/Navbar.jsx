import React, { useState } from "react";
import { FaReact, FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginFailureAction,
  loginResetAction,
} from "../redux/authentication/actions";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth, user, isLoading, isError } = useSelector(
    (state) => state.AuthenticationReducer
  );

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    dispatch(loginResetAction());
    // dispatch(loginFailureAction());
    navigate("/login");
  };

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaReact size={40} /> {/* 40px icon */}
        </div>
        <div className="hidden md:flex space-x-6">
          <a
            style={{ textDecoration: "none" }}
            className="hover:text-indigo-600"
            href="#"
          >
            Home
          </a>
          <a
            style={{ textDecoration: "none" }}
            className="hover:text-indigo-600"
            href="#"
          >
            Services
          </a>
          <a
            style={{ textDecoration: "none" }}
            className="hover:text-indigo-600"
            href="#"
          >
            About
          </a>
          <a
            style={{ textDecoration: "none" }}
            className="hover:text-indigo-600"
            href="#"
          >
            Contact
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {darkMode ? (
            <FaSun color="white" size={24} onClick={toggleDarkMode} />
          ) : (
            <FaMoon color="black" size={24} onClick={toggleDarkMode} />
          )}
          {isAuth ? (
            <div className="flex items-center gap-2">
              <span className="font-medium">
                <div className="flex flex-col">
                  <span>Welcome</span>
                  <h6 className="text-success">{user.firstName || "User"}</h6>
                </div>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 btn btn-primary text-white rounded hover:bg-black text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hover:text-indigo-600"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
              <span>/</span>
              <Link
                to="/register"
                className="hover:text-indigo-600"
                style={{ textDecoration: "none" }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/*hamburger icon*/}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/*mobile menu*/}
      {isOpen && (
        <div
          className={`${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          } md:hidden px-4 pb-4 space-y-3`}
        >
          <a
            style={{ textDecoration: "none" }}
            className="hover:text-indigo-600"
            href="#"
          >
            Home
          </a>
          <a
            style={{ textDecoration: "none" }}
            className="hover:text-indigo-600"
            href="#"
          >
            Services
          </a>
          <a
            style={{ textDecoration: "none" }}
            className="hover:text-indigo-600"
            href="#"
          >
            About
          </a>
          <a
            style={{ textDecoration: "none" }}
            className="hover:text-indigo-600"
            href="#"
          >
            Contact
          </a>

          <div className="flex items-center justify-center space-x-4 mt-3">
            {darkMode ? (
              <FaSun color="white" size={24} onClick={toggleDarkMode} />
            ) : (
              <FaMoon color="black" size={24} onClick={toggleDarkMode} />
            )}
            <div className="flex items-center space-x-2 text-sm">
              <a
                style={{ textDecoration: "none" }}
                className="hover:text-indigo-600"
                href="#"
              >
                Login
              </a>
              <span>/</span>
              <a
                style={{ textDecoration: "none" }}
                className="hover:text-indigo-600"
                href="#"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
