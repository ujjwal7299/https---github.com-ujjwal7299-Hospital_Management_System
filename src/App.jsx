import React, { useContext, useEffect } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact";
import { AdminContext, Context } from "./main";
import axios from "axios";
import Private from "./Layout/Private";
import Dashboard from "./Admin/components/Dashboard.jsx";
import AddNewAdmin from "./Admin/components/AddNewAdmin";
import AddNewDoctor from "./Admin/components/AddNewDoctor";
import Patients from "./Admin/components/Patients";
import AdminDoctors from "./Admin/components/AdminDoctors";
import AdminLogin from "./Admin/components/AdminLogin";
import AdminPrivate from "./Admin/Layout/AdminPrivate";
import AdminMessages from "./Admin/components/AdminMessages";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(AdminContext);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
  }, [setIsAdminAuthenticated]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v3/admin/getalladmins`,
          {
            withCredentials: true, // Send cookies with the request
          }
        );
        setIsAdminAuthenticated(true);
        // console.log(response.data);
      } catch (error) {
        setIsAdminAuthenticated(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchAdmins();
  }, [setIsAdminAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem("patientToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated, setUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v2/patients/getAllPatients`,
          {
            withCredentials: true, // Send cookies with the request
          }
        );
        setIsAuthenticated(true);
        // console.log(response.data);
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, [setIsAuthenticated]);

  return (
    <>
      <Router>
        <Routes>
          {/*Patient Router*/}
          <Route path="/" element={<Home />} />
          <Route element={<Private />}>
            <Route path="/appointment" element={<Appointment />} />
          </Route>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Router */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminPrivate />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/addnewadmin" element={<AddNewAdmin />} />
            <Route path="/admin/addnewdoctor" element={<AddNewDoctor />} />
            <Route path="/admin/getdoctors" element={<AdminDoctors />} />
            <Route path="/admin/getmessages" element={<AdminMessages />} />
            <Route path="/admin/getpatients" element={<Patients />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          theme="colored"
          autoClose={1000}
          stacked={false}
        />
      </Router>
    </>
  );
};

export default App;
