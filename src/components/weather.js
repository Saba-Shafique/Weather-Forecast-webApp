import React, { useState } from 'react';
import { FaSun, FaCloud, FaCloudSun, FaCloudRain } from 'react-icons/fa';
import bgClouds from '../imgs/bgClouds.jpg';

const WeatherApp = () => {
    const [city, setCity] = useState("New York");
    const [weather, setWeather] = useState({
        temp: 17,
        description: "clear sky",
        icon: "01d", // sunny icon
    });

    const forecast = [
        { day: "Wednesday", temp: 21, icon: "01d" }, // sunny
        { day: "Thursday", temp: 24, icon: "03d" }, // cloudy
        { day: "Friday", temp: 21, icon: "01d" }, // sunny
        { day: "Saturday", temp: 24, icon: "02d" }, // partly cloudy
    ];

    return (
        <div className="min-h-screen flex flex-col items-center bg-cover" style={{ backgroundImage: `url(${bgClouds})` }}>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Enter a City..."
                className="w-80 p-2 mt-10 mb-6 border rounded-lg text-center outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            {/* Weather Display Box */}
            <div className="bg-white/70 p-8 rounded-3xl shadow-lg max-w-md w-full text-center">
                
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
                <h2 className="text-3xl font-bold">{city}</h2>
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
