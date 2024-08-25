import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../Layout/AdminLayout';
import { Avatar } from '@mui/material';

const AddNewDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDoctorRegister = async (e) => {
    window.confirm("Sure, you want to  registered Doctor")
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('dob', dob);
      formData.append('phone', phone);
      formData.append('aadhar', aadhar);
      formData.append('gender', gender);
      formData.append('doctorDepartment', doctorDepartment);
      formData.append('docAvatar', docAvatar);

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v4/doctors/register`, formData, {
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
      setDocAvatar(null);
      setPreview(null);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocAvatar(file);
    //logic for [preview] ie convert image into url
    if (file) {
      const reader = new FileReader(); //fileReader read files Asynchronously without blocking code,commonly used to read the contents of files selected 
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="flex  flex-col justify-center  h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Doctor</h2>
      <div className="bg-white p-8 rounded-lg shadow-md flex mx-[500px]">
        <div className="w-full pr-4 flex-1">
          <div className="mb-4">
            <label htmlFor="docAvatar" className="block mb-2">Doctor Avatar</label>
            <input type="file" name="docAvatar" id="docAvatar" onChange={handleFileChange} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" />
            {preview && (
              <div className="mt-4 bg-slate-700 flex items-center justify-center w-96">
                <img src={preview} alt="Avatar Preview" className="rounded-md" />
              </div>
            )}
          </div>
        </div>
        <div className="w-full pl-4 flex-1" >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-5">
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
          <button type="submit" onClick={handleDoctorRegister} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300">
            {loading ? "Loading....." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout(AddNewDoctor);
