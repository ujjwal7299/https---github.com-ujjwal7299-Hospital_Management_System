import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    aadhar: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigateTo  = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/patients/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      localStorage.setItem("patientToken", response.data.token);
      setLoading(false);
      navigateTo("/"); // Redirect to the home page after successful registration
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Patient Register
        </h2>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          onSubmit={handleSubmit}
        >
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Aadhar", name: "aadhar", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="mb-2 font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required
              />
            </div>
          ))}
          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="gender" className="mb-2 font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="message" className="mb-2 font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter a message (optional)"
            />
          </div>
          {[
            { label: "Password", name: "password", type: "password" },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
            },
          ].map((field) => (
            <div key={field.name} className="flex flex-col sm:col-span-2">
              <label
                htmlFor={field.name}
                className="mb-2 font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required
              />
            </div>
          ))}
          <div className="flex justify-center sm:col-span-2">
            <button
              type="submit"
              className={`${
                loading ? "bg-red-600" : "bg-blue-600"
              } text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
