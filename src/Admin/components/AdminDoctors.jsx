import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../Layout/AdminLayout";
import { toast } from "react-toastify";

const AdminDoctors = () => {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v4/doctors/getdoctors`, {
          withCredentials: true,
        });
        // console.log(response.data);
        setDoctorData(response.data.doctors);
      } catch (error) {
        console.log(
          error.response.data.message || "Failed to Load! try to Refresh Page"
        );
      }
    };

    fetchDoctor();
  }, []);

  const handleDeleteDoctor = async (id) => {
    const deleteDoctor = window.confirm("Are you sure you want to delete Doctor")
    if(!deleteDoctor){
      return
    }
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v4/doctors/delete/${id}`, {
        withCredentials: true,
      })
      setDoctorData(doctorData.filter((doctor)=>{doctor._id !== id}))
      toast.success(response?.data?.message)

    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div className="h-screen mx-auto px-4 py-12 bg-slate-200 " >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {doctorData.length !== 0 ? (
          doctorData.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg ">
              <img
                src={doctor.docAvatar?.url}
                alt={doctor.firstName}
                className="w-full h-96 object-cover object-center rounded-lg p-2  hover:scale-105 transform ease-in-out"
              />
              <div className="p-4 ">
                <h1 className="text-3xl font-semibold mb-2">{`${doctor.firstName} ${doctor.lastName}`}</h1>
                <h1 className="text-xl font-semibold text-violet-600">Department: {doctor.doctorDepartment}</h1>
                <h2 className="text-xl font-semibold mb-2">Gender: {doctor.gender}</h2>
                <h2 className="text-xl font-semibold mb-2">Email:{doctor.email} </h2>
                <h2 className="text-xl font-semibold mb-2">Phone:{doctor.phone} </h2>
                <h2 className="text-xl font-semibold mb-2">Addhar: {doctor.aadhar}</h2>
                <h2 className="text-xl font-semibold mb-2">Date of Birth: {new Date(doctor.dob).toLocaleDateString()} </h2>
                <h2 className="text-xl font-semibold mb-2">Rigistration Date: {new Date(doctor.createdAt).toLocaleDateString()}</h2>
                <button type="button" className="w-full rounded-lg bg-red-500 hover:bg-red-600 text-2xl text-white font-bold text-center p-2" onClick={()=>{handleDeleteDoctor(doctor._id)}}>Delete Doctor</button>
              </div>
            </div>
          ))
        ) : (
          <div>Doctors are not available</div>
        )}
      </div>
    </div>
  );
};

export default AdminLayout(AdminDoctors);
