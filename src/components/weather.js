import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaCloud, FaCloudSun, FaCloudRain } from 'react-icons/fa';
import bgClouds from '../imgs/bgClouds.jpg'; // Ensure the background image is linked correctly.

const WeatherApp = () => {
    const [city, setCity] = useState("");  
    const [searchedCity, setSearchedCity] = useState("New York");
    const [weather, setWeather] = useState({
        temp: 17,
        description: "clear sky",
        icon: "01d",
    });
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState("");

    const API_KEY = 'b8d06af3bdb96acfeca17bdf918b74fa';

    const fetchWeatherData = async (cityName) => {
        try {
            setError("");
            const currentWeatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );

            if (currentWeatherResponse.data.cod !== 200) {
                throw new Error("City not found");
            }

            const currentWeatherData = currentWeatherResponse.data;
            setWeather({
                temp: currentWeatherData.main.temp,
                description: currentWeatherData.weather[0].description,
                icon: currentWeatherData.weather[0].icon,
            });
            setSearchedCity(cityName);

            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
            );

            const forecastData = forecastResponse.data.list;
            const dailyForecast = [];
            for (let i = 0; i < forecastData.length; i += 8) {
                const dayData = forecastData[i];
                dailyForecast.push({
                    day: new Date(dayData.dt_txt).toLocaleDateString('en-US', { weekday: 'long' }),
                    temp: Math.round(dayData.main.temp),
                    icon: dayData.weather[0].icon,
                });
            }
            setForecast(dailyForecast.slice(0, 4));
        } catch (error) {
            setError("City does not exist. Please enter a valid city name.");
            console.error("Error fetching weather data:", error);
        }
    };

    const handleSearch = () => {
        if (city.trim() !== "") {
            fetchWeatherData(city);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: `url(${bgClouds})` }}>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Enter a city..."
                className="w-80 p-4 mt-10 mb-6 border rounded-full text-center shadow-lg outline-none bg-white"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Weather Display Box */}
            <div className="bg-white/50 p-6 rounded-3xl shadow-lg text-center" style={{ width: '63%' }}>
                {/* Current Weather Display */}
                <div className="flex items-center justify-center mb-12 mt-12 space-x-40">
                    {/* Weather Icon */}
                    <div className="text-8xl">
                        {weather.icon === "01d" ? (
                            <FaSun className="text-yellow-500" />
                        ) : weather.icon === "02d" ? (
                            <FaCloudSun className="text-gray-500" />
                        ) : weather.icon === "03d" ? (
                            <FaCloud className="text-gray-500" />
                        ) : weather.icon === "09d" || weather.icon === "10d" ? (
                            <FaCloudRain className="text-blue-500" />
                        ) : (
                            <FaSun className="text-yellow-500" />
                        )}
                    </div>

                    {/* City Name, Temperature and Description */}
                    <div className="text-left ml-1">
                        <p className="text-lg mt-2">Today</p>
                        <h2 className="text-5xl font-bold mb-3">{searchedCity}</h2>
                        <p className="text-lg mt-2">Temperature: {weather.temp}°C</p>
                        <p className="text-gray-600 capitalize">{weather.description}</p>
                    </div>
                </div>

                {/* Four-Day Forecast */}
                <div className="grid grid-cols-4 gap-2 mt-6">
                    {forecast.map((day, index) => (
                        <div key={index} className="bg-white/80 p-4 rounded-lg shadow-md text-center">
                            <p className="text-sm font-semibold">{day.day}</p>
                            <div className="text-3xl mb-1">
                                {day.icon === "01d" ? (
                                    <FaSun className="text-yellow-500" />
                                ) : day.icon === "02d" ? (
                                    <FaCloudSun className="text-gray-500" />
                                ) : day.icon === "03d" ? (
                                    <FaCloud className="text-gray-500" />
                                ) : day.icon === "09d" || day.icon === "10d" ? (
                                    <FaCloudRain className="text-blue-500" />
                                ) : (
                                    <FaSun className="text-yellow-500" />
                                )}
                            </div>
                            <p className="text-lg font-semibold">{day.temp}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
