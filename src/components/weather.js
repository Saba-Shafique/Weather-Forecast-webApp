import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState({
    currentTemp: 17,
    currentCondition: 'Clear Sky',
    forecast: [
      { day: 'Wednesday', temp: 21, icon: faSun },
      { day: 'Thursday', temp: 24, icon: faCloudRain },
      { day: 'Friday', temp: 21, icon: faSun },
      { day: 'Saturday', temp: 24, icon: faCloud },
    ],
  });

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          className="p-2 rounded-full w-96 text-center shadow-lg"
          placeholder="Enter a City..."
          value={city}
          onChange={handleCityChange}
        />
      </div>

      {/* Current Weather */}
      <div className="bg-white bg-opacity-50 p-6 rounded-xl shadow-xl text-center w-80">
        <FontAwesomeIcon icon={faSun} className="text-yellow-500 text-5xl mb-4" />
        <h2 className="text-3xl font-bold">{city}</h2>
        <p className="text-xl">{`Temperature: ${weatherData.currentTemp}°C`}</p>
        <p className="text-lg">{weatherData.currentCondition}</p>
      </div>

      {/* Four-Day Forecast */}
      <div className="mt-8 flex space-x-4">
        {weatherData.forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-50 p-4 rounded-lg text-center shadow-lg w-24"
          >
            <FontAwesomeIcon icon={day.icon} className="text-yellow-500 text-3xl mb-2" />
            <p className="font-semibold">{day.day}</p>
            <p>{`${day.temp}°C`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
