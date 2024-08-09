import React, { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import ServiceList from "./ServiceList";

function Services() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [inputSearch, setInputSearch] = useState('');
  const [selectedPrice, setSelectedPrice] = useState([100, 5000]);
  const [availability, setAvailability] = useState([
    { id: 1, checked: true, label: "Available" },
    { id: 2, checked: false, label: "Unavailable" },
    { id: 3, checked: false, label: "Booked" },
  ]);

  const [services, setServices] = useState([]);  // State to store services data
  const [filteredServices, setFilteredServices] = useState([]);  // State for filtered services
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);      // State to track errors

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const result = await response.json();
        const data = result.data;
        setServices(data);  // Save data to state
        setFilteredServices(data);  // Initialize filtered services with all data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices(); 
  }, []); 

  useEffect(() => {
    const applyFilters = () => {
      let updatedList = services;

      // Apply rating filter
      if (selectedRating) {
        updatedList = updatedList.filter((item) => parseInt(item.ratings) === parseInt(selectedRating));
      }
      // Apply Category filter
      if(selectedCategory){
        updatedList=updatedList.filter((item)=>item.serviceType === selectedCategory)
      }
      // Apply Avability filter
      const availabilityChecked = availability.filter(item=>item.checked).map(item=>item.label.toLowerCase());
      if(availabilityChecked){
        updatedList = updatedList.filter(item=>availabilityChecked.includes(item.availability))
      }

      //price filter
      const minPrice = selectedPrice[0];
      const maxPrice = selectedPrice[1];
       
      updatedList = updatedList.filter(item=> item.price >= minPrice && item.price <= maxPrice)


      //search filter
      if(inputSearch){
        updatedList = updatedList.filter((item)=> item.title.toLowerCase().search(inputSearch.toLowerCase().trim())!==-1)
      }

      setFilteredServices(updatedList);  // Update the filtered services state
    };

    applyFilters();  // Apply filters whenever services or filter criteria change
  }, [selectedRating, selectedCategory,availability, selectedPrice, inputSearch, services]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);
  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);
  const handleChangeChecked = (id) => {
    const availabilityStateList = availability;
    const changeCheckedAvailability = availabilityStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setAvailability(changeCheckedAvailability);
  };

  const handleChangedPrice = (event, value) => setSelectedPrice(value);

  return (
    <div className="home flex flex-col h-[100vh]">
      {/* Search Bar */}
      <SearchBar value={inputSearch} changeInput={e=>setInputSearch(e.target.value)} />

      <div className="home_panellist_wrap flex flex-1 overflow-y-auto">
        {/* filter panel */}
        <div className="home_panel_wrap basis-72 overflow-y-auto p-4">
          <FilterPanel
            selectToggle={handleSelectCategory}
            selectedCategory={selectedCategory}
            selectRating={handleSelectRating}
            selectedRating={selectedRating}
            availability={availability}
            changeChecked={handleChangeChecked}
            selectedPrice={selectedPrice}
            changedPrice={handleChangedPrice}
          />
        </div>
        {/* List view and empty view */}
        <div className="home_list_wrap  flex-1 overflow-y-auto p-4">
          <ServiceList list={filteredServices} />
        </div>
      </div>
    </div>
  );
}

export default Services;
