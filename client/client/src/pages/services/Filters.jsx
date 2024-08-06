import React, { useState, useRef, useEffect } from 'react';

const Filters = ({ onFilterChange }) => {
  const [position, setPosition] = useState(50); // Initial position at 50%
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);
  const [filters, setFilters] = useState({
    types: [],
    availability: [],
    rating: [],
    priceRange: [100, 2000]
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!sliderRef.current || !thumbRef.current) return;

      const sliderRect = sliderRef.current.getBoundingClientRect();
      let newLeft = event.clientX - sliderRect.left - thumbRef.current.offsetWidth / 2;

      if (newLeft < 0) newLeft = 0;
      const rightEdge = sliderRect.width - thumbRef.current.offsetWidth;
      if (newLeft > rightEdge) newLeft = rightEdge;

      const newPosition = (newLeft / sliderRect.width) * 100;
      setPosition(newPosition);

      const min = 100;
      const max = 2000;
      const price = [min, min + (newPosition / 100) * (max - min)];
      setFilters({ ...filters, priceRange: price });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const thumbElement = thumbRef.current;
    if (thumbElement) {
      thumbElement.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (thumbElement) {
        thumbElement.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [filters]);

  const handleCheckboxChange = (category, value) => {
    const currentFilters = { ...filters };
    if (currentFilters[category].includes(value)) {
      currentFilters[category] = currentFilters[category].filter((item) => item !== value);
    } else {
      currentFilters[category].push(value);
    }
    setFilters(currentFilters);
    onFilterChange(currentFilters);
  };

  return (
    <aside className="bg-muted/40 p-2 md:p-10 border-r md:w-1/5">
      <div className="grid gap-8">
        <div>
          <h3 className="font-semibold mb-4">Service Type</h3>
          <div className="grid gap-2">
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('types', 'Catering')}
              />
              Catering
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('types', 'Photography')}
              />
              Photography
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('types', 'Florist')}
              />
              Florist
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('types', 'Band')}
              />
              Band
            </label>
          </div>
        </div>
       {/* <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="w-full">
            <div ref={sliderRef} className="bg-gray-300 h-2 w-full rounded-full relative">
              <span
                ref={thumbRef}
                className="bg-white h-4 w-4 absolute top-0 -ml-2 -mt-1 z-10 shadow rounded-full cursor-pointer"
                style={{ left: `${position}%` }}
              ></span>
              <span
                className="bg-teal-500 h-2 absolute left-0 top-0 rounded-full"
                style={{ width: `${position}%` }}
              ></span>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span className="w-4 text-left">100$(min)</span>
              <span className="w-6 text-right">2000$(max)</span>
            </div>
          </div>
        </div> */}
        <div>
          <h3 className="font-semibold mb-4">Availability</h3>
          <div className="grid gap-2">
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('availability', 'Available')}
              />
              Available
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('availability', 'Unavailable')}
              />
              Unavailable
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('availability', 'Booked')}
              />
              Booked
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Rating</h3>
          <div className="grid gap-2">
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('rating', '5')}
              />
              5 stars
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('rating', '4')}
              />
              4 stars
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('rating', '3')}
              />
              3 stars
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('rating', '2')}
              />
              2 stars
            </label>
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 font-normal">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                onChange={() => handleCheckboxChange('rating', '1')}
              />
              1 star
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
