import React, { useState } from "react";
import Filters from "./Filters";

const ServiceList = () => {
  const services = [
    {
      id: 1,
      name: "Catering Service A",
      type: "Catering",
      price: 1500,
      availability: "Available",
      rating: 5,
      description:
        "Professional catering service offering a variety of gourmet dishes.",
      image:
        "https://culinaryaffaire.com/wp-content/uploads/2021/08/Best-Corporate-Catering-Service.jpg",
    },
    {
      id: 2,
      name: "Photography Service B",
      type: "Photography",
      price: 1200,
      availability: "Booked",
      rating: 4,
      description:
        "Expert photography service specializing in weddings and events.",
      image:
        "https://tse2.mm.bing.net/th?id=OIP.qJ84Zjn3T7FJzm1QJ_4i0gHaE8&pid=Api&P=0&h=180",
    },
    {
      id: 3,
      name: "Florist Service C",
      type: "Florist",
      price: 800,
      availability: "Unavailable",
      rating: 3,
      description:
        "Creative florist providing beautiful floral arrangements for all occasions.",
      image:
        "https://tse3.mm.bing.net/th?id=OIP.lmi-uUz-h4ns4e9_MP9q7QHaD8&pid=Api&P=0&h=180",
    },
    {
      id: 4,
      name: "Band Service D",
      type: "Band",
      price: 1800,
      availability: "Available",
      rating: 5,
      description:
        "Live band performance offering a wide range of musical genres.",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.7NU82nsi3UmUNpP1GahYZgHaEK&pid=Api&P=0&h=180",
    },
    // Add more services as needed
  ];

  const [searchItem, setSearchItem] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredServices(filteredItems);
  };

  const handleFilterChange = (filters) => {
    let updatedServices = services;

    if (filters.types.length > 0) {
      updatedServices = updatedServices.filter((service) =>
        filters.types.includes(service.type)
      );
    }

    if (filters.availability.length > 0) {
      updatedServices = updatedServices.filter((service) =>
        filters.availability.includes(service.availability)
      );
    }

    if (filters.rating.length > 0) {
      updatedServices = updatedServices.filter((service) =>
        filters.rating.includes(service.rating.toString())
      );
    }

    updatedServices = updatedServices.filter(
      (service) =>
        service.price >= filters.priceRange[0] &&
        service.price <= filters.priceRange[1]
    );

    setFilteredServices(updatedServices);
  };

  return (
    <div className="flex">
      <Filters onFilterChange={handleFilterChange} />

      <div className="p-4 w-full">
        <div className="flex items-center justify-between">
          <div className="relative flex-1">
            <input
              className="flex h-10 border border-gray-300 px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-white"
              placeholder="Search services..."
              type="text"
              value={searchItem}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M4.75 10.5a5.75 5.75 0 1111.5 0 5.75 5.75 0 01-11.5 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold my-6">Service List</h2>
        <div className="grid gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6"
            >
              <div className="md:w-1/3">
                <img
                  className="w-full h-auto rounded-lg md:h-56"
                  src={service.image}
                  alt={service.name}
                />
              </div>
              <div className="md:flex md:justify-between md:w-2/3 md:pl-6 mt-4 md:mt-0">
                <div>
                  <h2 className="text-xl font-semibold pb-2">{service.name}</h2>
                  <p className="text-gray-700 py-4">{service.description}</p>
                  <p className="text-gray-500 ">
                    Availability: {service.availability}
                  </p>
                  <p className="text-gray-500">Price: {service.price}</p>

                  <p className="text-gray-500">Type: {service.type}</p>
                </div>
                <div className=" bottom-0">
                  <div class="flex items-center">
                    <svg
                      class="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p class="text-gray-500"> {service.rating} out of 5</p>
                  </div>
                  <button className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-100 transition-all mt-4">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
