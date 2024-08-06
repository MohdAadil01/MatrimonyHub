import React, { useState } from 'react';
import Filters from './Filters';

const ServiceList = () => {
  const services = [
    { id: 1, name: 'Catering Service A', type: 'Catering', price: 1500, availability: 'Available', rating: 5 },
    { id: 2, name: 'Photography Service B', type: 'Photography', price: 1200, availability: 'Booked', rating: 4 },
    { id: 3, name: 'Florist Service C', type: 'Florist', price: 800, availability: 'Unavailable', rating: 3 },
    { id: 4, name: 'Band Service D', type: 'Band', price: 1800, availability: 'Available', rating: 5 },
    // Add more services as needed
  ];
  const [searchItem, setSearchItem] = useState('');
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
      updatedServices = updatedServices.filter(service => filters.types.includes(service.type));
    }

    if (filters.availability.length > 0) {
      updatedServices = updatedServices.filter(service => filters.availability.includes(service.availability));
    }

    if (filters.rating.length > 0) {
      updatedServices = updatedServices.filter(service => filters.rating.includes(service.rating.toString()));
    }

    updatedServices = updatedServices.filter(service => 
      service.price >= filters.priceRange[0] && service.price <= filters.priceRange[1]
    );

    setFilteredServices(updatedServices);
  };

  return (
    <div className="flex">
      <Filters onFilterChange={handleFilterChange} />
      
      <div className=" p-4 w-full">
      <div className="flex items-center justify-between">
      <div className="relative flex-1 ">
        <input
          className="flex h-10 border border-gray-300 px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-white"
          placeholder="Search services..."
          type="text"
          value={searchItem}
          onChange={handleInputChange}
         
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M4.75 10.5a5.75 5.75 0 1111.5 0 5.75 5.75 0 01-11.5 0z"></path>
          </svg>
        </div>
      </div>
    </div>
        <h2 className="text-xl font-semibold my-6">Service List</h2>
        <div className="grid gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold">{service.name}</h2>
        <p className="text-gray-700">{service.description}</p>
        <p className="text-gray-500">Availability: {service.availability}</p>
        <p className="text-gray-500">Price: {service.price}</p>
        <p className="text-gray-500">Rating: {service.rating}</p>
        <p className="text-gray-500">Type: {service.type}</p>
      </div>
      <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-4">
        <button className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-100 transition-all mt-20"
        >Book Now</button>
      </div>
    </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
