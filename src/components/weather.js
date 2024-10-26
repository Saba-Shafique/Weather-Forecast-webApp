import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaCloud, FaCloudSun, FaCloudRain } from 'react-icons/fa';
import bgClouds from '../imgs/bgClouds.jpg';

const WeatherApp = () => {
    const [city, setCity] = useState("");  // City being typed in search bar
    const [searchedCity, setSearchedCity] = useState("New York");  // Displayed city after search
    const [weather, setWeather] = useState({
        temp: 17,
        description: "clear sky",
        icon: "01d", // sunny icon
    });
    const [forecast, setForecast] = useState([]); // State for the forecast
    const [error, setError] = useState("");  // State for error message

    const API_KEY = 'b8d06af3bdb96acfeca17bdf918b74fa';  // Replace with your OpenWeatherMap API key

    // Function to fetch real-time weather and forecast data
    const fetchWeatherData = async (cityName) => {
        try {
            // Clear previous error message
            setError("");

            // Fetch current weather
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
            setSearchedCity(cityName);  // Update displayed city name

            // Fetch 5-day forecast
            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
            );

            const forecastData = forecastResponse.data.list;

            // Process forecast to get one entry per day
            const dailyForecast = [];
            for (let i = 0; i < forecastData.length; i += 8) { // Every 8th entry corresponds to a new day (3-hour intervals)
                const dayData = forecastData[i];
                dailyForecast.push({
                    day: new Date(dayData.dt_txt).toLocaleDateString('en-US', { weekday: 'long' }),
                    temp: Math.round(dayData.main.temp),
                    icon: dayData.weather[0].icon,
                });
            }
            setForecast(dailyForecast.slice(0, 4)); // Get the forecast for the next 4 days
        } catch (error) {
            setError("City does not exist. Please enter a valid city name.");
            console.error("Error fetching weather data:", error);
        }
    };

    // Handle search and fetch weather data
    const handleSearch = () => {
        if (city.trim() !== "") {
            fetchWeatherData(city);
        }
    };

    // Trigger search on Enter key press using onKeyDown
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-cover" style={{ backgroundImage: `url(${bgClouds})` }}>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Enter a city..."
                className="w-80 p-2 mt-10 mb-6 border rounded-lg text-center outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}  // Update typed city
                onKeyDown={handleKeyDown}  // Trigger search on Enter key
            />

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Weather Display Box */}
            <div className="bg-white/50 p-8 rounded-3xl shadow-lg max-w-md w-full text-center mt-4">
                
                {/* Current Weather Display */}
                <div className="text-7xl mb-2">
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
                <h2 className="text-3xl font-bold">{searchedCity}</h2> {/* Display the searched city */}
                <p className="text-lg mt-2">Temperature: {weather.temp}°C</p>
                <p className="text-gray-600 capitalize">{weather.description}</p>

                {/* Four-Day Forecast */}
                <div className="grid grid-cols-4 gap-2 mt-6">
                    {forecast.map((day, index) => (
                        <div key={index} className="bg-white/80 p-2 rounded-lg shadow-md">
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
                            <p className="text-sm">{day.day}</p>
                            <p className="text-sm font-semibold">{day.temp}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
