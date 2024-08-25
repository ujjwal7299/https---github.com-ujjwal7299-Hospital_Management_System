import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match with the Confirm password! Try again"
      );
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/patients/login`,
        { phone, password },
        {
          withCredentials: true, // Ensure cookies are sent with the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.token) {
        toast.success(response.data.message);
        navigateTo("/");
        setIsAuthenticated(true);
        setUser(response.data.user);
        // document.cookie = `patientToken= ${response.data.token}; path=/;`;

        // Set token in local storage
        localStorage.setItem("patientToken", response.data.token);
        console.log("Token stored in localStorage:", response.data.token);
      } else {
        console.error("Token not found in response data");
        toast.error("Login failed, token not received");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.log("Error during login", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Patient Login
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-2 font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`${
                loading ? "bg-red-600" : "bg-blue-600"
              } text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <span className="text-gray-700">Don't have an account?</span>
          <Link to={"/register"} className="ml-2 text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout(Login);
