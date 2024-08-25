import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";
import appointmentImage from "../../public/hero.jpg";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [Visited, setVisited] = useState(false);

  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v4/doctors/getdoctors`,
          {
            withCredentials: true,
          }
        );
        setDoctorData(response.data.doctors);
      } catch (error) {
        toast.error("Failed to Load Doctor Data");
      }
    };

    fetchDoctorData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v5/patient/appointment`,
        { firstName, lastName, email, phone, address, dob, message, gender, appointmentDate, department, doctorFirstName, doctorLastName, Visited },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setDepartment("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setDob("");
      setVisited(false);
      setAppointmentDate("");
      setMessage("");
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Appointment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-12 mt-10">
      <div className="flex flex-col md:flex-row items-center w-full max-w-6xl mb-8">
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Book an Appointment with Us</h1>
          <p className="text-lg text-gray-700 mb-6 hidden md:block">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos assumenda ipsa reprehenderit mollitia harum perferendis vel provident, ratione aperiam quas consequuntur totam ullam delectus minima hic! Eum totam nam consectetur quidem, exercitationem, voluptatum adipisci, aperiam sequi architecto laboriosam magnam cupiditate? Illo, sunt? Consequatur quos rem, maiores fugiat ex aut tempore?
          </p>
        </div>
        <div className="md:w-1/2">
          <img src={appointmentImage} alt="Appointment" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
           Appointment Form
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-blue-500 w-full"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-blue-500 w-full"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-blue-500 w-full"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-blue-500 w-full"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBirthdayCake className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-blue-500 w-full"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 w-full"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="relative">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHome className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-blue-500 w-full"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 w-full"
              ></textarea>
            </div>
            <div className="relative">
              <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                Appointment Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-blue-500 w-full"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDoctorFirstName("");
                  setDoctorLastName("");
                }}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 w-full"
                required
              >
                <option value="">Select Department</option>
                {doctorData.map((doctor, index) => (
                  <option key={index} value={doctor.doctorDepartment}>
                    {doctor.doctorDepartment}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                Select Doctor
              </label>
              <select
                value={`${doctorFirstName} ${doctorLastName}`}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 w-full"
                onChange={(e) => {
                  const [firstName, lastName] = e.target.value.split(" ");
                  setDoctorFirstName(firstName);
                  setDoctorLastName(lastName);
                }}
                disabled={!department}
              >
                <option value="">Select Doctor</option>
                {doctorData
                  .filter((doctor) => doctor.doctorDepartment === department)
                  .map((doctors, index) => (
                    <option value={`${doctors.firstName} ${doctors.lastName}`} key={index}>
                      {doctors.firstName} {doctors.lastName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <label htmlFor="visited" className="text-lg font-medium text-gray-700">
              Have You Visited Before?
            </label>
            <input
              type="checkbox"
              className="h-6 w-6"
              checked={Visited}
              onChange={(e) => setVisited(e.target.checked)}
            />
          </div>
          <button
            type="submit"
            className={`${
              loading ? "bg-red-600" : "bg-blue-600"
            } text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full mt-6`}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
