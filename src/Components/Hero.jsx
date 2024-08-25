import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-blue-600 text-white py-24 ">
      <div className="container mx-auto flex flex-col  md: lg: xl: 2xl: md:flex-row items-center justify-between p-4">
        <div className=" flex flex-col gap-14 md:max-w-[1000px]">
          <p className="text-2xl md:text-5xl lg:text-6xl font-bold mb-8 text-center md:text-left overflow-hidden ">
            Welcome to Our Hospital Management System !
          </p>
          <p className="text-sm lg:text-2xl md:text-3xl mb-12 text-center md:text-left overflow-hidden  ">
            Empowering healthcare professionals with advanced technology.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, vero!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eveniet perferendis cum ex ea eum facere ipsa placeat porro eius?
          </p>
          <div className="flex justify-center md:justify-start">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              size="large"
              to="/about"
              className="shadow-md"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="w-1/3  md:w-1 lg:w-1/2 mt-8 md:mt-0 hidden md:block" >
          <img
            src={"/hero.png"}
            alt="Hospital"
            className="rounded-lg shadow-xl w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
