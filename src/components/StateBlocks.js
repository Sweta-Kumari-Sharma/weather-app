import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import TabularData from "./TabularData";

const StateBlocks = ({ states }) => {
  const [tooltipState, setTooltipState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  
  const handleMouseEnter = (state) => {
    setTooltipState(state);
  };

  const handleMouseLeave = () => {
    setTooltipState(null);
  };

  const handleStateClick = (state) => {
    setSelectedState(state);
    
  };
  useEffect(() => {

    setSelectedCity(selectedState?.cities[0])
  }, [selectedState])

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const closeModal = () => {
    setSelectedState(null);
  };

  // Function to calculate background color based on temperature
  const getBackgroundColor = (temperature) => {
    const maxTemp = Math.max(...states.map((state) => state.temperature));
    const minTemp = Math.min(...states.map((state) => state.temperature));
    const range = maxTemp - minTemp;
    const normalizedTemp = (temperature - minTemp) / range;
    const hue = (1 - normalizedTemp) * 240; // Red (0) to Blue (240)
    return `hsl(${hue}, 100%, 50%)`; // Set saturation and lightness to 100% and 50%
  };

  useEffect(() => {
    console.log("seelcted", selectedState);
  }, [selectedState]);

  return (
    <div className="d-flex flex-col items-center justify-center">
    <div className="state-blocks-container grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {states.map((state, index) => (
        <div
          key={index}
          className={`relative px-2 py-8 rounded-sm cursor-pointer transition ease-in-out delay-150 ${
              selectedState && selectedState.name === state.name ? 'border-2 border-blue-500' : ''
            }`}
          onMouseEnter={() => handleMouseEnter(state)}
          onMouseLeave={handleMouseLeave}
          style={{ backgroundColor: getBackgroundColor(state.temperature) }}
          onClick={() => handleStateClick(state)}
        >
          <h3
            className="state-name text-white text-center"
            style={{ backgroundColor: getBackgroundColor(state.temperature) }}
          >
            {state.name}
          </h3>
          {/* Add more information as needed */}
          {tooltipState && tooltipState.name === state.name && (
            <div className="tooltip bg-white p-2 rounded-md shadow-md absolute top-0 left-0 mt-2 ml-2 z-[1]">
              <p>Population: {state.population.toLocaleString()}</p>
              <p>Temperature: {state.temperature}</p>
              {/* Add more information like temperature */}
            </div>
          )}
        </div>
      ))}
      {/* {selectedState && (
        <div className=" flex gap-4">
          {selectedState.cities.map((city, index) => (
            <div
              key={index}
              onClick={() => handleCityClick(city)}
              className="cursor-pointer"
            >
              <h3>{city.name}</h3>
            </div>
          ))}
        </div>
      )} */}
     
      {/* {selectedCity && (
        <div className="d-flex flex-row md:flex-col justify-content-center align-items-center">
          <div style={{ flex: 1 }}>
            <PieChart data={selectedCity.assetAllocation} />
          </div>
          <div style={{ flex: 1 }}>
            <LineChart data={selectedCity.fundPerformance[0]} />
          </div>
          <div style={{ flex: 1 }}>
            <TabularData data={selectedCity.tabularData} />
          </div>
        </div>
      )} */}
      {/* {selectedState && (
        <div onClose={closeModal} >
          <h2>{selectedState.name}</h2>
          <p>City: {selectedState.city}</p>
          <PieChart data={selectedState?.cities} />
          <LineChart data={selectedState?.fundPerformance[0]} />
          <TabularData data={selectedState.tabularData} />
        </div>
      )} */}
    </div>
     {selectedState && (
        <div className="w-100 mx-auto md:d-flex md:flex-row md:justify-center md:items-center">
          <div style={{ flex: 1 }} className="md:w-[30vw] mx-auto my-4">
            <PieChart data={selectedState.assetAllocation} />
          </div>
          <div style={{ flex: 1 }} className="md:w-[30vw] mx-auto my-4">
            <LineChart data={selectedState.fundPerformance[0]} />
          </div>
          <div style={{ flex: 1 }} className="md:w-[30vw] mx-auto my-4">
            <TabularData data={selectedState.tabularData} />
          </div>
        </div>
      )}
       {selectedState && (
        <div className="mx-auto w-full flex mt-8 flex-wrap justify-center gap-4">
          {selectedState.cities.map((city, index) => (
            <div
              key={index}
              onClick={() => handleCityClick(city)}
              className={`cursor-pointer  ${selectedCity && selectedCity.name === city.name ? 'border-2 border-blue-500' : ''}`}
            >
              <h3>{city.name}</h3>
            </div>
          ))}
        </div>
      )}
      {selectedCity && (
        <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-4 text-center my-2 mb-8">{selectedCity.name} Details</h3>
  <div className="mx-auto w-full flex flex-wrap justify-center gap-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold">Name:</h4>
        <p>{selectedCity.name}</p>
      </div>
      <div>
        <h4 className="font-semibold">Population:</h4>
        <p>{selectedCity.population.toLocaleString()}</p>
      </div>
      <div>
        <h4 className="font-semibold">Assets:</h4>
        <p>{selectedCity.assets.toLocaleString()}</p>
      </div>
      <div>
        <h4 className="font-semibold">Climate:</h4>
        <p>{selectedCity.details.climate}</p>
      </div>
      <div>
        <h4 className="font-semibold">Cost of Living Index:</h4>
        <p>{selectedCity.costOfLivingIndex}</p>
      </div>
      <div>
        <h4 className="font-semibold">Crime Rate:</h4>
        <p>{selectedCity.details.crimeRate}</p>
      </div>
      <div>
        <h4 className="font-semibold">Livability Ranking:</h4>
        <p>{selectedCity.details.livabilityRanking}</p>
      </div>
      <div>
        <h4 className="font-semibold">Population Density:</h4>
        <p>{selectedCity.details.populationDensity}</p>
      </div>
      <div>
        <h4 className="font-semibold">Attractions:</h4>
        <ul>
          {selectedCity.details.attractions.map((attraction, index) => (
            <li key={index}>{attraction}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Historical Facts:</h4>
        <ul>
          {selectedCity.details.historicalFacts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Industries:</h4>
        <ul>
          {selectedCity.details.industries.map((industry, index) => (
            <li key={index}>{industry}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Landmarks:</h4>
        <ul>
          {selectedCity.details.landmarks.map((landmark, index) => (
            <li key={index}>{landmark}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  </div>
)}

      </div>
  );
};

export default StateBlocks;
