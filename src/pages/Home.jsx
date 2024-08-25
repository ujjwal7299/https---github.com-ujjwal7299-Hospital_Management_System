import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout.jsx";
import Hero from "../Components/Hero.jsx";
import Departments from "../Components/Departments.jsx";
import MessageForm from "../Components/MessageForm.jsx";
import AboutHealth from "../Components/AboutHealth.jsx";
import Doctors from "../Components/Doctors.jsx";
import Aminties from "../Components/Aminties.jsx";
import PatientTestimonial from "../Components/PatientTestimonial.jsx";
import NavigationIcon from "@mui/icons-material/Navigation";

const Home = () => {
  const title = "CareConnect Hospital";
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="">
      <Hero
        title={`Welcome to ${title} | Your Trusted Healthcare Provider`}
        imageUrl={"/hero.png"}
      />
      <AboutHealth />
      <Doctors />
      <Aminties />
      <Departments />
      <PatientTestimonial />
      <MessageForm />
      {showScrollToTop && (
        <button
          className="fixed bottom-5 md:bottom-10 right-5 md:right-10 bg-blue-500 hover:bg-violet-600 text-white text-sm md:text-2xl p-2 md:p-4 rounded-full shadow-lg"
          onClick={scrollToTop}
        >
          <NavigationIcon />
        </button>
      )}
    </div>
  );
};

export default Layout(Home);
