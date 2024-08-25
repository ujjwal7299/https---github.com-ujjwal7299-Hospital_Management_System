import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const phoneLength = phone.length;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (phoneLength !== 10) {
      toast.error("Phone number should be 10 digits only.");
      return null;
    }

    setLoading(true);

    await axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/message/send`,
        {
          firstName,
          lastName,
          email,
          phone,
          message,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-12" id="contact">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Contact Us
        </h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          onSubmit={handleOnSubmit}
        >
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="mb-2 font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="mb-2 font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="message" className="mb-2 font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className={`${
                loading
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out flex items-center justify-center`}
              disabled={loading}
            >
              {loading ? (
                <ReactLoading
                  type="cylon"
                  color="#fff"
                  height={24}
                  width={53}
                  className="overflow-hidden"
                />
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;
