import React from "react";
import Layout from "../Layout/Layout";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hospital Background Section */}
      <section className="py-16 px-4 md:px-0 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Our Hospital's Background
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            vitae felis consectetur, tincidunt felis et, maximus magna. Proin id
            ullamcorper risus. Integer nec lorem rhoncus, fermentum ex in,
            consectetur libero. Phasellus rutrum tempor varius. Integer
            fringilla, mauris nec sagittis bibendum, urna lectus scelerisque
            nulla, nec vehicula leo urna a mi. Cras elementum orci odio, a
            aliquam ligula varius vel. Praesent fermentum magna non nibh
            efficitur, nec tempor nulla efficitur.
          </p>
        </div>
      </section>

      {/* Staff Profiles Section */}
      <section className="py-16 px-4 md:px-0 bg-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Meet Our Team
          </h2>
          {/* Add staff profiles here */}
          {/* Example: <StaffProfiles /> */}
        </div>
      </section>

      {/* Department Details Section */}
      <section className="py-16 px-4 md:px-0 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Departments
          </h2>
          {/* Add department details here */}
          {/* Example: <DepartmentDetails /> */}
        </div>
      </section>
    </div>
  );
};

export default Layout(AboutUs);
