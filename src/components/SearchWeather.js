import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import astro from "../assets/header-img.svg";
import { motion } from "framer-motion";
import { api } from "../api";
import TemperatureChart from "./TemperatureChart";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchWeather = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false); // Track input focus state
  const [recentSearches, setRecentSearches] = useState([]);
  const [pastWeatherData, setPastWeatherData] = useState([]);
  const [showRecentSearch, setShowRecentSearch] = useState(false);
  const [unit, setUnit] = useState("metric"); // Default to Celsius
  const [fahrenheitValue, setFahrenheitValue] = useState(null); // Default to Celsius
  const [error, setError] = useState(''); // Default to Celsius

  const searchInputRef = useRef(null);

  useEffect(() => {
    const storedRecentSearches = JSON.parse(localStorage.getItem("recentSearches"));
    if (storedRecentSearches) {
      setRecentSearches(storedRecentSearches);
    }
  }, []);

  useEffect(() => {
    if (weatherData && unit === 'imperial') {
      const fahrenheit = (weatherData.main.temp * (9 / 5)) + 32;
      setFahrenheitValue(fahrenheit);
    }
  }, [unit, weatherData]);

  const searchWeather = async (search) => {
    try {
        toastr.success('hello')
        toast.success('hello');
      const currentWeatherResponse = await axios.get(`${api.base}weather?q=${search}&appid=${api.key}&units=${unit}`);
      setWeatherData(currentWeatherResponse.data);

      const pastWeatherResponse = await axios.get(`${api.base}onecall/timemachine?lat=${currentWeatherResponse.data.coord.lat}&lon=${currentWeatherResponse.data.coord.lon}&dt=${Math.floor(Date.now() / 1000) - 86400}&appid=${api.key}&units=${unit}`);
      setPastWeatherData(pastWeatherResponse.data.hourly);

      const updatedSearches = [
        search,
        ...recentSearches.filter((item) => item !== search).slice(0, 4),
      ];
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      
    }
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    searchWeather(search);
    setShowRecentSearch(false);
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const generateRandomTemperature = (currentTemperature) => {
    const minTemperature = currentTemperature - 5;
    const maxTemperature = currentTemperature + 5;
    return Math.random() * (maxTemperature - minTemperature) + minTemperature;
  };

  const generateRandomWeatherCondition = (currentCondition) => {
    const weatherConditions = [
      "Clear",
      "Clouds",
      "Rain",
      "Drizzle",
      "Snow",
      "Thunderstorm",
      "Mist",
      "Haze",
    ];
    const index = Math.floor(Math.random() * weatherConditions.length);
    return weatherConditions[index];
  };

  const generateRandomPastWeather = (currentWeather) => {
    if (!currentWeather) {
      return;
    }
    const { main, weather } = currentWeather;
    const pastWeatherData = [];

    for (let i = 5; i >= 1; i--) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - i);

      const timestamp = Math.floor(pastDate.getTime() / 1000);
      const temperature = generateRandomTemperature(main.temp);
      const weatherCondition = generateRandomWeatherCondition(weather[0].main);

      pastWeatherData.push({
        dt: timestamp,
        temp: temperature,
        weather: [{ main: weatherCondition }],
      });
    }

    setPastWeatherData(pastWeatherData);
  };

  useEffect(() => {
    if (weatherData) {
      generateRandomPastWeather(weatherData);
    }
  }, [weatherData]);

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  const search = async (evt) => {
    if (evt.key === "Enter") {
        // toastr.success('hello')
            // toast.success('hello')
      try {
        const currentWeatherResponse = await axios.get(`${api.base}weather?q=${query}&appid=${api.key}&units=${unit}`);
        if(!currentWeatherResponse || currentWeatherResponse.status!==200){
            toastr.warning(currentWeatherResponse.message)
            toast.success('hello')
        }
        setWeatherData(currentWeatherResponse.data);

        const updatedSearches = [
          query,
          ...recentSearches.filter((item) => item !== query).slice(0, 4),
        ];
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        setQuery('');
      } catch (error) {
        console.error("Error fetching weather data:", error);
        toast.error('City now found!')
      }
      setShowRecentSearch(false);
    }
  };

  const handleInputFocus = () => {
    setShowRecentSearch(true);
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div
      className={`app ${
        weatherData &&
        typeof weatherData?.main !== "undefined"
          ? weatherData.main.temp > 30
            ? "sunny"
            : weatherData.main.temp < 5
            ? "snowy"
            : weatherData.weather[0].main === "Clear"
            ? "clear"
            : weatherData.weather[0].main === "Clouds"
            ? "cloudy"
            : weatherData.weather[0].main === "Rain" ||
              weatherData.weather[0].main === "Drizzle"
            ? "rainy"
            : weatherData.weather[0].main === "Mist"
            ? "foggy"
            : weatherData.weather[0].main === "Haze"
            ? "haze"
            : weatherData.weather[0].main === "Snow"
            ? "snowy"
            : weatherData.weather[0].main === "Thunderstorm"
            ? "thunderstorms"
            : weatherData.weather[0].main === "Windy"
            ? "windy"
            : weatherData.weather[0].main === "Hail"
            ? "hail"
            : weatherData.weather[0].main === "Tornado" ||
              weatherData.weather[0].main === "Cyclone"
            ? "tornado"
            : ""
          : ""
      }`}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar mt-2"
            placeholder="Search Location..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={searchInputRef}
          />
          {showRecentSearch && (
            <ul className="recent-searches-list rounded-b-md">
           
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  onClick={() => { setQuery(search); setShowRecentSearch(false); }}
                  className="bg-white border-b hover:bg-gray-50 border-b-gray-400  px-4 "
                >
                  {search}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button onClick={() => setUnit('metric')}>
            Metric
          </button>
          <button onClick={() => setUnit('imperial')}>
            Imperial
          </button>
        </div>
        {query === "" && Object.keys(weatherData || {}).length === 0 && (
          <div className="welcome-message">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <p>
                Welcome to <br />
                Weather App
              </p>
            </motion.div>
            <img className="astro" src={astro} alt="Astro" />
          </div>
        )}
        {typeof weatherData?.main !== "undefined" && (
          <div>
            <div>
              <div className="location-box">
                <div className="location">{`${weatherData.name}, ${weatherData.sys.country}`}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {unit === 'metric' && <div>{`${weatherData.main.temp}°C`}</div>}
                  {unit === 'imperial' && <div>{`${fahrenheitValue} F`}</div>}
                </div>
                <div className="weather">{weatherData.weather[0].main}</div>
                <div className="description">
                  {weatherData.weather[0].description}
                </div>
              </div>
            </div>
            {pastWeatherData.length > 0 && (
              <div className="chart-container bg-white flex w-full items-center justify-center md:w-[30vw] mx-auto">
                <TemperatureChart pastWeatherData={pastWeatherData} />
              </div>
            )}
          </div>
        )}
      </main>
      <p className="mt-12 bg-slate-100 text-center p-2 ">Copyright © | Sweta Kumari Sharma (2024)</p>
      <ToastContainer />
    </div>
  );
}

export default SearchWeather;
