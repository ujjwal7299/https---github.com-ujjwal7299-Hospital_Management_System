import React, { useContext, useState } from 'react';
import { AdminContext } from '../../main';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminLogin = () => {
  const { isAdminAuthenticated , setIsAdminAuthenticated } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  


  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v3/admin/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { data } = response;

      if (data.token) {
        toast.success(data.message);
        setIsAdminAuthenticated(true);
        navigateTo('/admin/dashboard');
        localStorage.setItem('adminToken', data.token);
      } else {
        toast.error('Login failed, token not received');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        setIsAdminAuthenticated(false)
      } else {
        toast.error('Login failed');
        setIsAdminAuthenticated(false)
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600">Admin Login</h2>
        <form className="space-y-4" onSubmit={handleAdminLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`${loading ? 'bg-red-600' : 'bg-blue-600'} text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
