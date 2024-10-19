import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const apiKey = 'b8d06af3bdb96acfeca17bdf918b74fa'; // Replace with your OpenWeatherMap API key

  const fetchWeatherData = async () => {
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const weather = await weatherResponse.json();
      console.log('Weather Data:', weather); // Debugging log

      // Check if the response was successful
      if (weather.cod !== 200) {
        alert('City not found!');
        return;
      }

      // Fetch 4-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecast = await forecastResponse.json();
      console.log('Forecast Data:', forecast); // Debugging log

      // Update state with current weather
      setWeatherData({
        currentTemp: weather.main.temp,
        currentCondition: weather.weather[0].description,
      });

      // Update state with forecast data (next 4 days)
      const forecastList = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 4);
      setForecastData(
        forecastList.map((item) => ({
          day: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' }),
          temp: item.main.temp,
          icon: item.weather[0].main === 'Clear' ? faSun : item.weather[0].main === 'Rain' ? faCloudRain : faCloud,
        }))
      );
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again later.');
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    fetchWeatherData();
  };

  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center">
      {/* Search Bar */}
      <form className="mb-8" onSubmit={handleSearch}>
        <input
          type="text"
          className="p-2 rounded-full w-96 text-center shadow-lg"
          placeholder="Enter a City..."
          value={city}
          onChange={handleCityChange}
        />
        <button
          type="submit"
          className="ml-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          Enter
        </button>
      </form>

      {/* Current Weather */}
      {weatherData && (
        <div className="bg-white bg-opacity-50 p-6 rounded-xl shadow-xl text-center w-80">
          <FontAwesomeIcon icon={faSun} className="text-yellow-500 text-5xl mb-4" />
          <h2 className="text-3xl font-bold">{city}</h2>
          <p className="text-xl">{`Temperature: ${weatherData.currentTemp}°C`}</p>
          <p className="text-lg">{weatherData.currentCondition}</p>
        </div>
      )}

      {/* Four-Day Forecast */}
      <div className="mt-8 flex space-x-4">
        {forecastData.map((day, index) => (
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
