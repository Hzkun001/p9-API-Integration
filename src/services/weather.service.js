// src/services/weather.service.js
const httpClient = require('../utils/httpClient');
const cache = require('../utils/cache');

const WEATHER_TTL = 120;

async function fetchWeatherByCity(city, apikey) {
  if (!apikey) throw new Error('OWM_API_KEY is not set');

  const key = `weather_${city.toLowerCase()}`;
  if (cache.has(key)) return cache.get(key);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric`;
  const { data } = await httpClient.get(url);

  cache.set(key, data, WEATHER_TTL);
  return data;
}

module.exports = { fetchWeatherByCity };
