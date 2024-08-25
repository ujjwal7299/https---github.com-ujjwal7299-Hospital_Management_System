import React, { useContext, useState } from 'react';
import { AdminContext } from '../../main';
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburger } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [menu, setMenu] = useState(false);

  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(AdminContext);
  const navigateTo = useNavigate();

  const gotoHome = () => {
    navigateTo("/admin/dashboard");
    setMenu(!menu);
    setActiveIcon('home');
  };
  const gotoMessagePage = () => {
    navigateTo("/admin/getmessages");
    setMenu(!menu);
    setActiveIcon('messages');
  };
  const gotoAddNewDoctors = () => {
    navigateTo("/admin/addnewdoctor");
    setMenu(!menu);
    setActiveIcon('addDoctor');
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnewadmin");
    setMenu(!menu);
    setActiveIcon('addAdmin');
  };
  const gotoDoctorPage = () => {
    navigateTo("/admin/getdoctors");
    setMenu(!menu);
    setActiveIcon('doctors');
  };

  const handleAdminLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out")
    if(!confirmLogout){
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v3/admin/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      navigateTo("/admin/login");
      localStorage.removeItem("adminToken");
      setIsAdminAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <nav className='h-screen bg-blue-500 flex flex-col items-center justify-around'>
      <div className={`flex flex-col items-center justify-center text-6xl text-white cursor-pointer ${activeIcon === 'home' ? 'text-black' : ''}`} onClick={gotoHome}>
        <TiHome />
        <p className='text-lg'>Dashboard</p>
      </div>
      <div className={`flex flex-col items-center justify-center text-6xl text-white cursor-pointer ${activeIcon === 'doctors' ? 'text-black' : ''}`} onClick={gotoDoctorPage}>
        <FaUserDoctor />
        <p className='text-lg'>Doctors Page</p>
      </div>
      <div className={`flex flex-col items-center justify-center text-6xl text-white cursor-pointer ${activeIcon === 'addAdmin' ? 'text-black' : ''}`} onClick={gotoAddNewAdmin}>
        <MdAddModerator />
        <p className='text-lg'>Register Admin</p>
      </div>
      <div className={`flex flex-col items-center justify-center text-6xl text-white cursor-pointer ${activeIcon === 'addDoctor' ? 'text-black' : ''}`} onClick={gotoAddNewDoctors}>
        <IoPersonAddSharp />
        <p className='text-lg'>Add Doctors</p>
      </div>
      <div className={`flex flex-col items-center justify-center text-6xl text-white cursor-pointer ${activeIcon === 'messages' ? 'text-black' : ''}`} onClick={gotoMessagePage}>
        <AiFillMessage />
        <p className='text-lg'>Messages</p>
      </div>
      <div className={`flex flex-col items-center justify-center text-6xl text-white cursor-pointer ${activeIcon === 'logout' ? 'text-black' : ''}`} onClick={handleAdminLogout}>
        <RiLogoutBoxFill />
        <p className='text-lg'>Logout</p>
      </div>
    </nav>
  );
};

export default Sidebar;
