import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/patients/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      localStorage.removeItem("patientToken");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };


  const scrollToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const aboutElement = document.getElementById("doctor");
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleLogin = () => {
    navigateTo("/login");
  };

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow style on unmount
    };
  }, [menu]);

  return (
    <header className="bg-blue-900 text-white p-4 w-full fixed top-0 z-50 shadow-lg">
      <div className="flex items-center justify-around flex-wrap ">
        <div className="flex items-center ">
            <Link to={"/"}>
          <div className="flex items-center">
              <img src="logo.png" alt="Hospital Logo" className="h-16 mr-2 " />
              <p className="text-lg md:text-2xl">Sarda Multi-Speciality Hospital</p>
          </div>
            </Link>
        </div>
        <div className="md:hidden block">
          {menu ? (
            <CloseIcon onClick={toggleMenu} />
          ) : (
            <ListIcon onClick={toggleMenu} />
          )}
        </div>

        {menu && (
          <div className="md:hidden flex gap-3 items-center justify-center flex-col w-full h-full bg-black py-10 top-[5rem] right-0  z-50 shadow-2xl ">
            <ul className="flex gap-8 flex-col">
              <li>
                <Link
                  to={"/"}
                  className="hover:underline text-2xl hover:scale-150 translate-x-5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/appointment"}
                  className="hover:underline text-2xl hover:scale-150 translate-x-5"
                >
                  Appointment
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="hover:underline text-2xl hover:scale-150 translate-x-5"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="hover:underline text-2xl hover:scale-150"
                >
                  About Us
                </Link>
              </li>
            </ul>
            <button
              className="bg-blue-500 px-5 py-2 rounded-md hover:bg-blue-700 ease-in-out cursor-pointer block md:hidden"
              onClick={isAuthenticated ? handleLogout : handleLogin}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        )}

        <div className="hidden md:block">
          <ul className="flex gap-8">
            <li>
              <Link
                to={"/"}
                className="hover:underline text-2xl hover:scale-150 translate-x-5"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/appointment"}
                className="hover:underline text-2xl hover:scale-150 translate-x-5"
              >
                Appointment
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="hover:underline text-2xl hover:scale-150 translate-x-5"
                onClick={scrollToContact}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="hover:underline text-2xl hover:scale-150 translate-x-5"
                onClick={scrollToAbout}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <button
          className="bg-blue-500 px-5 py-2 rounded-md hover:bg-blue-700 ease-in-out cursor-pointer hidden md:block"
          onClick={isAuthenticated ? handleLogout : handleLogin}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
};

export default Header;
