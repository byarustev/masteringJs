import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function WeatherDashboard() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [previousSearches, setPreviousSearches] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    // instead of requesting data from an API, use this mock data
    const mockWeatherData = {
        'New York': {
            temperature: '22C',
            humidity: '56%',
            windSpeed: '15 km/h'
        },
        'Los Angeles': {
            temperature: '27C',
            humidity: '45%',
            windSpeed: '10 km/h',
        },
        'London': {
            temperature: '15C',
            humidity: '70%',
            windSpeed: '20 km/h'
        },
    };

    const handleSearch = () => {
        const cities = Object.keys(mockWeatherData);
        const isFound = cities.includes(city);
        if (isFound) {
            setWeatherData(mockWeatherData[city]);
        } else {
            setWeatherData(null);
        }
        if (!previousSearches.includes(city)) {
            setPreviousSearches([...previousSearches, city])
        }
        setHasSearched(true)
    }

    const handleSearchPrevious = (value) => {
        setCity(value)
        setWeatherData(mockWeatherData[value]);
        setHasSearched(true)
    }

    return (
        <div>
            <input type="text" id="citySearch" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search for a city..." />
            <button id="searchButton" onClick={handleSearch} >Search</button>
            {weatherData &&
                <div id="weatherData">
                    <div>Temperature: {weatherData && weatherData.temperature} </div>
                    <div>Humidity: {weatherData && weatherData.humidity}</div>
                    <div>Wind Speed: {weatherData && weatherData.windSpeed}</div>
                </div>
            }

            {hasSearched && !weatherData &&
                <div>City not found.</div>
            }
            <div id="previousSearches">
                <h4>Previous Searches</h4>
                {previousSearches.map((search) => (
                    <button onClick={() => handleSearchPrevious(search)}>{search}</button>
                ))}
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WeatherDashboard />);