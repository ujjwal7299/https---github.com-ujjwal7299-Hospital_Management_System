import React, { useState } from 'react'
import AdminLayout from '../Layout/AdminLayout'
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewAdmin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v3/admin/register`, { firstName, lastName, email, dob, phone, aadhar, password, gender, doctorDepartment, }, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success(response?.data?.message);
      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setDob("");
      setPhone("");
      setAadhar("");
      setGender("");
      setDoctorDepartment("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Admin</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-2">First Name</label>
            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2">Last Name</label>
            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="dob" className="block mb-2">Date of Birth</label>
            <input type="date" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Select date of birth" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2">Phone</label>
            <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="aadhar" className="block mb-2">Aadhar Number</label>
            <input type="text" name="aadhar" value={aadhar} onChange={(e) => setAadhar(e.target.value)} placeholder="Enter Aadhar number" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2">Gender</label>
            <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="doctorDepartment" className="block mb-2">Department</label>
            <input type="text" name="doctorDepartment" value={doctorDepartment} onChange={(e) => setDoctorDepartment(e.target.value)} placeholder="Enter doctor's department" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <button type="submit" onClick={handleAdminRegister} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300">{loading ? "Loading....." : "Register"}</button>
      </div>
    </div>
  );
}

export default AdminLayout(AddNewAdmin)