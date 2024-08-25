import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../Layout/AdminLayout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

const Dashboard = () => {
  const [adminName, setAdminName] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v3/admin/getalladmins`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        });
        console.log(response.data);
        // toast.success(response.data?.message);
        setAdminName(response.data.allAdmins[0].firstName + " " + response.data.allAdmins[0].lastName);
      } catch (error) {
        console.log("Error while fetching admin name: " + error?.response?.data?.message);
      }
    };
    fetchAdminName();
  }, []);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v5/patient/getappointment`, {
          withCredentials: true,
        });
        console.log(response.data);
        setAppointments(response.data?.allAppointments);
      } catch (error) {
        toast.error(error.response?.data?.message);
        console.log("error while fetching appointments");
      }
    };
    getAppointments();
  }, []);

  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v5/patient/update/status/${id}`, { status }, {
        withCredentials: true,
      });
      setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
      appointment._id === id ? { ...appointment, status } : appointment
      )
      );
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log("error while updating appointment status");
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm(`Are you sure you want to delete this appointment ? `)) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v5/patient/delete/appointment/${id}`, {
          withCredentials: true,
        });
        toast.success(response?.data?.message);
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
      } catch (error) {
        toast.error(error.response?.data?.message);
        console.log("error while deleting appointment");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 px-4 py-12">
        <div className="flex flex-wrap items-center justify-around mb-6">
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-4 overflow-hidden mb-6 w-full md:w-1/2 lg:w-1/3">
            <img src={"/doctor3.png"} alt="Admin" className="w-40 h-60 object-cover flex-shrink-0 hover:scale-100 transform transition-transform  ease-in-out" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Hello, {adminName}!</h1>
              <p className="text-xl text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, assumenda. Quos tempore laboriosam facilis quidem?</p>
            </div>
          </div>


          <div className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-4 overflow-hidden mb-6 w-full md:w-1/2 lg:w-1/3">
            <img src={"/whoweare.png"} alt="Admin" className="w-60 h-60  object-cover" />
            <div>
              <h1 className="text-3xl font-bold mb-2">Total Appointments</h1>
              <p className="text-xl text-gray-600">You have <span className="font-bold text-blue-600">{appointments.length}</span> appointments.</p>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-gray-100 px-4 py-12 w-full overflow-hidden">
          <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">Appointments</h1>
          <div className="overflow-y-auto max-h-[500px] shadow-lg rounded-lg">
            <table className="min-w-full w-full bg-white rounded-lg">
              <thead className="bg-blue-500 text-white text-start">
                <tr>
                  <th className="py-3 px-4 border-b-2 border-blue-400 text-2xl">Sr No.</th>
                  <th className="py-3 px-4 border-b-2 border-blue-400 text-2xl">Patient</th>
                  <th className="py-3 px-4 border-b-2 border-blue-400 text-2xl">Doctor</th>
                  <th className="py-3 px-4 border-b-2 border-blue-400 text-2xl">Department</th>
                  <th className="py-3 px-4 border-b-2 border-blue-400 text-2xl">Date</th>
                  <th className="py-3 px-4 border-b-2 border-blue-400 text-2xl">Previously Visited</th>
                  <th className="py-3 px-4 border-b-2 border-blue-400 text-2xl">Status</th>
                  <th className="py-3 px-4 border-b-2 border-blue-400 text-2xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment._id} className="text-center">
                    <td className="py-3 border-b border-gray-200 text-xl px-10 font-semibold ">
                      {index + 1}
                    </td>
                    <td className="py-3 border-b border-gray-200 text-xl px-10 font-semibold">
                      {appointment.firstName} {appointment.lastName}
                    </td>
                    <td className="py-3 border-b border-gray-200 text-xl px-10 font-semibold">
                      {appointment.doctor.firstName} {appointment.doctor.lastName}
                    </td>
                    <td className="py-3 border-b border-gray-200 text-xl px-10 font-semibold">
                      {appointment.department}
                    </td>
                    <td className="py-3 border-b border-gray-200 text-xl px-10 font-semibold">
                      {new Date(appointment.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 border-b border-gray-200 text-xl px-10 font-semibold text-center">
                      {appointment.Visited ? (
                        <CheckCircleIcon style={{ fontSize: '2.5rem', color: '#34D399' }} />
                      ) : (
                        <DoNotDisturbAltIcon style={{ fontSize: '2.5rem', color: '#EF4444' }} />
                      )}
                    </td>
                    <td className="py-3 border-b border-gray-200 text-xl px-10 font-semibold">
                      <span
                        className={`p-2 rounded-lg text-xl font-bold ${appointment.status === "Accepted" ? "bg-green-300 text-black" : appointment.status === "Rejected" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}`}
                      >
                        {appointment.status || "Pending"}
                      </span>
                    </td>
                    <td className="py-3 border-b border-gray-200 text-xl px-10 font-semibold">
                      <div className="flex space-x-2 justify-center">
                        <button
                          className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                          onClick={() => handleUpdateAppointmentStatus(appointment._id, "Accepted")}
                        >
                          Accepted
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                          onClick={() => handleUpdateAppointmentStatus(appointment._id, "Rejected")}
                        >
                          Reject
                        </button>
                        <button
                          className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
                          onClick={() => handleUpdateAppointmentStatus(appointment._id, "Pending")}
                        >
                          Pending
                        </button>
                        <button
                          className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out"
                          onClick={() => handleDeleteAppointment(appointment._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout(Dashboard);
