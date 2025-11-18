import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  loginRequestAction,
  loginSuccessAction,
  loginFailureAction,
} from "../redux/authentication/actions";
import { getUsers } from "../api/fetchUserAPI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector(
    (state) => state.AuthenticationReducer
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequestAction());

    try {
      const users = await getUsers(email, password);
      if (users.length > 0) {
        const user = users[0];
        dispatch(loginSuccessAction(user));
        alert("Login Success");
        navigate("/");
      } else {
        dispatch(loginFailureAction());
      }
    } catch (err) {
      console.error(err);
      dispatch(loginFailureAction());
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label
              className="block mb-1 font-medium text-gray-700 text-left"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="d-flex flex-column">
            <label
              className="block mb-1 font-medium text-gray-700 text-left"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isLoading}
          >
            Login
          </button>
        </form>
        {isError && (
          <p className="text-red-500 mt-3 text-center">
            Login failed. Please check your credentials.
          </p>
        )}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline"
            style={{ textDecoration: "none" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
