import React, { useEffect, useState } from 'react';
import StateBlocks from './StateBlocks'; // Import the StateBlocks component
import axios from 'axios';
import { api } from '../api';



  
const StateSummaryDashboard = () => {
  const [statesWithTemperature, setStatesWithTemperature] = useState([]);

    const states = [
        { name: 'Andhra Pradesh', population: 53903393 },
        { name: 'Arunachal Pradesh', population: 1570458 },
        { name: 'Assam', population: 35607039 },
        { name: 'Bihar', population: 124799926 },
        { name: 'Chhattisgarh', population: 29436231 },
        { name: 'Goa', population: 1586250 },
        { name: 'Gujarat', population: 63872399 },
        { name: 'Haryana', population: 28941133 },
        { name: 'Himachal Pradesh', population: 7304573 },
        { name: 'Jharkhand', population: 38593948 },
        { name: 'Karnataka', population: 67562686 },
        { name: 'Kerala', population: 35699443 },
        { name: 'Madhya Pradesh', population: 85358965 },
        { name: 'Maharashtra', population: 123144223 },
        { name: 'Manipur', population: 3091545 }
      ];

      // useEffect(() => {
      //   const fetchTemperature = async () => {
      //     try {
      //       const updatedStates = await Promise.all(
      //         states.map(async state => {
      //           const response = await axios.get(`${api.base}weather?q=${state.name}&appid=${api.key}&units=metric`);
      //           const temperature = response.data.main.temp;
      //           return { ...state, temperature };
      //         })
      //       );
      //       setStatesWithTemperature(updatedStates);
      //     } catch (error) {
      //       console.error('Error fetching temperature data: ', error);
      //     }
      //   };
    
      //   fetchTemperature();
      // }, []); // Empty dependency array ensures effect runs only once
      const [statesWithCities, setStatesWithCities] = useState([]);

      const generateRandomTabularData = () => {
        const data = [];
        const names = ["Snap Inc.", "Twitter Inc.", "Apple Inc.", "Facebook Inc.", "Google LLC"];
    
        for (let i = 0; i < 5; i++) {
          const name = names[i];
          const change = (Math.random() * 2000) - 1000; // Generate floating-point numbers between -1000 and 1000 for change
          const percentChange = (Math.random() * 200) - 100; // Generate floating-point numbers between -100 and 100 for percent change
          const volume = Math.random() * 1000000; // Generate floating-point numbers up to 1,000,000 for volume
          const marketCap = Math.random() * 1000000; // Generate floating-point numbers up to 1,000,000 for market cap
    
          data.push({ name, change, percentChange, volume, marketCap });
        }
    
        return data;
      };

      const generateRandomAssetData = () => {
        const assetTypes = ['domestic', 'international', 'bonds', 'cash', 'other'];
        const assetAllocation = {};
      
        // Generate random percentage values for each asset type
        assetTypes.forEach(type => {
          const randomPercentage = Math.random(); // Generate a random percentage
          assetAllocation[type] = randomPercentage;
        });
      
        // Normalize the percentages to ensure the sum is 100
        const totalPercentage = Object.values(assetAllocation).reduce((acc, curr) => acc + curr, 0);
        Object.keys(assetAllocation).forEach(type => {
          assetAllocation[type] = (assetAllocation[type] / totalPercentage) * 100;
        });
      
        return assetAllocation;
      };
      const generateRandomFundPerformanceData=() => {
        const data = [];
        for (let year = 2016; year <= 2024; year++) {
          const yearlyPerformance = [];
          for (let i = 0; i < 5; i++) {
            const performance = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000; 
            yearlyPerformance.push({ year, performance });
          }
          data.push(yearlyPerformance);
        }
        return data;
      };

      const getCityDetails = () => {
        const landmarks = generateRandomList(3, "Landmark");
        const attractions = generateRandomList(3, "Attraction");
        const historicalFacts = generateRandomList(3, "Historical Fact");
        const populationDensity = getRandomPopulationDensity();
        const costOfLivingIndex = getRandomCostOfLivingIndex();
        const livabilityRanking = getRandomLivabilityRanking();
        const crimeRate = getRandomCrimeRate();
        const climate = getRandomClimate();
        const industries = generateRandomList(3, "Industry");
      
        return {
          landmarks,
          attractions,
          historicalFacts,
          populationDensity,
          costOfLivingIndex,
          livabilityRanking,
          crimeRate,
          climate,
          industries,
        };
      };
      
      const generateRandomList = (count) => {
        const list = [];
        const prefix = Math.random().toString(36).substring(7); // Random prefix
        for (let i = 1; i <= count; i++) {
          list.push(`${prefix} ${Math.floor(Math.random() * 1000)}`); // Random number
        }
        return list;
      };
      
      
      const getRandomPopulationDensity = () => {
        const densities = ["Low", "Moderate", "High"];
        return densities[Math.floor(Math.random() * densities.length)];
      };
      
      const getRandomCostOfLivingIndex = () => {
        // Assume values from 1 to 100
        return Math.floor(Math.random() * 100) + 1;
      };
      
      const getRandomLivabilityRanking = () => {
        // Assume values from 1 to 10
        return Math.floor(Math.random() * 10) + 1;
      };
      
      const getRandomCrimeRate = () => {
        const rates = ["Low", "Moderate", "High"];
        return rates[Math.floor(Math.random() * rates.length)];
      };
      
      const getRandomClimate = () => {
        const climates = ["Tropical", "Temperate", "Arctic"];
        return climates[Math.floor(Math.random() * climates.length)];
      };
      
      

      useEffect(() => {
        const fetchTemperatureAndCitiesData = async () => {
          try {
            const updatedStates = await Promise.all(
              states.map(async state => {
                // Fetch temperature data
                const temperatureResponse = await axios.get(`${api.base}weather?q=${state.name}&appid=${api.key}&units=metric`);
                const temperature = temperatureResponse.data.main.temp;
                
                // Dummy data for cities
                const fundPerformance = generateRandomFundPerformanceData();
                const tabularData = generateRandomTabularData();
                const assetAllocation=generateRandomAssetData();
                const cities = [
                  { name: 'City 1', population: 100000, assets: Math.floor(Math.random() * 1000000), details:getCityDetails(), fundPerformance: generateRandomFundPerformanceData(), tabularData:generateRandomTabularData(), assetAllocation:generateRandomAssetData() },
                  { name: 'City 2', population: 80000, assets: Math.floor(Math.random() * 1000000), details:getCityDetails(),fundPerformance: generateRandomFundPerformanceData(), tabularData:generateRandomTabularData(), assetAllocation:generateRandomAssetData()  },
                  { name: 'City 3', population: 60000, assets: Math.floor(Math.random() * 1000000), details:getCityDetails(),fundPerformance: generateRandomFundPerformanceData(), tabularData:generateRandomTabularData(), assetAllocation:generateRandomAssetData() },
                  { name: 'City 4', population: 40000, assets: Math.floor(Math.random() * 1000000), details:getCityDetails(),fundPerformance: generateRandomFundPerformanceData(), tabularData:generateRandomTabularData(), assetAllocation:generateRandomAssetData()  },
                  { name: 'City 5', population: 20000, assets: Math.floor(Math.random() * 1000000), details:getCityDetails(),fundPerformance: generateRandomFundPerformanceData(), tabularData:generateRandomTabularData(), assetAllocation:generateRandomAssetData() }
                ];
                
                return { ...state, temperature, cities,fundPerformance,tabularData,assetAllocation };
              })
            );
            setStatesWithCities(updatedStates);
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
    
        fetchTemperatureAndCitiesData();
      }, []);
    
      // Function to generate random fund performance data
      const generateRandomPerformanceData = () => {
        const data = [];
        for (let i = 0; i < 5; i++) {
          data.push(Math.floor(Math.random() * 100));
        }
        return data;
      };
    

  return (
    <div>
      <h3 className='text-slate-600 bg-slate-100 text-center py-4 text fixed top-0 z-10 bg-white w-full '>Indian State Dashboard   |  Home</h3>
      <div className='mt-8'>

      <StateBlocks states={statesWithCities} />
      </div>
      {/* <p className='mt-12 bg-slate-100 p-2 text-center '>Copyright © | Sweta Kumari Sharma (2024)</p> */}
    </div>
  );
};

export default StateSummaryDashboard;
