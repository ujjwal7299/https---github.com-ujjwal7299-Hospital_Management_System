import React from "react";
import hospitalAminties from "../Data/data.js"

const Aminties = () => {
  

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-2xl md:text-5xl font-semibold py-10">Hospital Aminties</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hospitalAminties.map((hospitalAminty, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden flex flex-col items-center p-4  "
          >
            <img
              src={hospitalAminty.img}
            ></img>
            <h3 className="text-gray-700 text-xl font-semibold mb-2     ">
              {hospitalAminty.name}
            </h3>
            <p className="text-gray-600 text-base">
              {hospitalAminty.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aminties;
