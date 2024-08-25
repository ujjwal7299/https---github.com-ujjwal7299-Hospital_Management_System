import React from "react";

const Departments = () => {
  const departments = [
    {
      id: 1,
      name: "Cardiology",
      description: "Heart and blood vessel care.",
      icon: "/cardiology.png",
    },
    {
      id: 2,
      name: "Neurology",
      description: "Brain and nervous system care.",
      icon: "/cardiology.png",
    },
    {
      id: 3,
      name: "Orthopedics",
      description: "Bone and joint care.",
      icon: "/cardiology.png",
    },
    {
      id: 4,
      name: "Pediatrics",
      description: "Child healthcare.",
      icon: "/cardiology.png",
    },
    {
      id: 5,
      name: "Radiology",
      description: "Imaging services.",
      icon: "/cardiology.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-2xl md:text-5xl font-semibold py-10">Departments</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <img src={department.icon} alt={department.description}></img>
            </div>
              <h3 className="text-lg font-semibold">{department.name}</h3>
            <p className="text-gray-700">{department.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
