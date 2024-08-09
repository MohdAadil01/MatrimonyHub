import React from "react";
function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
function ListItem({
  item: {
    title,
    description,
    price,
    availability,
    ratings,
    serviceType,
    images,
  },
}) {
 
  return (
   
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 mb-6" >
      <div className="md:w-1/3">
        <img
          className="w-full h-auto rounded-lg md:h-56"
          src={images[0]} // Assuming the first image is used
          alt={title}
        />
      </div>
      <div className="md:flex md:justify-between md:w-2/3 md:pl-6 mt-4 md:mt-0">
        <div>
          <h2 className="text-xl font-semibold pb-2">{title}</h2>
          <p className="text-gray-700 py-4">{description}</p>
          <p className="text-gray-500 ">Availability: {capitalizeFirstLetter(availability)}</p>
          <p className="text-gray-500">Price: ${price}</p>
          <p className="text-gray-500">Type: {capitalizeFirstLetter(serviceType)}</p>
        </div>
        <div className="bottom-0">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="text-gray-500"> {ratings} out of 5</p>
          </div>
          <button className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-100 transition-all mt-4">
            Book Now
          </button>
        </div>
      </div>
    </div>
  
  );
}

export default ListItem;
