import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PatientTestimonial = () => {
  const testimonial = [
    {
      id: 1,
      name: "John Doe",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut porttitor nisi, nec commodo lectus.",
      avatar: "/doctor.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      testimonial:
        "Vestibulum at libero vel felis tempus mattis. Ut id vehicula leo. Fusce eget convallis nulla.",
      avatar: "/doctor.png",
    },
    {
      id: 3,
      name: "Emily Johnson",
      testimonial:
        "Suspendisse eget odio mauris. Sed auctor varius elit, vel ultricies mauris molestie a.",
      avatar: "/doctor.png",
    },
    {
      id: 4,
      name: "Sarah Brown",
      testimonial:
        "Vivamus tristique pretium lectus, et feugiat quam vehicula sed. Duis quis purus in turpis ultricies tincidunt. ",
      avatar: "/doctor.png",
    },
    {
      id: 5,
      name: "Michael Williams",
      testimonial:
        "Nullam varius, neque non volutpat dignissim, ligula metus convallis odio, non efficitur elit elit nec nisi. ",
      avatar: "/doctor.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-2xl md:text-5xl font-semibold py-10">Our Testimonials</div>
      <Slider {...settings} className="overflow-hidden">
        {testimonial.map((testimonial) => (
          <div key={testimonial.id} className="px-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.testimonial}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PatientTestimonial;
