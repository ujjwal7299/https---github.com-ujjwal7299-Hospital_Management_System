import React, { useEffect, useState } from "react";
import axios from "axios";

const Doctors = () => {
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

  return (
    <div className="container mx-auto px-4 py-12" id="doctor">
      <div className="text-2xl md:text-5xl font-semibold py-10">Meet Our Doctors</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctorData.length !== 0 ? (
          doctorData.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden">
              <img
                src={doctor.docAvatar?.url}
                alt={doctor.firstName}
                className="w-full h-56 object-cover object-center rounded-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{`${doctor.firstName} ${doctor.lastName}`}</h2>
                <p className="text-xl text-violet-600">
                  {doctor.doctorDepartment}
                </p>
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

export default Doctors;
