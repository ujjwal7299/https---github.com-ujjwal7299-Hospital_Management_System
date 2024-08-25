import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";


const Footer = () => {
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
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="list-none">
              <li className="mb-2">
                <Link to={"/"} className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to={"/appointment"} className="hover:text-blue-500">
                  Appointment
                </Link>
              </li>
              <li className="mb-2">
                <Link to={"/"} className="hover:text-blue-500" onClick={scrollToContact}>
                  Contact
                </Link>
              </li>
              <li className="mb-2" onClick={scrollToAbout}>
                <Link to={"/"} className="hover:text-blue-500">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Hospital Details</h3>
            <p className="mb-2">1234 Hospital Way</p>
            <p className="mb-2">City, Country</p>
            <a href="tel:+919767722793" className="mb-2 hover:text-blue-500">
              Phone: +91 9767722793
            </a>
            <p className="mb-2">Email: info@example.com</p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex items-center">
              <FacebookIcon className="mr-2" />
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                Facebook
              </a>
            </div>
            <div className="flex items-center mt-2">
              <TwitterIcon className="mr-2" />
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                Twitter
              </a>
            </div>
            <div className="flex items-center mt-2">
              <InstagramIcon className="mr-2" />
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 text-center">
        <p>&copy; 2024 Hospital Connect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
