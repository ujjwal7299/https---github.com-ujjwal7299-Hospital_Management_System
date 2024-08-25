import React, { useEffect, useState } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ReactLoading } from "react-loading";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
 


  useEffect(() => {
    setMessageLoading(true);
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/message/getmessage`, {
          withCredentials: true,
        });
        setMessages(response.data.messages);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Internal Server Error');
        console.log(error.response?.data?.message || 'Internal Server Error');
      }
      finally {
        setMessageLoading(false);
      }
    };

    fetchMessages();
  }, []);

  


  const handleDeleteMessage = async (id) => {
    const deleteMessage = window.confirm("Are you sure you want to delete Message")
    if(!deleteMessage){
      return
    }

    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/message/deletemessages/${id}`, {
        withCredentials: true,
      });
      setMessages(messages.filter(message => message._id !== id));
      toast.success('Message deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Internal Server Error');
      console.log(error.response?.data?.message || 'Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  if (!messages || messages.length === 0) {
    return (
      <div className='h-screen bg-gray-100 px-4 py-12'>
        <div className="flex items-center justify-between mb-6">
          <p className='text-6xl overflow-hidden p-2 '>No Messages Found</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className='h-screen bg-gray-100 px-4 py-12'>
      <div className="flex items-center justify-around mb-6">                                               
        <h1 className='text-xl font-bold p-3 bg-violet-400 rounded-lg shadow-xl'>Total Messages: {messages.length}</h1>
      </div>
      <div className='space-y-6'>
        {messageLoading ? (
          <p className="text-gray-600">Loading........</p>
        ) : (
          messages.map((message, index) => (
            <div className='bg-white rounded-lg shadow-md p-6' key={index}>
              <h2 className='text-xl font-semibold mb-2'>Message: {message.message}</h2>
              <p className='text-gray-700'><span className="font-semibold">Full Name:</span> {message.firstName} {message.lastName}</p>
              <p className='text-gray-700'><span className="font-semibold">Email Address:</span> {message.email}</p>
              <p className='text-gray-700'><span className="font-semibold">Mobile No:</span> {message.phone}</p>
              <p className='text-gray-700'><span className="font-semibold">Received:</span> {new Date(message.createdAt).toLocaleString()}</p>

              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:bg-red-600 transition" onClick={() => handleDeleteMessage(message._id)}>
                {loading ? 'Deleting...' : 'Delete'}
              </button> 
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminLayout(AdminMessages);
